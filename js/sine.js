$(function(){
  var waves = new SineWaves({
    // Canvas Element
    el: document.getElementById('waves'),

    // General speed of entire wave system
    speed: 8,

    // How many degrees should we rotate all of the waves
    rotate: 0,

    // Ease function from left to right
    ease: 'SineInOut',

    // Specific how much the width of the canvas the waves should be
    // This can either be a number or a percent
    wavesWidth: '65%',

    // An array of wave options
    waves: [
    {
      timeModifier: 1,
      lineWidth: 3,
      amplitude: 150,
      wavelength: 200,
      segmentLength: 20,
  //       strokeStyle: 'rgba(255, 255, 255, 0.5)'
    },
    {
      timeModifier: 1,
      lineWidth: 2,
      amplitude: 150,
      wavelength: 100,
      segmentLength: 10,
  //       strokeStyle: 'rgba(255, 255, 255, 0.3)'
    },
    {
      timeModifier: 1,
      lineWidth: 1,
      amplitude: -150,
      wavelength: 50,
      segmentLength: 10,
  //       strokeStyle: 'rgba(255, 255, 255, 0.2)'
    },
    {
      timeModifier: 1,
      lineWidth: 0.5,
      amplitude: -100,
      wavelength: 100,
      segmentLength: 10,
  //       strokeStyle: 'rgba(255, 255, 255, 0.1)'
    }
    ],

    // Perform any additional initializations here
    initialize: function (){},

    // This function is called whenver the window is resized
    resizeEvent: function() {

      // Here is an example on how to create a gradient stroke
      var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
      gradient.addColorStop(0,"rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.5,"rgba(255, 255, 255, 0.5)");
      gradient.addColorStop(1,"rgba(0, 0, 0, 0)");

      var index = -1;
      var length = this.waves.length;
        while(++index < length){
        this.waves[index].strokeStyle = gradient;
      }
    }
  });

  var redness = 255
  $("#textBox").keypress(function(event) {
    //Flash on keypress:
    waves.waves.forEach(function(wave) {
      wave.segmentLength += 25;
      wave.lineWidth += 8;
    });
    setTimeout(function() {
      waves.waves.forEach(function(wave) {
        wave.segmentLength -= 25;
        wave.lineWidth -= 7.75;
      });
    }, 250);
    //Flash amplitude on space:
    if (event.key === " ") {
      waves.waves.forEach(function(wave) {
        wave.amplitude *= 1.7;
      });
      setTimeout(function() {
        waves.waves.forEach(function(wave) {
          wave.amplitude /= 1.7;
        });
      }, 250);
    }

    //Blue on vowels.
    if (event.key === "a" || event.key === "e" || event.key === "i" || event.key === "o" || event.key === "u") {
      redness -= 50;
      waves.waves[2].strokeStyle = 'rgba(' + redness + ', 255, 255, 0.1)'
    }
  });
});
