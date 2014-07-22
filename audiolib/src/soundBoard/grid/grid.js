var Grid = function(instrument, BPM, freq, noteScheduler){
  //This is a class that creates individual grids.  Each grid will be a specific instrument, and it can have
  //its own BPM, frequency, or noteSchedule.  The notescheduler contains a matrix of which notes should be
  //played in the grid.

  this.sampleRate = 44100;
  //Most PC sound cards run at 44100.  All this means is that there is 44100 data points for every 
  //second of sound.
  this.BPM = BPM;
  this.instrumentName = instrument;
  this.freq = freq;
  //frequency is the same as pitch
  this.vars = {};
  //vars is a temporary storage object. It is used in the 'acoustic' instrument algorithm/equation.
  this.interval;
  this.soundHash = {};

  //we create a soundHash to do a calculation of all the sounds ahead of time.  We store the buffers
  //in this soundHash so we don't have to recalculate every time.
  //if a noteScheduler is passed in, then it will already have instructions on when it will be played.
  //This bit of code is related to the exportGrids function.  IT is also related to the set of instructions
  //you give the soundBoard to recreate any looped sound of multiple grids.


  //if notesScheduler doens't exist, then we create a matrice, or set of objects within each column, that
  //represent each sound that should be scheduled at each grid column.

  if ( noteScheduler ){
    this.noteScheduler = noteScheduler;
  }else{
    this.noteScheduler = (function(){
      var temp = [];
      for ( var i = 0; i < 8; i++ ){
        temp.push({});
      }
    return temp;
    })();
  }

//if the instrument is drums, we import the sounds instead of calculate them.  Take a look at the 
//imported sounds file to understand in more depth.  I linked to a blog post in there.

  if ( instrument === 'drums' ){

    this.soundHash = drumSounds;
    this.keys = routes = ['kick', 'hh', 'synride', 'syncowbell', 'synfx', 'synshaker'];
  
  }else{

    this.instrument = instruments[this.instrumentName];
//Here we set the keys.  Right now we're creating sounds on the pentatonic scale.  You can change this equation
//to produce ANY notes you would like.  We have a set of 6 notes which corresponds to the 6 rows of the grid.
    this.keys = scale = (function(){
      return [ freq, 9/8 * freq, 5/4 * freq,
        3/2 * freq, 5/3 * freq, 2 * freq ].reverse();
    })();

//http://keithwhor.com/music/ check out his website to understand attack in more detail.
//A lot of this code was transferred over.  He was using the audio element instead of the web audio
//api.

    var attackLen = this.sampleRate * this.instrument.attack();
    var duration = 60 / this.BPM / 2;
    var volume = 1;

   //this stores the sounds for later use so we don't have to calculate it every time
   //Here is where we actually calculate the waveforms
    for ( var i = 0; i < scale.length; i++ ){
      var buffer = context.createBuffer( 1, duration * this.sampleRate, this.sampleRate );
      //we store the sounds in a buffer. The buffer is what sounds get stored in for the Web Audio API
      var frequency = scale[i];
      //we loop through all the frequencies or pitches in the keys array.
      data = buffer.getChannelData( 0 );
      //We only set one channel of data.  IF you have two channels, then you have different sounds
      // for each.  It is why you hear different sounds in each ear for some music.  It can create
      //a more realistic effect, but we are not utilizing that here.

      for ( var j = 0; j < data.length; j++ ){
        //here, we're just creating the wave
        if ( j < attackLen){
          amplitude = volume * ( j / ( this.sampleRate * this.instrument.attack() ) );
        }else{
          amplitude = volume * Math.pow((1-((j-(this.sampleRate*this.instrument.attack()))/(this.sampleRate*(duration-this.instrument.attack())))),this.instrument.dampen.call(this,this.sampleRate, frequency, volume));
        }
          val = amplitude * this.instrument.wave.call( this, j, this.sampleRate, frequency, volume );
          //the bitshifting below gives white space in the sound.  This makes it sound more airy or real
          data[ j<<1 ] = val;
          data[ ( j<<1 ) + 1 ] = val>>8;
      }
      //we are storing each sound in a hash table
      this.soundHash[ scale[i] ] = buffer;
    }
  }

};
  


