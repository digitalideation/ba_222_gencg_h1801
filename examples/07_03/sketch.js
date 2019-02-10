// Variables declaration
let video;
let canvas;
let step_row, step_col;
let draw_mode;

// Setup the sketch
function setup() {
  // Draw Mode
  draw_mode = 0;
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
  background(0);  
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
  drawPixels(video.pixels, x, y, s);
}

// Draw pixels function
function drawPixels(pixels, x, y, s) {
  push();
    translate(x, y);
    scale(s);
    // We iterate through all the elements of the array
    for (let i = 0; i < pixels.length; i += 4) {
      // We calculate the x and y associated with a pixel
      let x = (i / 4) % video.width;
      let y = floor((i / 4) / video.width);
      // if x and why are on a column or row
      if (x % step_col == 0 && y % step_row == 0) {
        // assign r,g,b,a colors 
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let a = pixels[i + 3];
        // Greyscale conversion
        let greyscale = round(r * 0.222 + g * 0.707 + b * 0.071);
        // Use the color from a pixel to draw a rectangle
        switch (draw_mode) {
          case 0:
            fill(255);
            noStroke();
            let w1 = map(greyscale, 0, 255, 2, 20);
            ellipse(x, y, w1);
            break;
          case 1:
            stroke(255);
            let w2 = map(greyscale, 0, 255, 1, 20);
            strokeWeight(w2);
            line(x-step_col/4, y-step_row/4, x+step_col/4, y+step_row/4);
            break;
          case 2:
            stroke(r, g, b);
            strokeWeight(.5);
            noFill();
            let r1 = map(greyscale, 0, 255, 0, PI);
            let s1 = map(greyscale, 0, 255, 1, 2);
            push();
              translate(x, y);
              rotate(r1);
              scale(s1);
              rectMode(CENTER);
              rect(0, 0, step_col, step_row);
            pop();
            break;            
        }
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
  // Draw modes
  if (key == '0') draw_mode = 0;
  if (key == '1') draw_mode = 1;
  if (key == '2') draw_mode = 2;
  if (key == '3') draw_mode = 3;
  // Clear background
  if (keyCode === DELETE) background(0);
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