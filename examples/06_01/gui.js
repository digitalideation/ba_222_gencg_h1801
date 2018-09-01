
var options = {
    // Text
    txt: "Hello World",
    txtSize: 250,
    txtGray: 50, 
    txtAlpha: 0,
    step: 6,
    refresh: function () { initScene() },
    // Draw
    overlayAlpha: 5, 
    agentsAlpha: 30,
    strokeWidth: 0.3,
    // Noise
    noiseScale: 10, 
    noiseStrength: 70,
    drawMode: 1,
    octaves: 4,
    falloff: 0.5
};

window.onload = function() {
  var gui = new dat.GUI();
  // Text
  gui.add(options, 'txt');
  gui.add(options, 'txtSize').step(1);
  gui.add(options, 'txtGray').min(1).max(255).step(1);
  gui.add(options, 'txtAlpha').min(0).max(255).step(.1);
  gui.add(options, 'step').min(1).max(100).step(1);
  // Refresh text
  gui.add(options, 'refresh');
  // Draw
  gui.add(options, 'overlayAlpha').min(0).max(255).step(.1);
  gui.add(options, 'agentsAlpha').min(0).max(255).step(.1);
  gui.add(options, 'strokeWidth').min(0).max(50).step(.1);
  // Noise
  var f1 = gui.addFolder('Noise');
  f1.add(options, 'noiseStrength');
  f1.add(options, 'noiseScale').min(1).max(1000).step(1);
  f1.add(options, 'noiseStrength').min(0).max(100).step(1);
  f1.add(options, 'octaves').min(0).max(20).step(1);
  f1.add(options, 'falloff').min(0).max(1).step(.05);
  f1.add(options, 'drawMode', [1, 2] );
};