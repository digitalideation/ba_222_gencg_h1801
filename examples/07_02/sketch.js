// Variables declaration
let video;
let canvas;
let step_row, step_col;

// Setup the sketch
function setup() {
  // Number of row and columns in our grid
  step_row = 10;
  step_col = 10;
  // We do not handle high density screen  
  pixelDensity(1);
  // Create the canvas that will hold the main sketch
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Camera input
  var constraints = {
    video: {
      width: 320,
      height: 240
      // frameRate: { ideal: 10, max: 15 }       
    },
    audio: false
  };
  video = createCapture(constraints);
}

// Main draw loop
function draw() {
  // Draw the background 
  background(0);
  // Load the pixels from the webcam into an array called `pixels`
  video.loadPixels();
  // Draw the pixels
  let s = 2;
  let x = width / 2 - (video.width * s) / 2;
  let y = height / 2 - (video.height * s) / 2;
  drawPixels(pixels, x, y, s);
}

// Draw pixels function
function drawPixels(pixels, x, y, s) {
  push();
    translate(x, y);
    scale(s);
    // We iterate through all the elements of the array
    for (let i = 0; i < video.pixels.length; i += 4) {
      // We calculate the x and y associated with a pixel
      let x = (i / 4) % video.width;
      let y = floor((i / 4) / video.width);
      // if x and why are on a column or row
      if (x % step_col == 0 && y % step_row == 0) {
        // assign r,g,b,a colors 
        let r = video.pixels[i];
        let g = video.pixels[i + 1];
        let b = video.pixels[i + 2];
        let a = video.pixels[i + 3];
        // Use the color from a pixel to draw a rectangle
        fill(r, g, b, a);
        noStroke();
        // We can change some parameters here
        let w = step_col * 2;
        let h = step_row * 2;
        rectMode(CENTER);
        rect(x, y, w, h);
      }
    }
  pop();
}

// This function listen to the keys pressed on the keyboard
function keyPressed() {
  // Left / right arrows control the number of columns
  if (keyCode === LEFT_ARROW) step_col = (step_col > 0) ? step_col - 1 : 0;
  if (keyCode === RIGHT_ARROW) step_col = (step_col < 20) ? step_col + 1 : 20;
  // up / down arrows control the number of rows
  if (keyCode === UP_ARROW) step_row = (step_row > 0) ? step_row - 1 : 0;
  if (keyCode === DOWN_ARROW) step_row = (step_row < 20) ? step_row + 1 : 20;
  // Save image
  if (key == 's' || key == 'S') saveImg(width, height);
}

// Save Image
function saveImg(w, h) {
  let img = get(width / 2 - w / 2, height / 2 - h / 2, w, h);
  let file_name = Date.now().toString() + ".jpg";
  save(img, file_name);
}

// Resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

