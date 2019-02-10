// Noise generated image

// Global var
// Some of the var might be initialised in gui.js
var canvas, backgroundGrey, noiseXRange, noiseYRange, noiseMode, octaves, falloff, colorCount;
let step_row, step_col;
let c, c1;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  // Comment it out if the sketch is too slow
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  // some of the var might be initialised in gui.js
  backgroundGrey = 0;
  background(backgroundGrey);
  octaves = 4;
  falloff = 0.5;
  noiseMode = 1;
  downSample = 4;
  colorCount = 24;
  step_row = 20;
  step_col = 20;
  c = 0;
  c1 = 0;
}

function draw() {

  background(backgroundGrey);
  strokeWeight(.5);
  // noStroke();
  // fill(255,100);
  noFill();

  smooth();

  noiseDetail(octaves,falloff);

  noiseXRange = mouseX/100;
  noiseYRange = mouseY/100;
  c1 += 0.01;
  c =0;
  console.log(c1)
  let t = millis()/10000;
  // translate(0,-c1*100);
  for(var y = 0; y < height; y++) {    
    beginShape();
    c += 0.005
    stroke((c1+c)*100%255,0,0);
    for(var x = 0; x < width; x++) {
      if (x % step_col == 0 && y % step_row == 0) {

        let noiseX = map(x, 0,width, 0,noiseXRange);
        let noiseY = map(y, 0,height, 0,noiseYRange);

        // var noiseValue = 0;
        // if (noiseMode == 1) { 
        //   noiseValue = noise(noiseY, noiseX, t);  // we add t to get a 3d noise
        // } 
        // else if (noiseMode == 2) {
        //   let n = noise(noiseY, noiseX, t) * colorCount;  // we add t to get a 3d noise
        //   noiseValue = (n-toInt(n));
        // }

        // curveVertex(x, y + y*noiseValue/2)
        var noiseValue = noise(noiseX, c1+c);
        curveVertex(x, y - noiseValue*200)

      }
    }
    endShape();
  }


  textSize(20);
  let txt = "octaves: "+octaves+" falloff: "+falloff+" noiseXRange: 0-"+noiseXRange+" noiseYRange: 0-"+noiseYRange+"\n downSample :"+downSample+" colorCount: "+colorCount ;
  text(txt, 50, 50);
}


function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(360);  
  if (key == 's' || key == 'S') saveThumb(650, 350);

  if (key == '1') noiseMode = 1;
  if (key == '2') noiseMode = 2;

  if (key == '5') colorCount = (colorCount > 2) ? colorCount-2 : colorCount;
  if (key == '6') colorCount += 2;

  if (keyCode == UP_ARROW) falloff += 0.05;
  if (keyCode == DOWN_ARROW) falloff -= 0.05;
  if (falloff > 1.0) falloff = 1.0;
  if (falloff < 0.0) falloff = 0.0;
  
  if (keyCode == LEFT_ARROW) octaves--;
  if (keyCode == RIGHT_ARROW) octaves++;
  if (octaves < 0) octaves = 0;

}

function keyPressed() {
}

// Tools
function setPixelColor(x, y, r, g, b, a) {
  var d = pixelDensity();
  for (var i = 0; i < d; i++) {
    for (var j = 0; j < d; j++) {
      // loop over
      idx = 4 * ((y * d + j) * width * d + (x * d + i));
      pixels[idx] = r;
      pixels[idx+1] = g;
      pixels[idx+2] = b;
      pixels[idx+3] = a;
    }
  }
}

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