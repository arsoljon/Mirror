

export default class Ground {
  constructor(p5,width, height){
    //ground should be 1/4th the size of screen
    this.w = width;
    this.h = height;
    //ground
    this.groundY1 = this.h-(this.h/4);
    this.groundY2 = this.h/4;
    this.groundColor = ('#ab7b66')
  }
  drawGround(p5){
    p5.push();
    p5.fill(this.groundColor);
    p5.rect(0, this.groundY1, this.w,this.groundY2);
    p5.pop();
  }
  getGroundY2(){
    return this.groundY2;
  }
}
/*
function ground() {
    //ground should be 1/4th the size of screen
    push();
    fill('#ab7b66');
    rect(0, groundY1, w,groundY2);
    pop();
  }
*/