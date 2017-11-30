// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
var w, numRects, colorStep, brightness, saturation;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  numRects = 10;
}

function draw() {

  w = width / numRects;
  colorStep = toInt(360/numRects);
  noStroke();

  brightness = toInt(map(mouseX, 0, height, 1, 100));
  saturation = toInt(map(mouseY, 0, width, 1, 100));

  colorMode(HSL);
  for (var i = 0; i < numRects; i++) {
    fill(i * colorStep, brightness, saturation);
    rect(i * w, 0, w, height / 2);
  }

  colorMode(RGB);
  translate(0, height / 2);
  for (var i = 0; i < numRects; i++) {
    fillHsluv(i * colorStep, brightness, saturation);
    rect(i * w, 0, w, height / 2);
  }

}

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);

  if (keyCode == 38) numRects ++ ; // up arrow
  if (keyCode == 40) numRects = numRects>1  ? numRects-1 : numRects ; // down arrow

}

// Color functions

function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function strokeHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}

// Thumb
function saveThumb(w, h) {
  let img = get(width/2 - w/2, height/2 - h/2, w, h);
  save(img, 'thumb.jpg');
}