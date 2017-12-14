// Based on the code P_2_2_2_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// The var are initialised in gui.js
var NORTH, EAST, SOUTH, WEST;
var posX, posY, posXcross, posYcross;
var direction, angleCount, angle, stepSize, minLength;
var dWeight, dStroke, drawMode;
var canvas, backgroundGrey;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  // var density = displayDensity();
  // pixelDensity(density);
  // Init var
  // some of the var are initialised in gui.js
  backgroundGrey = 50;
  NORTH = 0;
  EAST = 1;
  SOUTH = 2;
  WEST = 3;
  //
  direction = SOUTH;
  angleCount = 7;    //// 1 - ...
  angle = getRandomAngle(direction);
  stepSize = 10;
  minLength = 10;
  // width and brightness of the stroke depend on line length
  dWeight = 50;
  dStroke = 4;
  //
  drawMode = 1;
  // Positions
  posX = random(0, width);
  posY = 5;
  posXcross = posX;
  posYcross = posY;
  background(backgroundGrey);
}

function draw() {

  smooth();
  stepSize = map(mouseX, 1, width, 1, 20);

  // ------ draw dot at current position ------
  strokeWeight(1);
  stroke(200);
  point(posX, posY);

  // ------ make step ------
  posX += cos(radians(angle)) * stepSize;
  posY += sin(radians(angle)) * stepSize;

  // ------ check if agent is near one of the display borders ------
  let reachedBorder = false;

  if (posY <= 5) {
    direction = SOUTH;
    reachedBorder = true;
  } 
  else if (posX >= width-5) {
    direction = WEST;
    reachedBorder = true;
  }
  else if (posY >= height-5) {
    direction = NORTH;
    reachedBorder = true;
  }
  else if (posX <= 5) {
    direction = EAST;
    reachedBorder = true;
  }

  // ------ if agent is crossing his path or border was reached ------
  loadPixels();
  let pixelColors = get(toInt(posX),toInt(posY));
  if ( brightness(color(pixelColors)) != brightness(color(backgroundGrey)) || reachedBorder) {
    angle = getRandomAngle(direction);
    let distance = dist(posX, posY, posXcross, posYcross);
    if (distance >= minLength) {
      strokeWeight(distance/dWeight);
      if (drawMode == 1) stroke(0);
      if (drawMode == 2) stroke(52, 100, distance/dStroke);
      if (drawMode == 3) stroke(192, 100, 64, distance/dStroke);
      line(posX, posY, posXcross, posYcross);
    }
    posXcross = posX;
    posYcross = posY;
  }

}

function getRandomAngle(theDirection) {
  let a = (floor(random(-angleCount, angleCount)) + 0.5) * 90.0/angleCount;

  if (theDirection == NORTH) return (a - 90);
  if (theDirection == EAST) return (a);
  if (theDirection == SOUTH) return (a + 90);
  if (theDirection == WEST) return (a + 180);

  return 0;
}



function keyPressed() {
  if (key == DELETE || key == BACKSPACE) background(360);  
  if (key == 's' || key == 'S') saveThumb(650, 350);

  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
  if (key == '3') drawMode = 3;

}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

//  conversion
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