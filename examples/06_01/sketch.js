// Based on the code M_1_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// Some of the var might be initialised in gui.js
var agents, density;
var imgDI01, imgDI02, imgDI01w, imgDI01h, imgDI02w, imgDI02h; 

function preload() {
  imgDI01 = loadImage("img/DI-Logo-01.png");
  imgDI02 = loadImage("img/DI-Logo-02.png");
}

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  // Comment it out if the sketch is too slow
  density = displayDensity();
  pixelDensity(density);
  // Init var
  // some of the var might be initialised in gui.js
  backgroundGrey = 255;
  background(backgroundGrey);
  // Init 
  initScene();
  imgDI01w = 474/2;
  imgDI01h = 296/2;
  imgDI02w = 470/2;
  imgDI02h = 312/2;
}

function draw() {

  // 
  smooth();
  background(backgroundGrey, options.overlayAlpha);  
  stroke(255,50,50, options.agentsAlpha);

  let offsetX = 30;
  let offsetY = 15;  
  image(imgDI02, width/2+imgDI02w/10-offsetX, height/2-imgDI02h/2-offsetY, imgDI02w, imgDI02h);

  noiseDetail(options.octaves,options.falloff);

  let t = millis()/10000;

  // Draw agents  
  for(var i=0; i<agents.length-1; i++) {
    agents[i].draw(options.noiseScale, options.noiseStrength, i, options.strokeWidth, options.drawMode);
  }

  image(imgDI01, width/2-imgDI01w-offsetX, height/2-imgDI01h/2+offsetY, imgDI01w, imgDI01h);

}


function initScene() {

  agents = []; 
  var step = options.step;
  for (var i=0; i<50; i++) {
    let x = width/2 + random(-150,-100);
    let y = height/2 + random(-100,0);
    agents.push(new Agent(x, y, 100));
    console.log(x);
  }

}

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(backgroundGrey);  
  if (keyCode == 32) {
    for(var i=0; i<agents.length-1; i++) agents[i].restart();
    background(backgroundGrey);
  }
  if (key == 's' || key == 'S') saveThumb(650, 350);

  if (key == '1') options.drawMode = 1;
  if (key == '2') options.drawMode = 2;
  if (key == '3') options.drawMode = 3;
  if (key == ' ') {
    let newNoiseSeed = floor(random(100000));
    noiseSeed(newNoiseSeed);
  }  

  if (keyCode == UP_ARROW) options.falloff += 0.05;
  if (keyCode == DOWN_ARROW) options.falloff -= 0.05;
  if (options.falloff > 1.0) options.falloff = 1.0;
  if (options.falloff < 0.0) options.falloff = 0.0;
  
  if (keyCode == LEFT_ARROW) options.octaves--;
  if (keyCode == RIGHT_ARROW) options.octaves++;
  if (options.octaves < 0) options.octaves = 0;

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