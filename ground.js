

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
    this.grassGroups = new Map();
    this.size1 = p5.random(15,25)
    this.size2 = p5.random(15,25)
    this.size3 = p5.random(15,25)
    let dirtLoc = p5.createVector(this.w/4,this.h-(this.groundY2 / 2)-this.size3*2)
    let rockLoc = p5.createVector(this.w/3,this.h-(this.groundY2 / 2)-this.size2*2)
    let grassLoc = p5.createVector(p5.random(0, this.w),p5.random((this.h - this.h/4+20), this.h));
    this.loc = [grassLoc, rockLoc, dirtLoc]
    this.maxBushels = 600;
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
    //x_offset changes width of blades
    //y_offset changes height of blades
    let pointCount = 5;
    let distance = this.size1 + 10;
    let x_offset = 0.03;
    let y_offset = .1;
    let xRange = [1,distance*x_offset];
    let yRange = [1,distance*y_offset];
    let listOfSingles = []
    let listOfDoubles = []
    let listOfTriples = []
    let maxSingles = maxCount/2;
    let maxDoubles = maxSingles/2;
    let maxTriples = maxDoubles/3;
    let lowestPoint = -1;
    //single
    for(let j = 0; j < maxSingles; ++j){
      this.bushel = []
      let subPoint = p5.createVector(p5.random(0, this.w),p5.random((this.h - (this.h*.24)), this.h));
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
        //simplify the x and y values
        let x = Math.trunc(subPoint.x * 10) / 10;
        let y =  Math.trunc(subPoint.y * 10) / 10;
        let next = p5.createVector(x, y)
        this.bushel.push(next);
      }
      //make sure the height, y-value, is the same for the first and last grass blades.
      if(this.bushel[0].y > this.bushel[this.bushel.length-1].y){
        lowestPoint = this.bushel[0].y;
      }
      else{
        lowestPoint = this.bushel[this.bushel.length-1].y;
      }
      //this.bushel[0].y = this.bushel[0].y.toFixed(2);

      //this.allGrass.push(this.bushel);
      listOfSingles.push(this.bushel);
  }
    //double
    for(let j = 0; j < maxDoubles; ++j){
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
        //simplify the x and y values
        let x = Math.trunc(subPoint.x * 10) / 10;
        let y =  Math.trunc(subPoint.y * 10) / 10;
        let next = p5.createVector(x, y)
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
        //simplify the x and y values
        let x = Math.trunc(subPoint.x * 10) / 10;
        let y =  Math.trunc(subPoint.y * 10) / 10;
        let next = p5.createVector(x, y)
        this.bushel.push(next);
      }
      //make sure the height, y-value, is the same for the first and last grass blades.
      if(lowestPoint < this.bushel[this.bushel.length-1].y){
        lowestPoint = this.bushel[this.bushel.length-1].y;
      }
      
      this.bushel[0].y = lowestPoint;
      this.bushel[this.bushel.length-1].y = lowestPoint;
      //this.allGrass.push(this.bushel);
      listOfDoubles.push(this.bushel);
  }
    //triple 
    for(let j = 0; j < maxTriples; ++j){
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
        //simplify the x and y values
        let x = Math.trunc(subPoint.x * 10) / 10;
        let y =  Math.trunc(subPoint.y * 10) / 10;
        let next = p5.createVector(x, y)
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
        //simplify the x and y values
        let x = Math.trunc(subPoint.x * 10) / 10;
        let y =  Math.trunc(subPoint.y * 10) / 10;
        let next = p5.createVector(x, y)
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
        //simplify the x and y values
        let x = Math.trunc(subPoint.x * 10) / 10;
        let y =  Math.trunc(subPoint.y * 10) / 10;
        let next = p5.createVector(x, y)
        this.bushel.push(next);
      }
      //make sure the height, y-value, is the same for the first and last grass blades.
      if(lowestPoint < this.bushel[this.bushel.length-1].y){
        lowestPoint = this.bushel[this.bushel.length-1].y;
      }

      this.bushel[0].y = lowestPoint;
      this.bushel[this.bushel.length-1].y = lowestPoint;
      this.allGrass.push(this.bushel);
      listOfTriples.push(this.bushel);
  }
    //let totalList = listOfSingles.concat(listOfDoubles).concat(listOfTriples);
    //let sortedList = this.mergeSort(totalList);
    //console.log(sortedList);
    //listOfSingles = this.mergeSort(listOfSingles);
    //listOfDoubles = this.mergeSort(listOfDoubles);
    listOfTriples = this.mergeSort(listOfTriples);
    console.log(listOfSingles)
    this.grassGroups.set('singles', listOfSingles)
    this.grassGroups.set('doubles', listOfDoubles)
    this.grassGroups.set('triples', listOfTriples)

    //main issue at the moment is the bushel is not being added as a separate bushel in the allgrass list
  }
  drawGrass(p5){
    //this.setupGrass(p5);
    //DRAW GRASS
    //grass - clump of blades
    //get the groups of grass
    let singles = this.grassGroups.get('singles');
    let doubles = this.grassGroups.get('doubles');
    let triples = this.grassGroups.get('triples');
    let totalList = singles.concat(doubles)
    totalList = totalList.concat(triples);
    //totalList = this.mergeSort(totalList);
    //let targetY = this.getSmallestY(singles[0],doubles[0],triples[0]);
    p5.push();
    this.color = [131, 227, 115 ] //green
    p5.fill(this.color);
    p5.stroke(1);
    p5.strokeWeight(1)
    //point(loc[0].x,loc[0].y);
    for(let i = 0; i < singles.length; ++i){
      this.drawSingleBushel(p5,singles[i]);
    }
    for(let i = 0; i < doubles.length; ++i){
      this.drawDoubleBushel(p5,doubles[i]);
    }
    for(let i = 0; i < triples.length; ++i){
      this.drawTripleBushel(p5,triples[i]);
    }
    p5.pop()
  }
  drawSingleBushel(p5,single){
    p5.beginShape();
    //1st blade
    p5.curveVertex(single[0].x, single[0].y)
    p5.curveVertex(single[0].x, single[0].y)
    p5.vertex(single[1].x, single[1].y)
    p5.vertex(single[2].x, single[2].y)
    p5.vertex(single[3].x, single[3].y)
    p5.curveVertex(single[4].x, single[4].y)
    p5.curveVertex(single[4].x, single[4].y)
    
    p5.endShape();
  }
  drawDoubleBushel(p5,double){
    p5.beginShape();
    //1st blade
    p5.curveVertex(double[0].x, double[0].y)
    p5.curveVertex(double[0].x, double[0].y)
    p5.vertex(double[1].x, double[1].y)
    p5.vertex(double[2].x, double[2].y)
    p5.vertex(double[3].x, double[3].y)
    p5.curveVertex(double[4].x, double[4].y)
    p5.curveVertex(double[4].x, double[4].y)
  
    //2nd blade
    p5.vertex(double[5].x, double[5].y)
    p5.vertex(double[6].x, double[6].y)
    p5.vertex(double[7].x, double[7].y)
    p5.curveVertex(double[8].x, double[8].y)
    p5.curveVertex(double[8].x, double[8].y)
    
    p5.endShape();
  }
  drawTripleBushel(p5,triple){
    p5.beginShape();
    //1st blade
    p5.curveVertex(triple[0].x, triple[0].y)
    p5.curveVertex(triple[0].x, triple[0].y)
    p5.vertex(triple[1].x, triple[1].y)
    p5.vertex(triple[2].x, triple[2].y)
    p5.vertex(triple[3].x, triple[3].y)
    p5.curveVertex(triple[4].x, triple[4].y)
    p5.curveVertex(triple[4].x, triple[4].y)
  
    //2nd blade
    p5.vertex(triple[5].x, triple[5].y)
    p5.vertex(triple[6].x, triple[6].y)
    p5.vertex(triple[7].x, triple[7].y)
    p5.curveVertex(triple[8].x, triple[8].y)
    p5.curveVertex(triple[8].x, triple[8].y)
    
    //3rd blade
    p5.vertex(triple[9].x, triple[9].y)
    p5.vertex(triple[10].x, triple[10].y)
    p5.vertex(triple[11].x, triple[11].y)
    p5.curveVertex(triple[12].x, triple[12].y)
    p5.curveVertex(triple[12].x, triple[12].y)
    
    p5.endShape();
  }
  mergeSort(arr){
    if(arr.length <= 1){
      return arr;
    }
    let mid = Math.floor(arr.length/2);
    let left = this.mergeSort(arr.slice(0,mid));
    let right = this.mergeSort(arr.slice(mid));
    console.log(left)
    return this.merge(left, right);
  }
  merge(left, right){
    let result = [];
    let i = 0; 
    let j = 0;
    while(i < left.length && j < right.length){
      console.log(left[i][0].y);
      console.log(right[i][0].y);
      if(left[i][0].y < right[i][0].y){
        result.push(left[i]);
        i++;
      }
      else{
        result.push(right[j]);
        j++;
      }
      console.log("SORTED");
      console.log(result)
      return result.concat(left.slice(i)).concat(right.slice(j));
    }
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