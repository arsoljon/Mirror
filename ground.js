

export default class Ground {
  constructor(p5,width, height, i){
    //ground should be 1/4th the size of screen
    this.w = width;
    this.h = height;
    this.canvasLocation = i;
    //gc is the groundCanvas that holds all the graphics for the ground
    //use gc to reduce amount of drawing overhead. 
    this.gc = p5.createGraphics(this.w,this.h);
    //ground 
    //groundY1 is the y coordinate starting point
    //groundY2 is the height value of the rect shape
    this.groundY1 = this.h-(this.h/4);
    this.groundY2 = this.h/4;
    this.groundColor = ('#ab7b66')
    //debris setup
    this.allDirt = []
    this.allRock = []
    this.allGrass = []
    this.size1 = p5.random(15,25)
    this.size2 = p5.random(15,25)
    this.size3 = p5.random(15,25)
    let dirtLoc = p5.createVector(this.w/4,this.h-(this.groundY2 / 2)-this.size3*2)
    let rockLoc = p5.createVector(this.w/3,this.h-(this.groundY2 / 2)-this.size2*2)
    let grassLoc = p5.createVector(p5.random(0, this.w),p5.random((this.h - this.h/4+20), this.h));
    this.loc = [grassLoc, rockLoc, dirtLoc]
    this.maxBushels = 500;
    this.setupGrass(p5, this.maxBushels);
  }
  drawGround(p5){
    this.gc.push();
    this.gc.noStroke();
    this.gc.fill(this.groundColor);
    this.gc.rect(0, this.groundY1, this.w,this.groundY2);
    this.drawGroundCover(this.gc);
    this.gc.pop();
  }
  getGroundY2(){
    return this.groundY2;
  }
  getGround(p5){
    let c1 = p5.createVector(0,this.groundY1)
    let c2 = p5.createVector(this.w,this.groundY2)
    return [c1, c2]
  }
  getCanvas(){
    return this.gc;
  }
  getCanvasLocation(){
    return this.canvasLocation;
  }
  setCanvasLocation(i){
    this.canvasLocation = i;
  }

  drawGroundCover(p5){
    this.drawRock(p5);
    this.drawGrass(p5);
    this.drawGrass(p5);
  }

  drawRock(p5){
    //setup
    //make a custom shape with maximum of 3 points
    //1st point equals start point. 
    //2nd point -> x += 1<=changeX<= size/2, y += -size/3<=changeY<=size/3
    //3rd point -> x += -size/2<=changeX<=-1, y += -size/3<=changeY<=size/3
    let maxSize = 10;
    let minSize = 7;
    //let distance = this.size2+40
    let start = p5.createVector(this.loc[1].x, this.loc[1].y);
    this.allRock.push(start);
    let changeX = p5.random(minSize, maxSize)
    let changeY = p5.random(-minSize,minSize);
    let next = p5.createVector(start.x+changeX, start.y+changeY);
    this.allRock.push(next);
    changeX = p5.random(-minSize,minSize);
    changeY = p5.random(minSize, maxSize);
    next = p5.createVector(next.x+changeX, next.y+changeY);
    this.allRock.push(next);
    changeX = p5.random(-minSize,0);
    changeY = p5.random(minSize,maxSize)  
    next = p5.createVector(start.x+changeX, start.y+changeY);
    this.allRock.push(next);
    //draw  
      //rock - sharp or rounded cirlces    
    p5.push();
    this.color = [ 200, 200, 200] //grey
    let offset = 1;
    p5.fill(this.color);
    p5.stroke(0);
    p5.strokeWeight(1)
    p5.beginShape();
    p5.curveVertex(this.allRock[0].x*offset, this.allRock[0].y*offset);
    p5.curveVertex(this.allRock[1].x*offset, this.allRock[1].y*offset);
    p5.curveVertex(this.allRock[2].x*offset, this.allRock[2].y*offset);
    p5.curveVertex(this.allRock[3].x*offset, this.allRock[3].y*offset);
    p5.vertex(this.allRock[0].x*offset, this.allRock[0].y*offset);
    p5.vertex(this.allRock[1].x*offset, this.allRock[1].y*offset);
    p5.vertex(this.allRock[2].x*offset, this.allRock[2].y*offset);
    //vertex(this.allRock[3].x*offset, this.allRock[3].y*offset);
    p5.endShape();
    p5.pop();
  }

  setupGrass(p5, maxCount){
    //SETUp
    //single blade has 5 points
    //double blades have 9 points
    //triple blades have 13 points
    let pointCount = 5;
    let distance = this.size1 + 10;
    let x_offset = 0.05;
    let y_offset = .2;
    let xRange = [1,distance*x_offset];
    let yRange = [1,distance*y_offset];

    let lowestPoint = -1;

    for(let j = 0; j < maxCount; ++j){
      this.bushel = []
      let subPoint = p5.createVector(p5.random(0, this.w),p5.random((this.h - this.h/4+20), this.h));
      for(let p = 0; p < pointCount; ++p){
        let xChange = p5.random(xRange[0], xRange[1]);
        let yChange = p5.random(yRange[0], yRange[1]);
        subPoint.x += xChange;
        if(p>2){
          subPoint.y += yChange;
          //console.log(`going down: ${subPoint}`)
        }
        else{
          subPoint.y -= yChange;
          //console.log(`going up: ${subPoint}`)
        }
        let next = p5.createVector(subPoint.x, subPoint.y)
        this.bushel.push(next);
      }
      //make sure the height, y-value, is the same for the first and last grass blades.
      if(this.bushel[0].y > this.bushel[this.bushel.length-1].y){
        lowestPoint = this.bushel[0].y;
      }
      else{
        lowestPoint = this.bushel[this.bushel.length-1].y;
      }
      //2nd blade
      for(let p = 0; p < pointCount-1; ++p){
        let xChange = p5.random(xRange[0], xRange[1]);
        let yChange = p5.random(yRange[0], yRange[1]);
        subPoint.x += xChange;
        if(p>1){
          subPoint.y += yChange;
          //console.log(`going down: ${subPoint}`)
        }
        else{
          subPoint.y -= yChange;
          //console.log(`going up: ${subPoint}`)
        }
        let next = p5.createVector(subPoint.x, subPoint.y)
        this.bushel.push(next);
      }
      //make sure the height, y-value, is the same for the first and last grass blades.
      if(lowestPoint < this.bushel[this.bushel.length-1].y){
        lowestPoint = this.bushel[this.bushel.length-1].y;
      }
      //3rd blade
      for(let p = 0; p < pointCount-1; ++p){
        let xChange = p5.random(xRange[0], xRange[1]);
        let yChange = p5.random(yRange[0], yRange[1]);
        subPoint.x += xChange;
        if(p>1){
          subPoint.y += yChange;
          //console.log(`going down: ${subPoint}`)
        }
        else{
          subPoint.y -= yChange;
          //console.log(`going up: ${subPoint}`)
        }
        let next = p5.createVector(subPoint.x, subPoint.y)
        this.bushel.push(next);
      }
      //make sure the height, y-value, is the same for the first and last grass blades.
      if(lowestPoint < this.bushel[this.bushel.length-1].y){
        lowestPoint = this.bushel[this.bushel.length-1].y;
      }

      this.bushel[0].y = lowestPoint;
      this.bushel[this.bushel.length-1].y = lowestPoint;
      this.allGrass.push(this.bushel);
  }
    console.log(`bushel: ${this.bushel.length}`);
    console.log(this.allGrass);
    //main issue at the moment is the bushel is not being added as a separate bushel in the allgrass list
  }
  drawGrass(p5){
    //this.setupGrass(p5);
    //DRAW GRASS
    //grass - clump of blades
    p5.push();
    this.color = [131, 227, 115 ] //green
    p5.fill(this.color);
    p5.stroke(1);
    p5.strokeWeight(1)
    //point(loc[0].x,loc[0].y);
    for(let i = 0; i < this.allGrass.length; ++i){
      p5.beginShape();
      //1st blade
      p5.curveVertex(this.allGrass[i][0].x, this.allGrass[i][0].y)
      p5.curveVertex(this.allGrass[i][0].x, this.allGrass[i][0].y)
      p5.vertex(this.allGrass[i][1].x, this.allGrass[i][1].y)
      p5.vertex(this.allGrass[i][2].x, this.allGrass[i][2].y)
      p5.vertex(this.allGrass[i][3].x, this.allGrass[i][3].y)
      p5.curveVertex(this.allGrass[i][4].x, this.allGrass[i][4].y)
      p5.curveVertex(this.allGrass[i][4].x, this.allGrass[i][4].y)
    
      //2nd blade
      p5.vertex(this.allGrass[i][5].x, this.allGrass[i][5].y)
      p5.vertex(this.allGrass[i][6].x, this.allGrass[i][6].y)
      p5.vertex(this.allGrass[i][7].x, this.allGrass[i][7].y)
      p5.curveVertex(this.allGrass[i][8].x, this.allGrass[i][8].y)
      p5.curveVertex(this.allGrass[i][8].x, this.allGrass[i][8].y)
      
      //3rd blade
      p5.vertex(this.allGrass[i][9].x, this.allGrass[i][9].y)
      p5.vertex(this.allGrass[i][10].x, this.allGrass[i][10].y)
      p5.vertex(this.allGrass[i][11].x, this.allGrass[i][11].y)
      p5.curveVertex(this.allGrass[i][12].x, this.allGrass[i][12].y)
      p5.curveVertex(this.allGrass[i][12].x, this.allGrass[i][12].y)
      
      p5.endShape();
    }
    p5.pop()
  }
}
/*
function setup() {
  createCanvas(400, 400);
    this.w = width;
    this.h = height;
    //ground 
    //groundY1 is the y coordinate starting point
    //groundY2 is the height value of the rect shape
    this.groundY1 = this.h-(this.h/4);
    this.groundY2 = this.h/4;
    this.groundColor = ('#ab7b66')
    this.groundCover = []
    this.size1 = random(15,25)
  this.size2 = random(15,25)
  this.size3 = random(15,25)
  this.pointCount = [random(1,4),random(1,4),random(1,4)]
  let dirtLoc = createVector(w/4,h-(this.groundY2 / 2)-this.size3*2)
  let rockLoc = createVector(w/3,h-(this.groundY2 / 2)-this.size2*2)
  let grassLoc = createVector(w/2,h-(this.groundY2 / 2)-this.size1*2)
  this.loc = [grassLoc, rockLoc, dirtLoc]
  this.allDirt = []
  this.allRock = []
  this.allGrass = []
  setDirt();
  setRock();
  setGrass();
}

function draw() {
  background(220);
  drawGround();
}
function drawGround(){
    push();
    fill(this.groundColor);
    rect(0, this.groundY1, this.w,this.groundY2);
    pop();
    makeGroundCover()
  }

function setGrass(){
  //single blade has 5 points
  //double blades have 9 points
  //triple blades have 13 points
  let pointCount = 5;
  let distance = this.size1 + 10;
  let x_offset = 0.05;
  let y_offset = .2;
  let xRange = [1,distance*x_offset];
  let yRange = [1,distance*y_offset];
  let subPoint = this.loc[0]
  let grass = [];
  let lowestPoint = -1;
//console.log(`subPoint: ${subPoint}`);
  for(let p = 0; p < pointCount; ++p){
    xChange = random(xRange[0], xRange[1]);
    yChange = random(yRange[0], yRange[1]);
    subPoint.x += xChange;
    if(p>2){
      subPoint.y += yChange;
      //console.log(`going down: ${subPoint}`)
    }
    else{
      subPoint.y -= yChange;
      //console.log(`going up: ${subPoint}`)
    }
    let next = createVector(subPoint.x, subPoint.y)
    this.allGrass.push(next);
  }
  //make sure the height, y-value, is the same for the first and last grass blades.
  if(allGrass[0].y > allGrass[allGrass.length-1].y){
    lowestPoint = allGrass[0].y;
  }
  else{
    lowestPoint = allGrass[allGrass.length-1].y;
  }
  //2nd blade
  for(let p = 0; p < pointCount-1; ++p){
    xChange = random(xRange[0], xRange[1]);
    yChange = random(yRange[0], yRange[1]);
    subPoint.x += xChange;
    if(p>1){
      subPoint.y += yChange;
      //console.log(`going down: ${subPoint}`)
    }
    else{
      subPoint.y -= yChange;
      //console.log(`going up: ${subPoint}`)
    }
    let next = createVector(subPoint.x, subPoint.y)
    this.allGrass.push(next);
  }
  //make sure the height, y-value, is the same for the first and last grass blades.
  if(lowestPoint < allGrass[allGrass.length-1].y){
    lowestPoint = allGrass[allGrass.length-1].y;
  }
  //3rd blade
    for(let p = 0; p < pointCount-1; ++p){
    xChange = random(xRange[0], xRange[1]);
    yChange = random(yRange[0], yRange[1]);
    subPoint.x += xChange;
    if(p>1){
      subPoint.y += yChange;
      //console.log(`going down: ${subPoint}`)
    }
    else{
      subPoint.y -= yChange;
      //console.log(`going up: ${subPoint}`)
    }
    let next = createVector(subPoint.x, subPoint.y)
    this.allGrass.push(next);
  }
  //make sure the height, y-value, is the same for the first and last grass blades.
  if(lowestPoint < allGrass[allGrass.length-1].y){
    lowestPoint = allGrass[allGrass.length-1].y;
  }

  allGrass[0].y = lowestPoint;
  allGrass[allGrass.length-1].y = lowestPoint;
}

function makeGrass(size){
      //grass - clump of blades
  this.color = [131, 227, 115 ] //green
  push()  
  fill(this.color);
  rect(w/2,h-(this.groundY2 / 2),this.size1,this.size1);
  pop()
  push()
    fill(this.color);
    stroke(1);
  strokeWeight(1)
    //point(loc[0].x,loc[0].y);
  
  beginShape();
  //1st blade
  curveVertex(this.allGrass[0].x, this.allGrass[0].y)
  curveVertex(this.allGrass[0].x, this.allGrass[0].y)
  vertex(this.allGrass[1].x, this.allGrass[1].y)
  vertex(this.allGrass[2].x, this.allGrass[2].y)
  vertex(this.allGrass[3].x, this.allGrass[3].y)
  curveVertex(this.allGrass[4].x, this.allGrass[4].y)
  curveVertex(this.allGrass[4].x, this.allGrass[4].y)

  //2nd blade
  vertex(this.allGrass[5].x, this.allGrass[5].y)
  vertex(this.allGrass[6].x, this.allGrass[6].y)
  vertex(this.allGrass[7].x, this.allGrass[7].y)
  curveVertex(this.allGrass[8].x, this.allGrass[8].y)
  curveVertex(this.allGrass[8].x, this.allGrass[8].y)
  
  //3rd blade
  vertex(this.allGrass[9].x, this.allGrass[9].y)
  vertex(this.allGrass[10].x, this.allGrass[10].y)
  vertex(this.allGrass[11].x, this.allGrass[11].y)
  curveVertex(this.allGrass[12].x, this.allGrass[12].y)
  curveVertex(this.allGrass[12].x, this.allGrass[12].y)
  
  endShape();
  pop()
}


function setRock(){
  //make a custom shape with maximum of 3 points
  //1st point equals start point. 
  //2nd point -> x += 1<=changeX<= size/2, y += -size/3<=changeY<=size/3
  //3rd point -> x += -size/2<=changeX<=-1, y += -size/3<=changeY<=size/3
  let maxSize = 10;
  let minSize = 7;
  let distance = this.size2+40
  let start = createVector(this.loc[1].x, this.loc[1].y);
  console.log("rock start: "+start);
  this.allRock.push(start);
  let changeX = random(minSize, maxSize)
  let changeY = random(-minSize,minSize);
  let next = createVector(start.x+changeX, start.y+changeY);
  this.allRock.push(next);
  changeX = random(-minSize,minSize);
  changeY = random(minSize, maxSize)
  next = createVector(next.x+changeX, next.y+changeY);
  this.allRock.push(next);
  changeX = random(-minSize,0);
  changeY = random(minSize,maxSize)  
  next = createVector(start.x+changeX, start.y+changeY);
  this.allRock.push(next);
  
}

function makeRock(size){
  //rock - sharp or rounded cirlces
  this.color = [ 200, 200, 200] //grey
  push()  
  fill(this.color);
  
  rect(w/3,h-(this.groundY2 / 2),this.size2,this.size2);
  pop()

  
  push();
  let offset = 1;
      fill(this.color);
    stroke(0);
  strokeWeight(1)
  beginShape();
  curveVertex(this.allRock[0].x*offset, this.allRock[0].y*offset);
  curveVertex(this.allRock[1].x*offset, this.allRock[1].y*offset);
  curveVertex(this.allRock[2].x*offset, this.allRock[2].y*offset);
  curveVertex(this.allRock[3].x*offset, this.allRock[3].y*offset);
  vertex(this.allRock[0].x*offset, this.allRock[0].y*offset);
  vertex(this.allRock[1].x*offset, this.allRock[1].y*offset);
  vertex(this.allRock[2].x*offset, this.allRock[2].y*offset);
  //vertex(this.allRock[3].x*offset, this.allRock[3].y*offset);
  endShape();
  pop();
}


function setDirt(){
  this.xMin = loc[2].x;
  this.yMin = loc[2].y;
  this.xMax = loc[2].x+size3;
  this.yMax = loc[2].y+size3;
  let groupCount = pointCount[2];
  for(let i = 0; i < groupCount; ++i){
      let currentPoint = createVector(random(xMin, xMax), random(yMin, yMax));
    allDirt.push(currentPoint);
  }
}

function makeDirt(size){
  //dirt - group of dots

  this.color = 0;
  push()
    fill(this.color);
    rect(w/4,h-(this.groundY2 / 2),this.size3,this.size3);
  pop()


  push();
  //draw 1-4 dots within the respsective size radius.
    fill(this.color);
    stroke(this.color);
  strokeWeight(3)
  for(let i = 0; i < allDirt.length;++i){
    point(allDirt[i].x, allDirt[i].y);
  }
  pop();
}

function makeGroundCover(){
    //grass - clump of blades
  //rock - sharp or rounded cirlces
  //dirt - group of dots
  push()
  noFill();
  makeGrass(this.size1);
  makeRock(this.size2 );
  makeDirt();
  pop()
}
function drawGroundCover(){
  //grass - clump of blades
  //rock - sharp or rounded cirlces
  //dirt - group of dots
}

*/