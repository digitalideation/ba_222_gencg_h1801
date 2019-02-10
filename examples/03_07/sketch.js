// Based on the code M_1_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// Some of the var might be initialised in gui.js
var agents;

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
  agents = [];   
  for (var i=0; i<10000; i++) {
    agents.push(new Agent());
  }
}

function draw() {

  smooth();
  background(backgroundGrey, options.overlayAlpha);  
  stroke(255, options.agentsAlpha);

  noiseDetail(options.octaves,options.falloff);

  // let t = millis()/10000;
  // to make it constant
  // let t = 1;

  for(var i=0; i<options.agentsCount-1; i++) {
    agents[i].draw(options.noiseScale, options.noiseStrength, options.strokeWidth, options.drawMode);
  }

  textSize(20);
  let txt = "octaves:"+options.octaves+" falloff:"+options.falloff;
  let txtWidth = textWidth(txt);
  rect(35,20,txtWidth+30,20+30);
  text(txt, 50, 50);
}


function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(360);  
  if (key == 's' || key == 'S') saveThumb(650, 350);

  if (key == '1') options.drawMode = 1;
  if (key == '2') options.drawMode = 2;
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

function drawArrow(x, y, w, h) {
  line(x,y,w,y);
  fill(255);
  triangle(x+w-(h/4),y-(h/8),x+w,y,x+w-(h/4),y+(h/8));
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