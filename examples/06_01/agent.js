// Based on the code M_1_5_01.pde from
// Generative Gestaltung, ISBN: 978-3-87439-759-9

class Agent {

  constructor(x, y, ttl) {

    let _angle;
    let _isOutside = false;
    let _p = createVector(x, y);
    let _pStart = createVector(x, y);
    let _pOld = createVector(x, y);
    let _stepSize = random(1, 5);
    let _ttl = ttl;
    let _t = 0;

    this.draw = function(noiseScale, noiseStrength, p, strokeWidth, drawMode){

      switch (drawMode) {
        case 1:
          let faderX = mouseX/width;
          _angle = noise(_p.x/noiseScale, _p.y/noiseScale, p*faderX) * noiseStrength;
          _p.x += cos(map(_angle,0,noiseStrength,0,2)) * _stepSize;
          _p.y += sin(map(_angle,0,noiseStrength,-.4,.8)) * _stepSize;
          break;
        case 2:
          _angle = noise(_p.x/noiseScale, _p.y/noiseScale, p) * 24;
          _angle = (_angle - toInt(_angle)) * noiseStrength;  //
          _p.x += cos(map(_angle,0,noiseStrength,0,2)) * _stepSize;
          _p.y += sin(map(_angle,0,noiseStrength,-.4,.8)) * _stepSize;
          break;
        case 3:
          // let faderX = mouseX/width;
          _angle = radians(360/50);
          let radiusRand = 200 - noise(millis()/1000, p*faderX)*50;
          _p.x = width/2 + cos(_angle*p)*radiusRand;
          _p.y = height/2 + sin(_angle*p)*radiusRand;
          break;
      }


      _t ++;

      if(_p.x<-10 || _p.x>width+10 || _p.y<-10 || _p.y>height+10 || _t>_ttl) _isOutside = true;

      if (_isOutside) this.restart();

      // Draw
      // stroke(_angle*25,_angle*5, _angle*2, options.agentsAlpha);
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
      _t = 0;     
    }

  }

}