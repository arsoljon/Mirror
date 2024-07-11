
export default class Rain 
{
  constructor(p5, width, height, gY2){
    this.w = width;
    this.h = height;
    this.rainSpeed = 3;
    this.rainMap = new Map();
    this.rainDropCount = 100;
    this.groundY2 = gY2;
    this.stroke = 1;
    this.sizediff = 5;
    this.rainColor = '#176681';
  }
  setRain(p5){
    for(let i = 0; i < this.rainDropCount; ++i){
      let positionMap = new Map();
      positionMap.set('x1', Math.floor(Math.random() * (this.w - 0 + 1)));
      positionMap.set('x2', positionMap.get('x1'));
      positionMap.set('y1', Math.floor(Math.random() * (-this.h - 0 + 1)))
      positionMap.set('y2', positionMap.get('y1') + this.sizediff)
      let min = this.h - this.groundY2
      positionMap.set('endpoint', this.h - (Math.floor(Math.random() * (this.h - min + 1))));
      this.rainMap.set(i, positionMap);
    }
  }
  drawRain(p5){
    //a plethora of tiny lines falling downwards
    //should start at varying heights 
    //repeat begins falling just out of frame, 0 - length of line
    //each path ends at a random point between the top and bottom boundaries of the ground. 
    //each should have the same rainSpeed
    
    for(let i = 0; i < this.rainDropCount; ++i){
      this.updateRainDrop(p5,i);
      let position = this.rainMap.get(i);
      let x1 = position.get('x1');
      let y1 = position.get('y1');
      let x2 = position.get('x2');
      let y2 = position.get('y2');
      let endpoint = position.get('endpoint');
      if(y2 >= endpoint){
        let min = this.h - this.groundY2;
        endpoint = this.h - Math.floor(Math.random() * (this.h - min + 1));
        x1 = Math.floor(Math.random() * (this.w - 0 + 1));
        x2 = x1;
        y1 = -20 - this.sizediff;
        y2 = y1 + this.sizediff;
        position.set('x1',x1);
        position.set('x2',x2);
        position.set('y1',y1);
        position.set('y2',y2);
        position.set('endpoint',endpoint);
        this.rainMap.set(i, position);
      }
    }
  }
  updateRainDrop(p5,i){
    
    let position = this.rainMap.get(i);
    let x1 = position.get('x1');
    let x2 = position.get('x2');
    let y1 = position.get('y1');
    let y2 = position.get('y2');
    p5.push();
    p5.strokeWeight(this.stroke);
    p5.stroke(this.rainColor);
    p5.line(x1,y1,x2,y2);
    p5.pop();
    y1 += this.rainSpeed;
    y2 += this.rainSpeed;
    position.set('y1', y1);
    position.set('y2', y2);
    this.rainMap.set(i, position);
  }
}


let w = 450;
let h = 300;
//rain
let rainSpeed = 3;
let rainMap = new Map();
const rainDropCount = 400;

function rain(){
    //a plethora of tiny lines falling downwards
    //should start at varying heights 
    //repeat begins falling just out of frame, 0 - length of line
    //each path ends at a random point between the top and bottom boundaries of the ground. 
    //each should have the same rainSpeed
    for(let i = 0; i < rainDropCount; ++i){
      updateRainDrop(i);
      let position = rainMap.get(i);
      let x1 = position.get('x1');
      let y1 = position.get('y1');
      let x2 = position.get('x2');
      let y2 = position.get('y2');
      let endpoint = position.get('endpoint');
      if(y2 >= endpoint){
        min = h - groundY2;
        endpoint = h - Math.floor(Math.random() * (h - min + 1));
        x1 = Math.floor(Math.random() * (w - 0 + 1));
        x2 = x1;
        y1 = -20 - sizediff;
        y2 = y1 + sizediff;
        position.set('x1',x1);
        position.set('x2',x2);
        position.set('y1',y1);
        position.set('y2',y2);
        position.set('endpoint',endpoint);
        rainMap.set(i, position);
      }
    }
  }
  
  function updateRainDrop(i){
    let position = rainMap.get(i);
    let x1 = position.get('x1');
    let x2 = position.get('x2');
    let y1 = position.get('y1');
    let y2 = position.get('y2');
    line(x1,y1,x2,y2);
    y1 += rainSpeed;
    y2 += rainSpeed;
    position.set('y1', y1);
    position.set('y2', y2);
    rainMap.set(i, position);
  }
  
  function setRain(){
    for(let i = 0; i < rainDropCount; ++i){
      let positionMap = new Map();
      positionMap.set('x1', Math.floor(Math.random() * (w - 0 + 1)));
      positionMap.set('x2', positionMap.get('x1'));
      positionMap.set('y1', Math.floor(Math.random() * (-h - 0 + 1)))
      positionMap.set('y2', positionMap.get('y1') + sizediff)
      min = h - groundY2
      positionMap.set('endpoint', h - (Math.floor(Math.random() * (h - min + 1))));
      rainMap.set(i, positionMap);
    }
  }
    
  