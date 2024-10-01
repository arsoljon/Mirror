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
  this.allCloudLines = []
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
  //each new point will start at a random x-point. maxCount determines how many
  //bending points there will be for a given line. change determines the maximum diff between points that sum to the maxSpread. 
  //y-offset is not currently used. 
  //maxSpread is max amount of pixels the set of vertices are allowed to intially cover.
  let maxSpread = random(50,100);
  let maxCount = random(5,10);
  let change = maxSpread/maxCount;
  //set multiple coordinates in diagonal position. 
  let startX = random(w/10,w+(w*.2)); 
  let startY = h/2;

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
  //2nd version
  
  let maxLines = 10;

  for(let j = 0; j < maxLines; ++j){
    //maxSpread is max amount of pixels the set of vertices are allowed to intially cover.
    let maxSpread = random(50,150);
    let maxCount = random(5,10);
    let change = maxSpread/maxCount;
    //set multiple coordinates in diagonal position. 
    let startX = random(0-(w/3),w); 
    let startY = h/2;
    let vertices = []
    let shapeFill = [101, 101, 98]
    let shapeAlpha = random(0,255);
    for(let i = 0; i < maxCount; ++i){
      let next = createVector(startX, startY);
      //the starting position of x should already be in a random position 
      //this avoids waiting for the clouds to get in a decent position. at start of scene.
      next.x = random(next.x-100, next.x+100);
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
      vertexMap.set('fill', shapeFill)
      vertexMap.set('alpha', shapeAlpha)
      vertexMap.set('alphaChange', random(0.5,1));
      vertices.push(vertexMap);
      //this.allVertices.push(vertexMap);
    }
    this.allCloudLines.push(vertices);
  }
}

function updateVertices(){
  let ySpeed = 0;
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
    currentVec.y += ySpeed;
    if(currentVec.y > h+150){
      currentVec.y = 0-h;
    }
    this.allVertices[i].set('xOffset', currentOff);
    this.allVertices[i].set('vector',currentVec)
    this.allVertices[i].set('angle', angle);
  
  }
  
  //2nd version update
  for(let j = 0; j < this.allCloudLines.length; ++j){
    for(let i = 0; i < this.allCloudLines[j].length; ++i){
      let currentVec = this.allCloudLines[j][i].get('vector');
      let currentOff = this.allCloudLines[j][i].get('xOffset');
      let angle = this.allCloudLines[j][i].get('angle');
      let angleSpeed = 0.005  // Speed of the oscillation
      angle += angleSpeed;

      currentOff += offsetSpeed;
      let noiseX = noise(currentOff);
      let changeX = cos(angle) * map(noiseX, 0,1,-span, span);
      currentVec.x += changeX;
      currentVec.y += ySpeed;
      if(currentVec.y > h+150){
        currentVec.y = 0-h;
      }
      this.allCloudLines[j][i].set('xOffset', currentOff);
      this.allCloudLines[j][i].set('vector',currentVec)
      this.allCloudLines[j][i].set('angle', angle);
  
    } 
  }
  
}


function drawLine(){
  //the shape only needs one index curveVertex. the first index is best. 
  updateVertices();
  let list = []
  for(let i = 0; i < this.allVertices.length; ++i){
    list.push(this.allVertices[i].get('vector'));
  }
  push()
  noFill();
  beginShape();
  push()
  curveVertex(list[0].x, list[0].y);
  //curveVertex(list[1].x, list[1].y);

  //curveVertex(list[3].x, list[3].y);

  //curveVertex(list[1].x, list[1].y);
  for(let i = 0; i < this.allVertices.length; ++i){
    vertex(list[i].x, list[i].y);
  }
  pop()
  endShape();
  
  for(let j = 0; j < this.allCloudLines.length; ++j){
    let allVectors = this.allCloudLines[j];
    push();
    beginShape();
    curveVertex(allVectors[0].get('vector').x, allVectors[0].get('vector').y);
    for(let i = 0; i < allVectors.length;++i){
      stroke(101, 101, 98,allVectors[i].get('alpha'))
      vertex(allVectors[i].get('vector').x, allVectors[i].get('vector').y);
      let currAlpha = allVectors[i].get('alpha');
      currAlpha += allVectors[i].get('alphaChange');
      if(currAlpha>255){
        let currChange = allVectors[i].get('alphaChange');
        currChange *= -1;
        allVectors[i].set('alphaChange',currChange);
      }
      allVectors[i].set('alpha',currAlpha);
      if(allVectors[i].get('alpha') < -100){
        allVectors = resetLine();
      }
    }
    endShape();
    pop();
    this.allCloudLines[j] = allVectors;
   
    
  }
  pop();
}

function resetLine(){
  //alpha begins at 0;
  //maxSpread is max amount of pixels the set of vertices are allowed to intially cover.
  let maxSpread = random(50,150);
  let maxCount = random(5,10);
  let change = maxSpread/maxCount;
  //set multiple coordinates in diagonal position. 
  let startX = random(0-(w/3),w); 
  let startY = h/2;
  let newLine = []
  let shapeFill = [101, 101, 98]
  let shapeAlpha = 0;
  for(let i = 0; i < maxCount; ++i){
    let next = createVector(startX, startY);
    //the starting position of x should already be in a random position 
    //this avoids waiting for the clouds to get in a decent position. at start of scene.
    next.x = random(next.x-100, next.x+100);
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
    vertexMap.set('fill', shapeFill)
    vertexMap.set('alpha', shapeAlpha)
    vertexMap.set('alphaChange', random(0.5,1));
    newLine.push(vertexMap);
    //this.allVertices.push(vertexMap);
  }
  return newLine;
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