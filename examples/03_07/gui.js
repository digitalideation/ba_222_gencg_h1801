
var options = {
    agentsCount: 400,
    noiseScale: 300, 
    noiseStrength: 10,
    overlayAlpha: 10, 
    agentsAlpha: 90,
    strokeWidth: 0.3,
    drawMode: 1,
    octaves: 4,
    falloff: 0.5
};

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(options, 'agentsCount').min(1).max(10000).step(1);
  gui.add(options, 'noiseScale').min(1).max(1000).step(1);
  gui.add(options, 'noiseStrength').min(0).max(100).step(1);
  gui.add(options, 'overlayAlpha').min(0).max(255).step(.1);
  gui.add(options, 'agentsAlpha').min(0).max(255).step(.1);
  gui.add(options, 'strokeWidth').min(0).max(10).step(.1);
  gui.add(options, 'drawMode', [1, 2] );
  gui.add(options, 'octaves').min(0).max(20).step(1);
  gui.add(options, 'falloff').min(0).max(1).step(.05);
};