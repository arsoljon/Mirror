export default class Hatching{
    constructor(p5, w, l){  
        this.width = w;
        this.length = l;
        this.allHatches = [];
        this.maxCount = 20;
        for(let i = 1; i <= this.maxCount; i++){
            let hatch = new Hatch(p5, (this.width/this.maxCount)*i, this.length);
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
        this.width = width_;
        this.length = length_;
        this.hatch = [];
        this.maxCount = 50;
        for(let i = 0; i < this.maxCount; i++){
            let start = p5.createVector(this.width, p5.random(0,this.length));
            let end = p5.createVector(this.width, this.length);
            let particle = new Particle(p5, start, end);
            this.hatch.push(particle);
        }
    }
    drawHatch(p5){
        for(let i = 0; i < this.maxCount; i++){
            this.hatch[i].drawParticle(p5);
        }
    }
}

class Particle{
    constructor(p5, start, end){
        this.size = p5.createVector(2,20);
        this.boundary = [start, end];
        this.speed = p5.random(0.2,0.6);
        this.alpha = p5.random(0,255);
        this.fill = [101, 101, 98];
        this.alphaChange = 0.9;
    }
    drawParticle(p5){
        p5.push();
        p5.noStroke();
        p5.fill(this.fill[0], this.fill[1], this.fill[2], this.alpha);
        p5.ellipse(this.boundary[0].x,this.boundary[0].y, this.size.x, this.size.y);
        p5.pop();
        this.resetParticle(p5);
    }
    resetParticle(p5){
        this.boundary[0].y += this.speed;
        this.alpha -= this.alphaChange;
        if(this.boundary[0].y > this.boundary[1].y){
            this.boundary[0].y = 0-this.size.y;
        }
        if(this.alpha > 255 || this.alpha < 0){
            this.alphaChange *= -1;
        }
    }
}

