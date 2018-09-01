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
  backgroundGrey = 255;
  count = 100;
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
  let angle = radians(360/count);

  // Draw
  let numShades = 30;
  let brightness = 80;
  let saturation = 50;  

  let startHue = toInt(map(mouseX, 0, width, 0, 360));
  let targetHue = toInt(map(mouseY, 0, height, 0, 360));  
  
  for (var r=radius; r>1; r-=10){
    // hue = lerp(startHue, targetHue, (r/10));
    hue = r/2;
    hue = lerp(startHue, targetHue, r/radius);
    // fillHsluv(hue, brightness, saturation);
    
    colorMode(HSL);
    // noFill();
    noStroke();
    fill(hue, brightness, saturation, .05);
    beginShape();
      for (let i=0; i<count; i++){
        let radiusRand = r - noise(t, i*r)*(r/radius)*50;
        let x = width/2 + cos(angle*i)*radiusRand;
        let y = height/2 + sin(angle*i)*radiusRand;
        points[i] = createVector(x,y);
        curveVertex(points[i].x, points[i].y);
        if (i==0 || i==count-1) curveVertex(points[i].x, points[i].y);
      }
    endShape(CLOSE);
  }

}


function keyPressed() {
  if (key == DELETE || key == BACKSPACE) background(360);  
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

// Color functions
function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function strokeHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function colorHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
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