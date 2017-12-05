// random value image

// Global var
// Some of the var might be initialised in gui.js
var canvas, backgroundGrey, actRandomSeed, randomImg;

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
  actRandomSeed = 10;  
  downSample = 4;
}

function draw() {

  background(backgroundGrey, 20);
  smooth();

  // When mouse is pressed fix a randomSeed
  if (mouseIsPressed) randomSeed(map(mouseX,0,width,0,actRandomSeed));

  randomImg = createImage(toInt(width/downSample), toInt(height/downSample));

  randomImg.loadPixels();
  for(var x = 0; x < randomImg.width; x++) {
    for(var y = 0; y < randomImg.height; y++) {
      let randomValue = random(255);
      randomImg.set(x, y, [randomValue, randomValue, randomValue, 255]); 
    }
  }
  randomImg.updatePixels();

  image(randomImg,0,0,width,height);

  textSize(20);
  let txt = "downSample: "+downSample ;
  let txtWidth = textWidth(txt);
  text(txt, 50, 50);

}


function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(360);  
  if (key == 's' || key == 'S') saveThumb(650, 350);

  if (key == '3') downSample = (downSample > 1) ? downSample-1 : downSample;
  if (key == '4') downSample ++;

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