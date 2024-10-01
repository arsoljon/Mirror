
export default class clouds
{
    constructor(p5,width, height)
    {
        //cloud
        this.cloudMap = new Map();
        this.cloudSize = [1, 20];
        this.cloudRoll = [20,0];
        this.cloudCount = 250;
        this.w = width;
        this.h = height;
        //this.h = 300;
        //setClouds(p5);
    }

    setClouds(p5){
        for(let i = 0; i < this.cloudCount; ++i){
          let positionMap = new Map();
          //create a Cluster
          let min = 1;
          let max = 100;
          positionMap.set('offset', max - Math.floor(Math.random() * (max - min + 1)));
          let off = positionMap.get('offset');
          positionMap.set('maxCluster', 10);
          let clusterSize = positionMap.get('maxCluster');
          positionMap.set('clusterID', Math.floor(p5.random(clusterSize)));   //clusterID represents the specific cluster of clouds this cloud will be with.
      
          let id = positionMap.get('clusterID');
          let maxClusters = positionMap.get('maxCluster');
          min = id * (this.w/maxClusters);
          max = (id + 1) * (this.w/maxClusters);
          let xRange = [min, max];     //xRange represent the x parameters for a cloud spawn
          positionMap.set('xRange', xRange);
          min = 80;
          max = 90;
          let redRange = Math.floor(p5.map(p5.noise(off), 0,1, min, max));
          min = 106;
          max = 130;
          let blueRange = Math.floor(p5.map(p5.noise(off), 0,1, min, max))
          min = 117;
          max = 150;
          let greenRange = Math.floor(p5.map(p5.noise(off), 0,1, min, max))
          positionMap.set('speed', (id+1)*.1);
          positionMap.set('color', [redRange, blueRange, greenRange]);
      
          positionMap.set('angle', 360 - Math.floor(Math.random() * (360 - 0 + 1)));
          min = 0;
          max = this.w;
          //positionMap.set('cloudX', max - Math.floor(Math.random() * (max - min + 1)));
          positionMap.set('cloudX', p5.map(p5.noise(off), 0,1,0, min, max));
          min = 50;
          max = 200;
          //positionMap.set('cloudY', max - Math.floor(Math.random() * (max - min + 1)));
          positionMap.set('cloudY', p5.map(p5.noise(off), 0,1,0, min, max));
          min = 1
          max = 1000
          positionMap.set('strokeWeight', .5 * p5.map(p5.noise(off), 0,1,0, min, max))
          min = 0;
          max = 10;
          this.cloudMap.set(i, positionMap);
          //every ID represent a range a cloud line is allowed to be in. 
          //This should create a cluster of lines ressembling a cloud.
        }
    }

    drawClouds(p5) {
        p5.push();
        p5.fill('gray');
        //clouds should be represented by lines 
        //straight lines will follow a circular path  
        //A line will rotate
        //A line will follow a circular path. 
        //A line will finish a single rotation after it has finished a single path.
        //repeat for all other clouds.
        //General: cloudSpeed, cloudRoll, cloudSize
        //Specific: cloudPos, angle, 
        let history = [];
        for(let i = 0; i < this.cloudCount; ++i){
            let positionMap = this.cloudMap.get(i);
            let x = positionMap.get('cloudX');
            let y = positionMap.get('cloudY');
            let angle = positionMap.get('angle');
            let sw = positionMap.get('strokeWeight');
            let off = positionMap.get('offset');
            let cloudSpeed = positionMap.get('speed');
            let r = positionMap.get('redRange');
            let g  = positionMap.get('greenRange');
            let b = positionMap.get('blueRange');
            let v = p5.createVector(x,y);
            history.push(v);
            let maxCopies = 5;
            if(history.length > maxCopies){
                history.splice(0,1);
            }
            p5.push();
            //strokeWeight changes thickness of lines and stroke change color from black to white
            p5.fill('gray');
            p5.strokeWeight(sw);
            p5.stroke(500);
            p5.translate(x, y)
            if(x > this.w + this.w/6){
                x = this.cloudRespawn(p5,i);
                //cloud is at its endpoint
                //cloudOffset = 0;
            }
            x += cloudSpeed;
            p5.rotate(-angle);
            let strengthFill = 255;
            let strengthStroke = 255;
            //noStroke();
            //colorMode(HSB);
            p5.fill(r,g,b);
            p5.rect(this.cloudRoll[0],this.cloudRoll[1],this.cloudSize[0],this.cloudSize[1]);
            //add trail to the clouds
            for(let i = 0; i < history.length; ++i){
                p5.rect(this.cloudRoll[0]-i*5,this.cloudRoll[1]-i*1,this.cloudSize[0],this.cloudSize[1]);
            }
            p5.pop();
            angle += 1;
            if(angle > 360){
                //improbable of reaching but want to avoid overflow. 
                angle = 0;
            }
            positionMap.set('cloudX', x);
            positionMap.set('angle', angle);
            this.cloudMap.set(i, positionMap);
        }
        p5.pop();
    }
    cloudRespawn(p5,i){
        let positionMap = this.cloudMap.get(i);
        let xRange = positionMap.get('xRange');
        let off = positionMap.get('offset');
        let max = 0 - xRange[1];
        let min = 0 - xRange[0];
        let posX = p5.map(p5.noise(off), 0,1,0, min, max)
        return posX;
    }
}

/*
let w = 400;
let h = 400;

function setup() {
  createCanvas(w,h);
  this.xOff = 0;
  this.yOff = 100;
  this.x = 100;
  this.y = 100;
  this.xChange = .7;
  this.yChange = .7;
  this.allVertices = []
  setVertices();
}

function draw() {
  background(220);
  //drawVertices();
  drawLine();
  push();
  let noiseX = noise(this.xOff);
  let noiseY = noise(this.yOff);
  let xc = map(noiseX, 0,1,-100,100);
  let yc = map(noiseX, 0,1,0,10);
  strokeWeight(5);
  this.x += this.xChange;
  this.y += this.yChange;
  translate(this.x,this.y);
  point(xc,0);
  pop();
  if(this.y > h){
    this.y = 0;
    this.x = 0;
  }

}

function setVertices(){
  //set multiple coordinates in diagonal position. 
  let startX = w/2; 
  let startY = h/2;
  //maxSpread is max amount of pixels the set of vertices are allowed to intially cover.
  let maxSpread = 150;
  let maxCount = 10;
  let change = maxSpread/maxCount;
  for(let i = 0; i < maxCount; ++i){
    let next = createVector(startX, startY);
    startX += change;
    startY += change;
    let xOffset = random(0,50);
    let yOffset = random(51,100);
    let angle = random(0,100);
    let vertexMap = new Map();
    vertexMap.set('vector', next)
    vertexMap.set('xOffset', xOffset)
    vertexMap.set('yOffset', yOffset)
    vertexMap.set('angle', angle);
    this.allVertices.push(vertexMap);
  }
}

function updateVertices(){
  let speed = 0;
  let offsetSpeed = 0.007;
  let span = 1
  for(let i = 0; i < this.allVertices.length; ++i){
    let currentVec = this.allVertices[i].get('vector');
    let currentOff = this.allVertices[i].get('xOffset');
    let angle = this.allVertices[i].get('angle');
    let angleSpeed = 0.005  // Speed of the oscillation
    angle += angleSpeed;
    
    currentOff += offsetSpeed;
    let noiseX = noise(currentOff);
    let changeX = sin(angle) * map(noiseX, 0,1,-span, span);
    currentVec.x += changeX;
    this.allVertices[i].set('xOffset', currentOff);
    this.allVertices[i].set('vector',currentVec)
    this.allVertices[i].set('angle', angle);
  
  }
}

function drawLine(){
  updateVertices();
  let list = []
  for(let i = 0; i < this.allVertices.length; ++i){
    list.push(this.allVertices[i].get('vector'));
  }
  push()
  noFill();
  beginShape();
  curveVertex(list[0].x, list[0].y);
  //curveVertex(list[1].x, list[1].y);

  //curveVertex(list[3].x, list[3].y);

  //curveVertex(list[1].x, list[1].y);
  for(let i = 0; i < this.allVertices.length; ++i){
    vertex(list[i].x, list[i].y);
  }
  //vertex(list[0].x, list[0].y);
  //vertex(list[1].x, list[1].y);
  //vertex(list[2].x, list[2].y);
  //vertex(list[3].x, list[3].y);
    
  
  endShape();
  pop();
}

function drawVertices(){
  let speed = .7;
  let offsetSpeed = 0.007;
  for(let i = 0; i < this.allVertices.length; ++i){
    let coord = this.allVertices[i].get('vector');
    let xOffset = this.allVertices[i].get('xOffset');
    let yOffset = this.allVertices[i].get('yOffset');
    xOffset += offsetSpeed;
    yOffset += 0.1;
    coord.y += speed;
    coord.x += speed;

    let noiseX = noise(xOffset);
    let noiseY = noise(yOffset);
    let xc = map(noiseX, 0,1,-.001,.001);
    let yc = map(noiseX, 0,1,0,10);
    push();
    strokeWeight(5);
    translate(coord.x,coord.y);
    point(0,0);
    if(coord.y > h ){
      coord.y = 0;
      coord.x = 0;
      let next = createVector(coord.x,coord.y)
      this.allVertices[i].set('vector',next);
    }
    this.allVertices[i].set('xOffset',xOffset)
    this.allVertices[i].set('yOffset',yOffset)
    let next = createVector(coord.x, coord.y)
    this.allVertices[i].set('vector', next);
    pop();
  }
}
*/