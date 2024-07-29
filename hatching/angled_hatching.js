export default class Angled_Hatching{
    constructor(p5, w, l){  
        this.width = w;
        this.length = l;
        this.allHatches = [];
        this.maxCount = 1;
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
        this.x = width_*2;
        this.y = length_*2;
        this.hatch = [];
        this.maxCount = 10;
        this.horizontal_speed = 0;
        for(let i = 0; i < this.maxCount; i++){
            let start = p5.createVector(0, p5.random(0,this.y));
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
    constructor(p5, start, end){
        this.size = p5.createVector(2,20);
        this.boundary = [start, end];
        this.initialX = this.boundary[0].x;
        //this.speed = p5.random(0.2,0.6);
        this.xSpeed =1;
        this.ySpeed = 2 * this.xSpeed;
        this.alpha = p5.random(254,255);
        this.fill = [101, 101, 98];
        this.alphaChange = 0;
    }
    drawParticle(p5,h_speed){
        p5.push();
        p5.noStroke();
        p5.fill(this.fill[0], this.fill[1], this.fill[2], this.alpha);
        p5.angleMode(p5.DEGREES);
        p5.translate(this.boundary[0].x,this.boundary[0].y)
        p5.rotate(-25);
        p5.ellipse(0,0, this.size.x, this.size.y);
        p5.pop();
        this.resetParticle(p5,h_speed);
    }
    resetParticle(p5,h_speed){
        this.boundary[0].y += this.ySpeed;
        this.boundary[0].x += this.xSpeed;
        this.alpha -= this.alphaChange;
        if(this.boundary[0].y > this.boundary[1].y){
            this.boundary[0].y = 0;
            this.boundary[0].x = this.initialX;

            console.log("got em!")
        }
        if(this.boundary[0].x > p5.width){
            this.boundary[0].x = this.initialX;
            this.boundary[0].y = 0;
            console.log("yo!");
        }
        let msg = `boundary1x : ${this.boundary[0].y}  boundary2x : ${this.boundary[1].y}`
        //console.log(msg);
        if(this.alpha > 255 || this.alpha < 0){
            this.alphaChange *= -1;
        }
    }
}

