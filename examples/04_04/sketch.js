// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Init var
}

function draw() {

  let offset = 40;

  noStroke();
  fillHsluv(40, 30, 65);
  rect(0, 0, width/2, height);
  fillHsluv(10, 40, 40);
  rect((width/4 - width/6), (height/2 - height/8) , width/3, height/4);
  fillHsluv(75, 50, 85);
  rect((width/4 - width/6) + offset, (height/2 - height/8) + offset, width/3, height/4);
  fillHsluv(0, 0, 0);  

  let txt = 'A desaturated color scheme';
  let txtWidth = textWidth(txt);
  text(txt, width/4 - txtWidth/2, (height/2 - height/8) - 50);

  fillHsluv(40, 100, 65);
  rect(width/2, 0, width, height);
  fillHsluv(10, 100, 40);
  rect(width/2 + (width/4 - width/6), (height/2 - height/8) ,width/3, height/4);
  fillHsluv(75, 100, 85);
  rect(width/2 + (width/4 - width/6) + offset, (height/2 - height/8) + offset, width/3, height/4);

  txt = 'A saturated color scheme';
  txtWidth = textWidth(txt);
  text(txt, width/2 + width/4 - txtWidth/2, (height/2 - height/8) - 50);

}

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
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