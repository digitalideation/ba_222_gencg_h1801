// Based on some code from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// Some of the var might be initialised in gui.js
var canvas, backgroundGrey, radius;
var actRandomSeed, count, points;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  // Comment it out if the sketch is too slow
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  // some of the var are initialised in gui.js
  backgroundGrey = 50;
  actRandomSeed = 10;
  count = 150;
  points = [count];
  background(backgroundGrey);
  radius = height/10;
}

function draw() {
  // background(backgroundGrey);

  smooth();
  // randomSeed(actRandomSeed);

  let faderX = mouseX/width;
  let t = millis()/1000;
  radius += t/100;
  let angle = radians(360/count);

  for (let i=0; i<count; i++){
    // positions
    let radiusRand = radius - noise(t, i*faderX)*50;
    // let rand = random(r-20,r+20);  
    // let radiusRand = lerp(rand, r, faderX); 
    let x = width/2 + cos(angle*i)*radiusRand;
    let y = height/2 + sin(angle*i)*radiusRand;
    points[i] = createVector(x,y);
  }
  noStroke();
  beginShape();
  fill(255,1);
  for (let i=0; i<count; i++){
    curveVertex(points[i].x, points[i].y);
    if (i==0 || i==count-1) curveVertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);
}


function keyPressed() {
  if (key == DELETE || key == BACKSPACE) background(360);  
  if (key == 's' || key == 'S') saveThumb(650, 350);
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