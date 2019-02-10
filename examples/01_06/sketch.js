// Based on the code P_2_1_3_04.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// The var are initialised in gui.js
var count;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  // some of the var are initialised in gui.js
  count = 0;
  drawMode = 1;
}

function draw() {

  colorMode(HSB, 360, 100, 100, 255);
  rectMode(CENTER);
  smooth();
  stroke(150);
  noFill();

  background(0, options.bgAlpha);

  count = mouseX / 100 + 10;
  let para = mouseY / height;

  for (let gridY = 0; gridY <= options.tileCountY; gridY++) {
    for (let gridX = 0; gridX <= options.tileCountX; gridX++) {

      let tileWidth = width / options.tileCountX;
      let tileHeight = height / options.tileCountY;
      let posX = tileWidth * gridX + tileWidth / 2;
      let posY = tileHeight * gridY + tileHeight / 2;

      push();
      translate(posX, posY);

      // switch between modules
      switch (drawMode) {
        case 1:
          for (let i = 0; i < count; i++) {
            rect(0, 0, tileWidth, tileHeight);
            scale(1 - 3.0 / count);
            rotate(para * 0.1);
          }
          break;

        case 2:
          for (let i = 0; i < count; i++) {
            noStroke();
            gradient = lerpColor(color(0, 0, 0, 1), color(52, 100, 71, 200), i/count);
            fill(gradient);
            rotate(PI / 4);
            rect(0, 0, tileWidth, tileHeight);
            scale(1 - 3.0 / count);
            rotate(para * 1.5);
          }
          break;

        case 3:
          colorMode(RGB, 255);
          for (let i = 0; i < count; i++) {
            noStroke();
            gradient = lerpColor(color(options.fillColor), color(0,0), i / count);
            c = color(gradient);
            fill(c);

            push();
            translate(4 * i, 0);
            ellipse(0, 0, tileWidth / 2, tileHeight / 2);
            pop();

            push();
            translate(-4 * i, 0);
            ellipse(0, 0, tileWidth / 2, tileHeight / 2);
            pop();

            scale(1 - 1.5 / count);
            rotate(para * 1.5);
          }

          break;
      }

      pop();

    }
  }
}

function keyPressed() {
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