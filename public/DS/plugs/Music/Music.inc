/*
 * Modified for DroidScript
 *
 * Version 1.5 - 08/20/2020
 * Version 1.0 - 08/16/2020
 *
 * Offline usable local Tone.Sampler and Tone.Player
*/

_LoadScriptSync( "/Sys/plugs/Music/tone.min.js" );

//Prevent obfuscation issues.
function _GetAppPath() { return prompt( "#", "App.GetAppPath(" ); }
function _ReadFileData( file,mode ) { return JSON.parse(prompt( "#", "App.ReadFileData(\f"+file+"\f"+mode )); }

// Return mew Music object.
app.CreateMusic = function() {
    return new Music();
};

// Init Music object.
function Music() {
    this._tone = Tone;
    
    // music.*
    this.Now               = Tone.now;
    this.Loop              = function(callback, duration) { return new BaseLoop(new Tone.Loop(callback, duration)); };
    this.StartTransport    = function() { Tone.Transport.start(); };
    this.StopTransport     = function() { Tone.Transport.stop(); };
    this.RampToTransport   = function(bpm, sec) { Tone.Transport.bpm.rampTo(bpm, sec); };
    this.SetTransportBpm   = function(bpm) { Tone.Transport.bpm.value = bpm; };
    this.RepeatTransport   = function(callback, dur) { Tone.Transport.scheduleRepeat(callback, dur); };
    this.SetOnLoaded       = function(callback) { Tone.loaded().then(callback); };
    
    // Effects
    this.Gain          = function(val, _opt) { var opt = _opt || {}; opt.gain = val; return new Tone.Gain(opt); };
    this.Phaser        = function(frequency, octaves, baseFrequency) { return new Tone.Phaser(frequency, octaves, baseFrequency); };
    this.Distortion    = function(value) { return new Tone.Distortion(value); };
    this.Filter        = function(frequency, type, rollof) { return new Tone.Filter(frequency, type, rollof); };
    this.FeedbackDelay = function(delay, feedback) { return new Tone.FeedbackDelay(delay, feedback); };
    
    // Instance Methods
    this.CreatePlayer = function(path, _opt) {
        var opt = _opt ? _opt.toLowerCase() : "";
        var options = {};
        
        if(path.startsWith("/"))
            options.url = path;
        else
            options.url = _GetAppPath() + "/" + path;
        
        options.loop = opt.includes("loop");
        options.autostart = opt.includes("autoplay");
        
        return new BasePlayer(new Tone.Player(options).toDestination());
    };
    
    this.CreateSampler = function(opt, noDest) {
        var options = {};
        
        if(opt.folder.startsWith("/"))
            options.baseUrl = opt.folder + "/";
        else
            options.baseUrl = _GetAppPath()+"/"+opt.folder+"/";
        
        options.urls = opt.files;
        
        var inst = new Tone.Sampler(options);
        
        return new BaseInstrument(noDest ? inst : inst.toDestination());
    };
    
    this.CreateOscillator = function(frequency, oscillatorType) {
        var inst = new Tone.Oscillator(frequency, oscillatorType).toDestination();
        return new BaseOscillator(inst);
    };
    
    this.CreatePolySynth = function(type, _opt, noDest) {
        var opt = _opt || {};
        opt.voice = Tone[this.GetSynth(type)];
        var inst = new Tone.PolySynth(opt);
        return new BaseInstrument(noDest ? inst : inst.toDestination());
    };
    
    this.CreateSynth = function(type, opt, noDest) {
        var inst = new Tone[this.GetSynth(type)](opt);
        
        // Generate and return Instrument object.
        return new BaseInstrument(noDest ? inst : inst.toDestination()); 
    };
    
    this.CreateMIDIAccess = function() {
        return new BaseMIDIAccess();
    };
    
    // Convert short synth name to method name. (fm => FMSynth)
    this.GetSynth = function(_name) {
        var name = _name ? _name.toLowerCase() : "";
        switch(name)
        {
            // UPPER CASE.
            case "am":
            case "fm":
                name = name.toUpperCase();
                break;
            // Title
            case "membrane":
            case "metal":
            case "duo":
            case "pluck":
            case "mono":
            case "noise":
                name = name[0].toUpperCase() + name.slice(1).toLowerCase();
                break;
            case "synth":
                name = "";
                break;
            default:
                name = "";
                console.log("Synth type don't exits: "+_name+", auto select Synth type.");
        }
        
        return name + "Synth";
    };
    
    // Start ToneJS
    Tone.start();
}

function BaseMIDIAccess() {
    this.SetOnAccess = function(callback) {
        this.onAccess = callback;
    };
    
    this.SetOnError = function(callback) {
        this.onError = callback;
    };
    
    this.SetOnMessage = function(callback) {
        this.onMessage = callback;
    };
    
    this.RequestAccess = function() {
        if(navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess().then(access => {
                var inputs = access.inputs.values();
                var devices = [];
                for(var input of inputs) {
                    input.onmidimessage = this.onMessage;
                    devices.push(input);
                }
                this.onAccess(devices, access);
            }).catch(err=>this.onError);
        } else {
            this.onError("Your device don't support MIDI access.", 0);
        }
    };
}

/*
 * Tone.Loop
 * https://tonejs.github.io/docs/14.7.39/Loop.html
*/
function BaseLoop(self) {
    this._loop = self;
    
    this.GetName = function() {
        return self.name;
    };
    
    this.Start = function(time) {
        self.start(time);
    };
    
    this.Stop = function(time) {
        self.stop(time);
    };
    
    this.Cancel = function(time) {
        self.cancel(time);
    };
}

/*
 * Tone.Oscillator
 * https://tonejs.github.io/docs/14.7.39/Oscillator.html
*/
function BaseOscillator(self) {
    this._oscillator = self;
    
    this.GetName = function() {
        return self.name;
    };
    
    this.SetFrequency = function(value) { 
        self.frequency.value = value; 
    };
    
    this.SetFrequencyRampTo = function(value, rampTime, startTime) { 
        self.frequency.rampTo(value, rampTime, startTime); 
    };
    
    this.Restart = function() {
        self.restart.apply(self, arguments);
    };
    
    this.Play = function(time, offset, duration) { 
        self.start(time, offset, duration); 
    };
    
    this.Stop = function(time) {
        self.stop(time); 
    };
    
    this.Dispose = function() {
        self.dispose();
    };
    
    this.Connect = function() {
        self.chain.apply(self, [...arguments, Tone.Destination]);
    };
}

/*
 * Tone.Player
*/
function BasePlayer(self) {
    // Instance for users.
    this._player = self;
    
    this.GetName = function() {
        return self.name;
    };
    
    this.Play = function() { 
        self.start(); 
    };
    
    this.Stop = function() { 
        self.stop(); 
    };
    
    this.Dispose = function() {
        self.dispose();
    };
    
    this.Connect = function() {
        self.chain.apply(self, [...arguments, Tone.Destination]);
    };
}

/*
 * Tone.[AM,FM,Duo,...]Synth - Tone.Sampler
 * https://tonejs.github.io/docs/14.7.39/Synth
*/
function BaseInstrument(self) {
    // Instance for users.
    this._synth = self;
    
    this.GetName = function() {
        return self.name;
    };
    
    this.PlayTone = function() {
        self.triggerAttack.apply(self, arguments);
    };
    
    this.PlayStopTone = function() {
        self.triggerAttackRelease.apply(self, arguments);
    }
    
    this.StopAll = function(time) {
        self.releaseAll(time);
    };
    
    this.Dispose = function() { 
        self.dispose(); 
    }
    
    this.SetOscillator = function(type) {
        if(self.oscillator)
            self.oscillator.type = type.toLowerCase();
        else if(self.envelope.oscillator) 
            self.envelope.oscillator = type.toLowerCase();
        else
            console.log(self.name + " not support oscillator");
    };
    
    this.SetAttack = function(value) {
        self.envelope.attack = value;
    };
    
    this.SetRelease = function(value) {
        self.envelope.release = value;
    };
    
    this.SetDecay = function(value) {
        self.envelope.decay = value;
    };
    
    this.SetSustain = function(value) {
        self.envelope.sustain = value;
    };
    
    this.SetVolume = function(decibels) {
        self.volume.value = decibels;
    };
    
    this.Connect = function() {
        self.chain.apply(self, [...arguments, Tone.Destination]);
    };
    
    this.Set = function() {
        self.set.apply(self, arguments);
    };
    
    this.Get = function() {
        return self.set.apply(self, arguments);
    };
    
    /*
     * Don't change to
     * this.StopTone = self.triggerRelease;
     * giving error.
     */
    this.StopTone = function() {
        self.triggerRelease.apply(self, arguments);
    };    
};