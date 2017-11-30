// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
var drawMode, offset, colors, startHue, startSat, startLig, changeHue, changeSat, changeLig;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  drawMode = 1;
  offset = 10;
  colorsCount = 3;
  randomiseColors();
}

function draw() {

  colors = [colorsCount];
  for (var i = 0; i < colorsCount; i++) {
    switch (drawMode) {
      // Random Hue
      case 1:
        colors[i] = colorHsluv(
          startHue + (i * changeHue),
          map(mouseX, 0, width, 0, 100),
          map(mouseY, 0, height, 0, 100)
        );
        break;
      // Random Saturation
      case 2:
        colors[i] = colorHsluv(
          map(mouseX, 0, width, 0, 100),
          startSat + (i * changeSat),
          map(mouseY, 0, height, 0, 100)
        );
        break;
      // Random Lightness
      case 3:
        colors[i] = colorHsluv(
          map(mouseX, 0, width, 0, 100),
          map(mouseY, 0, height, 0, 100),
          startLig + (i * changeLig)
        );
        break;
      // Random All
      case 4:
        colors[i] = colorHsluv(
          startHue + (i * changeHue),
          startSat + (i * changeSat),
          startLig + (i * changeLig)
        );
        break;
    }
  }

  noStroke();
  rectMode(CORNER);
  fill(colors[0]);
  rect(0, 0, width, height);
  rectMode(CENTER);
  for (var i = 1; i < colorsCount; i++) {
    fill(colors[i]);
    push();
      translate(width/2,height/2);
      scale(map(i, 1, colorsCount, 2, 1));
      rect(0,0,width/3,height/3);
    pop();
  }

  fill(0, 0, 0);
  let txt = '';
  switch (drawMode) {
    case 1:
      txt = 'Random Hue';
      break;
    case 2:
      txt = 'Random Saturation';
      break;
    case 3:
      txt = 'Random Lightness';
      break;
    case 4:
      txt = 'Random All';
      break;
  }
  txt += ' with ' + colorsCount + ' Colors';
  // fillHsluv(360);
  let txtWidth = textWidth(txt);
  text(txt, width / 2 - txtWidth / 2, 50);

}

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);

  if (keyCode == 38) colorsCount ++ ; // up arrow
  if (keyCode == 40) colorsCount = colorsCount>1  ? colorsCount-1 : colorsCount ; // down arrow

  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
  if (key == '3') drawMode = 3;
  if (key == '4') drawMode = 4;

  randomiseColors();
}

// 
function mousePressed() {
  randomiseColors();
}

function randomiseColors() {
  startHue = random(0, 360);
  startSat = random(0, 100);
  startLig = random(0, 100);
  changeHue = random(1, (360 - startHue) / colorsCount);
  changeSat = random(1, (100 - startSat) / colorsCount);
  changeLig = random(1, (100 - startLig) / colorsCount)
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

function colorHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
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
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  save(img, 'thumb.jpg');
}