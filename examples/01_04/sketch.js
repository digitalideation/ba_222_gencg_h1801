// Based on the code P_2_0_02.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
var tileCount, circleColor, circleAlpha, actRandomSeed;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  tileCount = 20;
  circleColor = color(255, 100);
  actRandomSeed = 0;
}

function draw() {

  translate(width/tileCount/2, height/tileCount/2);

  // background(25);
  background(25, 50);   // try to modify the alpha
  smooth();
  noFill();
  
  randomSeed(actRandomSeed);  // try to modify the seed
  stroke(circleColor);
  strokeWeight(mouseY/100);

  for (gridY=0; gridY<tileCount; gridY++) {
    for (gridX=0; gridX<tileCount; gridX++) {

      // draw element here
      
      posX = width/tileCount * gridX;
      posY = height/tileCount * gridY;

      shiftX = random(-mouseX, mouseX)/20;
      shiftY = random(-mouseX, mouseX)/20;

      rect(posX+shiftX, posY+shiftY, mouseY/15, mouseY/15);
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
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
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}