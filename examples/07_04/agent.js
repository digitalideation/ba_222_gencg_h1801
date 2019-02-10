// Based on the code M_1_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

class Agent {

  constructor(w, h, s) {

    let _w = w;
    let _h = h;
    let _angle;
    let _isOutside = false;
    let _p = createVector(random(_w), random(_h));
    let _pOld = createVector(_p.x, _p.y);
    let _stepSize = random(1, s);

    this.draw = function(noiseScale, noiseStrength, strokeWidth, strokeAlpha, drawMode, pixels, t){

      let i = toInt(_p.x) * 4 + toInt(_p.y) * _w * 4;
      // i = constrain(i, 0, pixels.length);
      let r = pixels[i];
      let g = pixels[i + 1];
      let b = pixels[i + 2];
      let a = pixels[i + 3];
      // Greyscale conversion
      let greyscale = round(r * 0.222 + g * 0.707 + b * 0.071);
      let s = map(greyscale, 0, 255, 1, 20);
      // noiseStrength = toInt(map(greyscale, 0, 255, 1, 100));
      // console.log(i + " " + pixels[i]);
      if (drawMode == 1) {
        _angle = noise(_p.x/noiseScale,_p.y/noiseScale,t) * toInt(s) * noiseStrength;
      } else {
        _angle = noise(_p.x/noiseScale,_p.y/noiseScale) * 24; //
        _angle = (_angle - toInt(_angle)) * noiseStrength;  //
      }

      _p.x += cos(_angle) * _stepSize ;
      _p.y += sin(_angle) * _stepSize;

      if(_p.x<1) _isOutside = true;
      else if(_p.x>_w-1) _isOutside = true;
      else if(_p.y<1) _isOutside = true;
      else if(_p.y>_h-1) _isOutside = true;

      if (_isOutside) {
        _p.x = random(_w);
        _p.y = random(_h);
        _pOld.set(_p);
      }

      stroke(greyscale, strokeAlpha);
      strokeWeight(strokeWidth); //
      line(_pOld.x, _pOld.y, _p.x, _p.y);
      // ellipse(_p.x, _p.y, 10)
      // noFill();

      _pOld.set(_p);

      _isOutside = false;
    }

    this.getPosition = function() { return _p; }

    this.getAngle = function() { return _angle; }

    this.setPosition = function(p) { _p = p; }

    this.setAngle = function(angle) { _angle = angle; }

  }

}