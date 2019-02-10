// Variables declaration
let video;
let canvas;
let step_row, step_col;
let clear_background;


// Setup the sketch
function setup() {
  // Bool to clear background or not
  clear_background = true;
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


function draw() {
  
  // Draw the background 
  if (clear_background) background(0);
  // This function load the pixels from the webcam into an array called `pixels`
  video.loadPixels();
  // image(video,0,0);

  // We iterate through all the elements of the array
  for (let i = 0; i < video.pixels.length; i += 4) {

    // We calculate the x and y associated with this pixel
    let x = (i / 4) % video.width;
    let y = floor((i / 4) / video.width);

    // if x and why are on a column or row
    if (x % step_col == 0 && y % step_row == 0) {

      // assign r,g,b,a colors 
      let r = video.pixels[i];
      let g = video.pixels[i + 1];
      let b = video.pixels[i + 2];
      // let a = video.pixels[i + 3];
      let a = map(mouseX, 0, width, 0, 255);

      // Use the color from a pixel to draw a rectangle
      fill(r, g, b, a);
      noStroke();
      let w = step_col * 2;
      let h = step_row * 2;      
      rectMode(CENTER);
      rect(x, y, w, h);

    }
  }

}

// This function listen to the keys pressed on the keyboard
function keyPressed() {
  console.log(keyCode);
  // Clear bkgd bool
  if (key == ' c' || key == 'C') clear_background = !clear_background;
  // Clear background (DELETE == 8 on OSX)
  if (keyCode === 8) background(0);
}

// Resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}