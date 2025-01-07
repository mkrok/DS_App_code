

//Add basic compatibility with EnjineIO.

$include = (file) => app._34(file)

//File handling
const $file = {};
$file.exists = (path) => app._217(path)
$file.read = (path,encoding) => app._229(path,encoding)
$file.write = (path,data,options) => app._231(path,data,options)

//Folder handling.
const $dir = {};
$dir.getPrivate = (name) => app._211(name)
$dir.exists = (path) => app._218(path)

//Reserved for later.
const $sys = {}
const $net = {}
const $android = {}
const $ios = {}
const $windows = {}
const $osx = {}

//Temporary hack for app._211 call in ui.js (obfuscation issue)
_Private = function( name,options ) { return prompt( "#", "App.GetPrivateFolder(\f"+name+"\f"+options ); }