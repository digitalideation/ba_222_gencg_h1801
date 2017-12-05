// Noise generated image

// Global var
// Some of the var might be initialised in gui.js
var canvas, backgroundGrey, noiseXRange, noiseYRange, noiseMode, octaves, falloff, noiseImg, downSample, colorCount;

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
}

function draw() {

  background(backgroundGrey, 20);
  smooth();

  noiseDetail(octaves,falloff);

  noiseXRange = mouseX/100;
  noiseYRange = mouseY/100;

  let t = millis()/10000;

  noiseImg = createImage(toInt(width/downSample), toInt(height/downSample));

  noiseImg.loadPixels();
  for(var x = 0; x < noiseImg.width; x++) {
    for(var y = 0; y < noiseImg.height; y++) {

      let noiseX = map(x, 0,width, 0,noiseXRange);
      let noiseY = map(y, 0,height, 0,noiseYRange);

      var noiseValue = 0;
      if (noiseMode == 1) { 
        noiseValue = noise(noiseX,noiseY,t) * 255;  // we add t to get a 3d noise
      } 
      else if (noiseMode == 2) {
        let n = noise(noiseX,noiseY,t) * colorCount;  // we add t to get a 3d noise
        noiseValue = (n-toInt(n)) * 255;
      }

      noiseImg.set(x, y, [noiseValue, noiseValue, noiseValue, 255]); 
    }
  }
  noiseImg.updatePixels();

  image(noiseImg,0,0,width,height);

  textSize(20);
  let txt = "octaves: "+octaves+" falloff: "+falloff+" noiseXRange: 0-"+noiseXRange+" noiseYRange: 0-"+noiseYRange+"\n downSample :"+downSample+" colorCount: "+colorCount ;
  text(txt, 50, 50);
}


function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(360);  
  if (key == 's' || key == 'S') saveThumb(650, 350);

  if (key == '1') noiseMode = 1;
  if (key == '2') noiseMode = 2;

  if (key == '3') downSample = (downSample > 1) ? downSample-1 : downSample;
  if (key == '4') downSample ++;

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