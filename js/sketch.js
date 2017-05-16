// var yoff = 0.0;        // 2nd dimension of perlin noise
// function draw() {
//   background(51);
//
//   fill(255);
//   // We are going to draw a polygon out of the wave points
//   beginShape();
//
//   var xoff = 0;       // Option #1: 2D Noise
//   // var xoff = yoff; // Option #2: 1D Noise
//
//   // Iterate over horizontal pixels
//   for (var x = 0; x <= width; x += 10) {
//     // Calculate a y value according to noise, map to
//
//     // Option #1: 2D Noise
//     var y = map(noise(xoff, yoff), 0, 1, 200,300);
//
//     // Option #2: 1D Noise
//     // var y = map(noise(xoff), 0, 1, 200,300);
//
//     // Set the vertex
//     vertex(x, y);
//     // Increment x dimension for noise
//     xoff += 0.05;
//   }
//   // increment y dimension for noise
//   yoff += 0.01;
//   vertex(width, height);
//   vertex(0, height);
//   endShape(CLOSE);
// }


// var yoff = 0.0;
// function draw() {
//   background(204);
//   yoff = yoff + .008;
//   var n = noise(yoff) * (250);
//   line(0, n + 1, width, n + 1);
//   // line(0, n + 5, width, n + 5);
//   // line(0, n + 1, width, n - 1);
//   // line(0, n + 5, width, n - 5);
//   // line(0, n + 10, width, n + 10);
//   // line(0, n + 15, width, n + 15);
//   // line(0, n - 10, width, n - 10);
//   // line(0, n - 15, width, n - 15);
// }

// var xspacing = 16;    // Distance between each horizontal location
// var w;                // Width of entire wave
// var theta = 0.0;      // Start angle at 0
// var amplitude = 75.0; // Height of wave
// var period = 500.0;   // How many pixels before the wave repeats
// var dx;               // Value for incrementing x
// var yvalues;  // Using an array to store height values for the wave
//
// function setup() {
//   createCanvas(2560,1440);
//   w = width+16;
//   dx = (TWO_PI / period) * xspacing;
//   yvalues = new Array(floor(w/xspacing));
// }
//
// function draw() {
//   background(0);
//   calcWave();
//   renderWave();
// }
//
// function calcWave() {
//   // Increment theta (try different values for
//   // 'angular velocity' here)
//   theta += 0.02;
//
//   // For every x value, calculate a y value with sine function
//   var x = theta;
//   for (var i = 0; i < yvalues.length; i++) {
//     yvalues[i] = sin(x)*amplitude - 430;
//     x+=dx;
//   }
// }
//
// function renderWave() {
//   strokeWeight(3);
//   stroke(145);
//   for (var x = 0; x < yvalues.length; x++) {
//     line(x*xspacing, height/2+yvalues[x], x*xspacing, 10 + height/2+yvalues[x + 1])
//   }
// }

var xspacing = 8;   // Distance between each horizontal location
var w;              // Width of entire wave
var maxwaves = 1;   // total # of waves to add together

var theta = 0.0;
var amplitude = new Array(maxwaves);   // Height of wave
// Value for incrementing X, to be calculated
// as a function of period and xspacing
var dx = new Array(maxwaves);
// Using an array to store height values
// for the wave (not entirely necessary)
var yvalues;

function setup() {
  createCanvas(510,400);
  frameRate(30);
  colorMode(RGB, 255, 255, 255, 100);
  w = width + 16;

  for (var i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10,30);
    var period = random(100,300); // Num pixels before wave repeats
    dx[i] = (TWO_PI / period) * xspacing;
  }

  yvalues = new Array(floor(w/xspacing));
}

function draw() {
  background(0);
  calcWave();
  renderWave();
}

function calcWave() {
  // Increment theta (try different values
  // for 'angular velocity' here
  theta += 0.02;

  // Set all height values to zero
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = 0;
  }

  // Accumulate wave height values
  for (var j = 0; j < maxwaves; j++) {
    var x = theta;
    for (var i = 0; i < yvalues.length; i++) {
      // Every other wave is cosine instead of sine
      // if (i > .5 * yvalues.length - 1) {
      //   if (j % 2 == 0)  yvalues[i] += (sin(x)*amplitude[j]) / (sin(x)*amplitude[j] * (yvalues.length - i ));
      //   else yvalues[i] += (cos(x)*amplitude[j]) / (cos(x)*amplitude[j]);
      // }
      // if (i <= .5 * yvalues.length - 1) {
        if (j % 2 == 0)  yvalues[i] += sin(x)*amplitude[j];
        else yvalues[i] += cos(x)*amplitude[j];
      // }
      x+=dx[j];
    }
  }
}

function renderWave() {
  stroke(255);
  strokeWeight(3);
  for (var x = 0; x < yvalues.length; x++) {
    line(x*xspacing,width/2+yvalues[x],x*xspacing,width/2+yvalues[x+1])
  }
}
function keyTyped() {
  amplitude.push(random(10,30));
  var period = random(100,300);
  dx.push((TWO_PI / period) * xspacing);
  maxwaves ++;
  // console.log("speed up");
  // theta += 1.01;
  // setTimeout(function() {theta -= .01; console.log("speed down");}, 1000);
}
