var options = {
  actRandomSeed: 0,
  tileCount: 20,
  bgAlpha: 255, 
  circleLineColor: 255, 
  circleFillColor: [255, 120, 0], //RGB   
  circleLineAlpha: 50,
  fill: false,
};

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(options, 'actRandomSeed');
  gui.add(options, 'tileCount').min(1).max(100).step(1);
  gui.add(options, 'bgAlpha').min(0).max(255).step(.5);
  gui.add(options, 'circleLineColor').min(0).max(255).step(1);
  gui.add(options, 'circleLineAlpha').min(0).max(255).step(.5);
  gui.add(options, 'fill');
  gui.addColor(options, 'circleFillColor');
};