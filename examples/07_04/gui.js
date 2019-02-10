
var options = {
    scale: 2,
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
  var f1 = gui.addFolder('Image');
  f1.add(options, 'scale').min(1).max(10).step(1);
  var f2 = gui.addFolder('Agents');
  f2.add(options, 'agentsCount').min(1).max(10000).step(1);
  f2.add(options, 'noiseScale').min(1).max(1000).step(1);
  f2.add(options, 'noiseStrength').min(0).max(100).step(1);
  f2.add(options, 'overlayAlpha').min(0).max(255).step(.1);
  f2.add(options, 'agentsAlpha').min(0).max(255).step(.1);
  f2.add(options, 'strokeWidth').min(0).max(10).step(.1);
  f2.add(options, 'drawMode', [1, 2] );
  f2.add(options, 'octaves').min(0).max(20).step(1);
  f2.add(options, 'falloff').min(0).max(1).step(.05);
};