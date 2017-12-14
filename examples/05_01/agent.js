// Based on the code M_1_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

class Agent {

  constructor(x, y) {

    let _angle;
    let _isOutside = false;
    let _p = createVector(x, y);
    let _pStart = createVector(x, y);
    let _pOld = createVector(x, y);
    let _stepSize = random(1, 5);

    this.draw = function(noiseScale, noiseStrength, p, strokeWidth, drawMode){

      if (drawMode == 1) {
        _angle = noise(_p.x/noiseScale, _p.y/noiseScale, p) * noiseStrength;
      } else {
        _angle = noise(_p.x/noiseScale, _p.y/noiseScale, p) * 24; //
        _angle = (_angle - toInt(_angle)) * noiseStrength;  //
      }

      _p.x += cos(_angle) * _stepSize;
      _p.y += sin(_angle) * _stepSize;

      if(_p.x<-10) _isOutside = true;
      else if(_p.x>width+10) _isOutside = true;
      else if(_p.y<-10) _isOutside = true;
      else if(_p.y>height+10) _isOutside = true;

      if (_isOutside) this.restart();

      // Draw
      strokeWeight(strokeWidth);
      line(_pOld.x, _pOld.y, _p.x, _p.y);
      point(_p.x, _p.y);

      _pOld.set(_p);

      _isOutside = false;
    }

    this.getPosition = function() { return _p; }

    this.getAngle = function() { return _angle; }

    this.setPosition = function(p) { _p = p; }

    this.setAngle = function(angle) { _angle = angle; }

    this.restart = function() {
      _p.set(_pStart);
      _pOld.set(_p);      
    }

  }

}