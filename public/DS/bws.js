
/* Uncomment this when runnig as SPK.
function OnStart()
{
    StartBrowseServer();
}
*/

var serv = null;
var webServerRoot = "/sdcard";

//Start the file browsing server.
function StartBrowseServer()
{
	//Stop previous any instance.
	if( serv ) serv.Destroy();
	
	//Create and run web server.
	serv = app._352( 8889, "Upload,ListDir,NoWelcome" );

	var serverRoot = "/sdcard/DroidScript/.edit/browse";
	
	serv.SetFolder( webServerRoot );
	serv.SetUploadFolder( webServerRoot );

	serv.AddRedirect( "/browse/*", "/DroidScript/.edit/browse/index_ds.html" );
	
	serv.AddServlet( "/rename", onRequestRename );
	serv.AddServlet( "/delete", onRequestDelete );
	serv.AddServlet( "/mkdir", onRequestNewFolder );
	serv.SetOnReceive( serv_OnReceive );
	serv.Start();
	
	//Create sys process for remote terminal.
	CreateSysProc()
}

//Create system process.
function CreateSysProc()
{
    //see: http://www.faqs.org/docs/abs/HTML/options.html
    sys = app._354( "sh", null, null, "combine" );
	//sys = app._354( "sh" ); // -i -v -s" ); //, "combine" );
	sys.SetOnInput( sys_OnInput );
	sys.SetOnError( sys_OnError );
	sys.Out( "cd /sdcard\n" );
}

//Reset the system object.
function sys_Reset()
{
    sys.Destroy(); 
    CreateSysProc();
}

//Called when messages arrive from websocket clients.
function serv_OnReceive( msg, ip )
{
    if( msg=="@RESET@" ) { setTimeout( sys_Reset, 1000) }
    else if( msg=="@keepalive@" ) { /*do nothing*/ }
    else sys.Out( msg );
}

//Called when we get data from the input stream.
function sys_OnInput( data )
{
    //serv.SendText( "I:"+ data );
    serv.SendText( data );
}

//Called when we get errors from the input stream.
function sys_OnError( data )
{
    //serv.SendText("E:"+data)
    //Send the error message in red text.
    serv.SendText( "\x1b[1;31m" + data + "\x1b[0m" )
}

// Handle /rename?dir=/sdcard&old=OldName.png&new=NewName.png
function onRequestRename( request, info )
{
    var response = { status: "OK" };
    
    if(!request.hasOwnProperty("file") || !request.hasOwnProperty("newname"))
    {
        response.status = "Invalid Request";
    }
    else
    {
        var oldFilename = webServerRoot + request.file;
        var newFilename = webServerRoot + request.newname;
        
        if(oldFilename !== newFilename)
        {
            if(app._217(newFilename))
            {
                response.status = "A file named " + request.newname + " already exists.";
            }
            else if(app._216(newFilename))
            {
                response.status = "A folder named " + request.newname + " already exists.";
            }
            else // Good to rename
            {   
                if(app._218(oldFilename))
                {
                    //app._135("RENAMEFOLDER: " + oldFilename + " " + newFilename);
                    app._244(oldFilename, newFilename);
                }
                else
                {
                    //app._135("RENAMEFILE: " + oldFilename + " " + newFilename);
                    app._243(oldFilename, newFilename);
                }
            }
        }
        else
        {
            console.log("Rename: filenames are the same");
        }
    }
    
	serv.SetResponse( JSON.stringify(response) );
}

// Handle /delete?file=/Folder/file.png
function onRequestDelete( request, info )
{
    var response = { status: "OK" };
    
    if(!request.hasOwnProperty("file"))
    {
        response.status = "Invalid Request";
    }
    else
    {
        var fileToDelete = webServerRoot + request.file; 

        if(app._218(fileToDelete))
        {
            //app._135( "DELETEFOLDER: " + fileToDelete );
            app._242(fileToDelete);
        }
        else
        {
            //app._135( "DELETEFILE: " + fileToDelete );
            app._239(fileToDelete);
        }
    }
    
	serv.SetResponse( JSON.stringify(response) );
}

// Handle /mkdir?name=/sdcard/MyPhotos
function onRequestNewFolder( request, info )
{
    var response = { status: "OK" };
    
    if(!request.hasOwnProperty("name"))
    {
        response.status = "Invalid Request";
    }
    else
    {
        var folder = webServerRoot + request.name;
        
        if(app._216(folder))
        {
            response.status = "A folder with that name already exists";
        }
        else
        {
            //app._135("MKDIR: " + folder); 
            app._210(folder); 
        }
    }
    
    serv.SetResponse(JSON.stringify(response));
}