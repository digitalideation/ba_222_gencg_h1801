// Based on the code M_1_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

class Agent {

  constructor() {

    let _angle;
    let _isOutside = false;
    let _p = createVector(random(width), random(height));
    let _pOld = createVector(_p.x, _p.y);
    let _stepSize = random(1, 2);

    this.draw = function(noiseScale, noiseStrength, strokeWidth, drawMode){

      if (drawMode == 1) {
        _angle = noise(_p.x/noiseScale,_p.y/noiseScale) * noiseStrength;
      } else {
        _angle = noise(_p.x/noiseScale,_p.y/noiseScale) * 24; //
        _angle = (_angle - toInt(_angle)) * noiseStrength;  //
      }

      _p.x += cos(_angle) * _stepSize;
      _p.y += sin(_angle) * _stepSize;

      if(_p.x<-10) _isOutside = true;
      else if(_p.x>width+10) _isOutside = true;
      else if(_p.y<-10) _isOutside = true;
      else if(_p.y>height+10) _isOutside = true;

      if (_isOutside) {
        _p.x = random(width);
        _p.y = random(height);
        _pOld.set(_p);
      }

      strokeWeight(strokeWidth); //
      line(_pOld.x, _pOld.y, _p.x, _p.y);

      _pOld.set(_p);

      _isOutside = false;
    }

    this.getPosition = function() { return _p; }

    this.getAngle = function() { return _angle; }

    this.setPosition = function(p) { _p = p; }

    this.setAngle = function(angle) { _angle = angle; }

  }

}