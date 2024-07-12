
export default class Sky{
  constructor(p5, width, height){
    this.w = width;
    this.h = height;
    this.skyY2 = this.h-(this.h/4);
    this.sizediff = 5;
    this.skyColor = '#6daebe'
  }
  drawSky(p5){
    //sky should be 3/4th the size of screen
    p5.push();
    p5.fill(this.skyColor);
    p5.rect(0, 0, this.w,this.skyY2);
    p5.pop();
  }
}
/*
let w = 450;
let h = 300;
//sky
let skyY2 = h-(h/4);
const sizediff = 5;

function sky() {
    //sky should be 3/4th the size of screen
    push();
    fill('#6daebe');
    rect(0, 0, w,skyY2);
    pop();
  }
 */ 