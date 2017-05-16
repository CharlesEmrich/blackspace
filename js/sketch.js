// var yoff = 0.0;        // 2nd dimension of perlin noise

function setup() {
  createCanvas(2560,1440);
}
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


var yoff = 0.0;

function draw() {
  background(204);
  yoff = yoff + .01;
  var n = noise(yoff) * (height - 1000);
  line(0, n, width, n);
}

function keyTyped() {
  if (key === "a") {
    yoff = 100.0;
  }
  if (key === "e") {
    yoff = 0.0;
  }
  if (key === "i") {
    yoff = 5.0;
  }
}
