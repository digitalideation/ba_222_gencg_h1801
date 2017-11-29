var options = {
  tileCountX: 6,
  tileCountY: 6,
  bgAlpha: 255, 
  fillColor: [255, 120, 0], //RGB   
};

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(options, 'tileCountX').min(1).max(100).step(1);
  gui.add(options, 'tileCountY').min(1).max(100).step(1);
  gui.add(options, 'bgAlpha').min(0).max(255).step(.1);
  gui.addColor(options, 'fillColor');
};