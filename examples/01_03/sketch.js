// Based on the code P_2_1_1_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
var tileCount, actRandomSeed, actStrokeCap;
 
function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Colors and drawing modes
  smooth();
  // Init Var
  tileCount = 50;
  actRandomSeed = 0;
  actStrokeCap = ROUND; 
}

function draw() {
  // Canvas draw options
  background(255);
  smooth();
  noFill();

  // Stroke options
  strokeCap(actStrokeCap);
  randomSeed(actRandomSeed);

  for (let gridX = 0; gridX < tileCount; gridX++) {
    for (let gridY = 0; gridY < tileCount; gridY++) {

      let posX = width / tileCount * gridX;
      let posY = width / tileCount * gridY;

      let toggle = toInt(random(0, 2));

      if (toggle == 0) {
        strokeWeight(mouseX / 20);
        line(posX, posY, posX + width / tileCount, posY + height / tileCount);

      } else if (toggle == 1) {
        strokeWeight(mouseY / 20);
        line(posX, posY + width / tileCount, posX + height / tileCount, posY);
      }
    }
  }
}

function mousePressed() {
  actRandomSeed = toInt(random(100000));
}

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
  if (key == '1') actStrokeCap = ROUND;
  if (key == '2') actStrokeCap = SQUARE;
  if (key == '3') actStrokeCap = PROJECT;
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