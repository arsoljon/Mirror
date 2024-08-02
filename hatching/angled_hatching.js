export default class Angled_Hatching{
    constructor(p5, w= p5.width, l= p5.length){  
        this.width = w;
        this.length = l;
        this.allHatches = [];
        this.maxCount = 10;
        this.offset = 200;
        for(let i = 0; i <= this.maxCount; i++){
          let startX = ((this.width+this.offset) / this.maxCount)*i;
            let hatch = new Hatch(p5, startX, 0, this.offset);
            this.allHatches.push(hatch);    
        }
    }
    drawHatching(p5){
        for(let i = 0; i < this.maxCount; i++){
            this.allHatches[i].drawHatch(p5);    
        }
    }
}

class Hatch{
    constructor(p5, width_, length_, offset_){
        this.x = width_;
        this.y = length_;
        this.offset = offset_;
        this.hatch = [];
        this.maxCount = 20;
        this.horizontal_speed = 0;
        for(let i = 0; i < this.maxCount; i++){
            let start = p5.createVector(this.x-this.offset, 1);
            let end = p5.createVector(this.x, this.y);
            let particle = new Particle(p5, start, end);
            this.hatch.push(particle);
        }
    }
    drawHatch(p5){
        for(let i = 0; i < this.maxCount; i++){
            this.hatch[i].drawParticle(p5, this.horizontal_speed);
        }

    }
}

class Particle{
  constructor(p5, _start, _end){
    this.start = _start;
    this.end = _end;
    this.diff = this.start.x - this.start.y
    this.start.y = p5.random(0,this.end.y) + this.diff;
    this.start.x = this.start.y + this.diff;
    this.size = p5.createVector(1,60);
    this.loc = p5.createVector(this.start.x, this.start.y);
    this.angle = 45;
    this.xSpeed = p5.random(1,2);
    this.ySpeed = this.xSpeed;
    this.alpha = p5.random(0,255);
    this.fill = [101, 101, 98];
    this.alphaChange = p5.random(0.5, 1);
  }
  drawParticle(p5,h_speed){
    p5.push();
    p5.noStroke();
    p5.translate(this.loc.x, this.loc.y);
    p5.rotate(-this.angle);
    p5.fill(this.fill[0], this.fill[1], this.fill[2], this.alpha);
    p5.ellipse(0,0,this.size.x, this.size.y);
    p5.pop();
    this.resetParticle(p5);
  }
  resetParticle(p5,h_speed){
    this.loc.x += this.xSpeed;
    this.loc.y += this.ySpeed;
    this.alpha -= this.alphaChange;
    if(this.loc.y > p5.height + this.size.y){
      this.loc.y = 0 - this.size.y;
      this.loc.x = 0 + this.diff - this.size.y;
    }
    if(this.loc.x > p5.width +  this.size.y){
      this.loc.y = 0 - this.size.y;
      this.loc.x = 0 + this.diff - this.size.y;
    }
    if(this.alpha > 255 || this.alpha < 0){
      this.alphaChange *= -1;
  }
  }
}
