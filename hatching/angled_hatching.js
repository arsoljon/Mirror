export default class Angled_Hatching{
    constructor(p5, w= p5.width, l= p5.length){  
        this.width = w;
        this.length = l;
        this.allHatches = [];
        this.maxCount = 2;
        for(let i = 0; i <= this.maxCount; i++){
            let hatch = new Hatch(p5, (this.width/this.maxCount) * i, this.length);
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
    constructor(p5, width_, length_){
        this.x = width_;
        this.y = length_;
        this.hatch = [];
        this.maxCount = 50;
        this.horizontal_speed = 0;
        for(let i = 0; i < this.maxCount; i++){
            let start = p5.createVector(this.x, 0);
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
    this.size = p5.createVector(2,10);
    this.loc = p5.createVector(this.start.x, this.start.y);
    this.angle = 45;
    this.xSpeed = p5.random(1,2);
    this.ySpeed = this.xSpeed;
    this.alpha = p5.random(0,255);
    this.fill = [101, 101, 98];
    this.alphaChange = 0.9;
  }
  drawParticle(p5,h_speed){
    p5.push();
    p5.translate(this.loc.x, this.loc.y);
    p5.rotate(-this.angle);
    p5.fill(this.fill[0], this.fill[1], this.fill[2], this.alpha);
    p5.ellipse(0,0,this.size.x, this.size.y);
    p5.pop();
    this.resetParticle();
  }
  resetParticle(p5,h_speed){
    this.loc.x += this.xSpeed;
    this.loc.y += this.ySpeed;
    this.alpha -= this.alphaChange;
    if(this.loc.y > this.end.y + this.size.y){
      this.loc.y = 0 - this.size.y;
      this.loc.x = 0 + this.diff - this.size.y;
    }
    if(this.loc.x > this.end.x +  this.size.y){
      this.loc.y = 0 - this.size.y;
      this.loc.x = 0 + this.diff - this.size.y;
    }
    if(this.alpha > 255 || this.alpha < 0){
      this.alphaChange *= -1;
  }
  }
}

/*





function setup() {
  createCanvas(400, 400);
  this.allParticles = [];
  this.maxParticles = 10;
  for(let i = 0; i < this.maxParticles; ++i){
    //let p = new Particle(createVector(random(-300,width-50),1),createVector(width,height));
    let p = new Particle(createVector(0,1),createVector(width,height));
    this.allParticles.push(p);
  }
}

function draw() {
  background(220);
  for(let i = 0; i < this.maxParticles; ++i){
    
    this.allParticles[i].drawParticle();

  }
  //this.allParticles[3].drawParticle();
  ellipse(10,10,10,10);
}

class Particle{
  constructor(_start, _end){
    this.start = _start;
    this.end = _end;
    this.diff = abs(this.start.x - this.start.y)
    this.start.y = random(0,height) + this.diff;
    this.start.x = this.start.y - this.diff;
    this.size = createVector(10,100);
    this.loc = createVector(this.start.x, this.start.y);
    this.angle = 29;
    this.xSpeed = 1;
    this.ySpeed = 1;
  }
  getCoord(){
    return this.loc;
  }
  drawParticle(){
    push();
    translate(this.loc.x, this.loc.y);
    rotate(-this.angle);
    ellipse(0,0,this.size.x, this.size.y);
    pop();
    this.updateLocation();
  }
  updateLocation(){
    this.loc.x += this.xSpeed;
    this.loc.y += this.ySpeed;
    if(this.loc.y > height + this.size.y){
      this.loc.y = 0 - this.size.y
      this.loc.x = 0 - this.diff - this.size.y;
    }
    if(this.loc.x > width +  this.size.y){
      this.loc.y = 0 - this.size.y
      this.loc.x = 0 - this.diff - this.size.y;
    }
  }
}

*/