// Noise generated circle

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
  backgroundGrey = 0;
  count = 150;
  points = [count];
  background(backgroundGrey);
  radius = height/2;
}

function draw() {
  background(backgroundGrey, 20);
  smooth();

  // Create points array
  let faderX = mouseX/width;
  let t = millis()/1000;
  let r = map(mouseY,0,height,10,radius);
  let angle = radians(360/count);

  for (let i=0; i<count; i++){
    let radiusRand = r - noise(t, i*faderX)*50;
    let x = width/2 + cos(angle*i)*radiusRand;
    let y = height/2 + sin(angle*i)*radiusRand;
    points[i] = createVector(x,y);
  }

  // Draw
  stroke(255,50);
  beginShape();
  for (let i=0; i<count; i++){
    fill(255);
    ellipse(points[i].x, points[i].y,2,2);
    noFill();
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