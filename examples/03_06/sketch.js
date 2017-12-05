// Based on the code M_1_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// Some of the var might be initialised in gui.js
var canvas, backgroundGrey, noiseXRange, noiseYRange, tileSize, gridResolutionX, gridResolutionY, octaves, falloff, arcColor, debugMode;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  // Comment it out if the sketch is too slow
  // var density = displayDensity();
  // pixelDensity(density);
  // Init var
  // some of the var might be initialised in gui.js
  debugMode = true;
  backgroundGrey = 0;
  background(backgroundGrey);
  arcColor = color(0,130,164);
  octaves = 4;
  falloff = 0.5;
  tileSize = 80;
  gridResolutionX = round(width/tileSize);
  gridResolutionY = round(height/tileSize);
}

function draw() {
  // ortho(-width/2, width/2, -height/2, height/2, .1, 100);
  camera(width/2, height/2+mouseY, (height)*1.2, width/2, height/2, 0, 0, 1, 0);

  background(backgroundGrey);
  ambientLight(255,0,0);

  noiseDetail(octaves,falloff);

  noiseXRange = mouseX/100;
  noiseYRange = mouseY/100;

  tileSize = (width/gridResolutionX > height/gridResolutionY) ? ceil(width/gridResolutionX) : ceil(height/gridResolutionY);

  let t = millis()/10000;
  // to make it constant
  // let t = 1;

  for(var x = 0; x < gridResolutionX; x++) {
    for(var y = 0; y < gridResolutionY; y++) {

      let posX = x*tileSize;
      let posY = y*tileSize;

      let noiseX = map(x, 0, gridResolutionX, 0, noiseXRange);
      let noiseY = map(y, 0, gridResolutionY, 0, noiseYRange);

      let noiseValue = noise(noiseX,noiseY,t);  // we add t to get a 3d noise
      let height = noiseValue*1000;

      push();

        translate(posX,posY,0);
        fill(noiseValue*255);
        noStroke();
        box(tileSize, tileSize, height);

      pop();      

    }
  }
}

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(360);  
  if (key == 's' || key == 'S') saveThumb(650, 350);

  if (key == '1') gridResolutionX = (gridResolutionX > 1) ? gridResolutionX-1 : gridResolutionX;
  if (key == '2') gridResolutionX ++;
  if (key == '3') gridResolutionY = (gridResolutionY > 1) ? gridResolutionY-1 : gridResolutionY;
  if (key == '4') gridResolutionY ++;

  if (keyCode == UP_ARROW) falloff += 0.05;
  if (keyCode == DOWN_ARROW) falloff -= 0.05;
  if (falloff > 1.0) falloff = 1.0;
  if (falloff < 0.0) falloff = 0.0;
  
  if (keyCode == LEFT_ARROW) octaves--;
  if (keyCode == RIGHT_ARROW) octaves++;
  if (octaves < 0) octaves = 0;

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