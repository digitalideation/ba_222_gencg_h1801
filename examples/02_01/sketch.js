// Based on the code P_2_2_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

// Global var
// The var are initialised in gui.js
var maxCount, currentCount, elements, minRadius, maxRadius, mouseRect;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  // Init var
  // some of the var are initialised in gui.js
  mouseRect = 100; // size of the mouse rectangle
  maxCount = 5000; //max count of the cirlces
  minRadius = 3;
  maxRadius = 100;
  elements = [];
  elements.push(new gridElement(200, 100, 50, 200, 100));
  currentCount = 1;
}

function draw() {

  // colorMode(HSB, 360, 100, 100, 255);
  rectMode(CENTER);
  smooth();
  stroke(150);
  noFill();

  background(0);

  // create a random position
  let newX = random(0+maxRadius,width-maxRadius);
  let newY = random(0+maxRadius,height-maxRadius);
  let newR = minRadius;
  let closestX, closestY;

  // create a random position according to mouse position
  if (mouseIsPressed) {
    newX = random(mouseX-mouseRect/2,mouseX+mouseRect/2);
    newY = random(mouseY-mouseRect/2,mouseY+mouseRect/2);
    newR = 1;
  } 

  var intersection = false;

  // find out, if new circle intersects with one of the others
  for(let i=0; i < currentCount; i++) {
    let d = dist(newX, newY, elements[i].getX(), elements[i].getY());
    if (d < (newR + elements[i].getR())) {
      intersection = true; 
      break;
    }
  }

  // no intersection ... add a new circle
  if (intersection == false) {
    // get closest neighbour and closest possible radius
    let newRadius = width;
    for(let i=0; i < currentCount; i++) {
      let d = dist(newX, newY, elements[i].getX(), elements[i].getY());
      if (newRadius > d-elements[i].getR()) {
        newRadius = d-elements[i].getR();
        // elements[currentCount-1].setClosestIndex(i);
        closestX = elements[i].getX();
        closestY = elements[i].getY();
      }
    }

    if (newRadius > maxRadius) newRadius = random(maxRadius);
    
    elements.push(new gridElement(newX, newY, newRadius, closestX, closestY));
    currentCount++;

  }

  // draw them
  for (let i=0 ; i < currentCount; i++) {
    elements[i].draw();
  }

  // visualize the random range of the new positions
  if (mouseIsPressed) {
    stroke(255,200,0);
    strokeWeight(2);
    rect(mouseX,mouseY,mouseRect,mouseRect);
  } 

}

class gridElement {
  constructor(x, y, r, closestX, closestY){
    let _x = x;
    let _y = y;
    let _r = r;
    let _closestX = closestX;
    let _closestY = closestY;

    this.getX = function() { return _x; }

    this.getY = function() { return _y; }

    this.getR = function() { return _r; }

    this.setX = function(x) { _x = x; }

    this.setY = function(y) { _y = y; }

    this.setR = function(r) { _r = r; }

    this.setClosestX = function(x) { _closestX = x; }

    this.setClosestY = function(y) { _closestY = y; }

    this.draw = function() {
      let d = abs(_x-_closestX)*abs(_y-_closestY);
      stroke(map(d, (width*height)/100, 0, 255, 0), 0, 200);
      strokeWeight(1.5);
      ellipse(_x, _y, _r*2, _r*2);
      strokeWeight(0.75);
      line(_x, _y, _closestX, _closestY); 
    }

  }
}


function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

// Int conversion
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