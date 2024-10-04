
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
  this.allCloudLines = []
  this.maxHeight = h/10;
  this.minHeight = h/2;
  setVertices();
}

function draw() {
  background(220);
  //drawVertices();
  drawLine();
  line(0,maxHeight, w, maxHeight)
  line(0,minHeight, w, minHeight);
  
}

function setVertices(){
  //each new point will start at a random x-point. maxCount determines how many
  //bending points there will be for a given line. change determines the maximum diff between points that sum to the maxSpread. 
  //y-offset is not currently used. 
  //maxSpread is max amount of pixels the set of vertices are allowed to intially cover.

  //2nd version
  
  let maxLines = 400;
  let edgeLength = 0;      //space between points on a single line
  let spread = [20,100]

  for(let j = 0; j < maxLines; ++j){
    //maxSpread is max amount of pixels the set of vertices are allowed to intially cover.
    let maxSpread = random(spread[0],spread[1]);
    let maxCount = random(2,5);
    let change = maxSpread/maxCount;
    //set multiple coordinates in diagonal position. 
    let minX = 0-(w/3);
    let maxX = w
    let startX = random(minX,maxX); 
    let minY = -50;
    let maxY = minHeight-maxSpread;
    let startY = random(minY, maxY);
    let vertices = []
    let shapeFill = [101, 101, 98]
    let shapeAlpha = random(0,255);
    let alphaChange = random(0.2,2);
    for(let i = 0; i < maxCount; ++i){
      let next = createVector(startX, startY);
      //the starting position of x should already be in a random position 
      //this avoids waiting for the clouds to get in a decent position. at start of scene.
      next.x = random(next.x-edgeLength, next.x+edgeLength);
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
      vertexMap.set('alphaChange', alphaChange);
      vertices.push(vertexMap);
      //this.allVertices.push(vertexMap);
    }
    this.allCloudLines.push(vertices);
  }
}

function updateVertices(){
  let ySpeed = 0;
  let offsetSpeed = 20;
  let span = 0
  let defaultAngleSpeed = 0.03;
  //min/max of the speed of undulations of lines
  let maxX = 0.2; 
  let minX = 0.1;

  
  //2nd version update
  for(let j = 0; j < this.allCloudLines.length; ++j){
    for(let i = 0; i < this.allCloudLines[j].length; ++i){
      let currentVec = this.allCloudLines[j][i].get('vector');
      let currentOff = this.allCloudLines[j][i].get('xOffset');
      let angle = this.allCloudLines[j][i].get('angle');
      let angleSpeed = defaultAngleSpeed  // Speed of the oscillation
      angle += angleSpeed;

      currentOff += offsetSpeed;
      let noiseX = noise(1);
      let changeX = cos(angle) * map(noiseX, 0,1,0, maxX);
      currentVec.x += changeX;

      
      this.allCloudLines[j][i].set('xOffset', currentOff);
      this.allCloudLines[j][i].set('vector',currentVec)
      this.allCloudLines[j][i].set('angle', angle);
  
    } 
  }
  
}

let xSpeed = 0.5;
let ySpeed = 0.1;
function drawLine(){
  //the shape only needs one index curveVertex. the first index is best. 
  updateVertices();
  push();
  noFill();
  
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
      let currX = allVectors[i].get('vector').x
      let currY = allVectors[i].get('vector').y
      currX += xSpeed;
      currY += ySpeed;
      let next = createVector(currX, currY);
      allVectors[i].set('vector',next);
      if(currAlpha>255){
        let currChange = allVectors[i].get('alphaChange');
        currChange *= -1;
        allVectors[i].set('alphaChange',currChange);
      }
      allVectors[i].set('alpha',currAlpha);
      //reset the lines if it fades out
      if(allVectors[i].get('alpha') < -100){
        allVectors = resetLine();
      }
      //reset the lines if passed the min height
      if(allVectors[allVectors.length-1].get('vector').y > minHeight){
        //decrease alpha faster than normal
        allVectors[i].set('alphaChange',-3);
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
  let spread = [20,100]
  let maxSpread = random(spread[0],spread[1]);
  let maxCount = random(2,10);
  let change = maxSpread/maxCount;
  //set multiple coordinates in diagonal position. 
    let startX = random(0-(w/3),w); 
    let startY = random(-50, minHeight-maxSpread);
  let newLine = []
  let shapeFill = [101, 101, 98]
  let shapeAlpha = 0;
  let alphaChange = random(0.2,2);
  let edgeLength = 1;      //space between points on a single line
  for(let i = 0; i < maxCount; ++i){
    let next = createVector(startX, startY);
    //the starting position of x should already be in a random position 
    //this avoids waiting for the clouds to get in a decent position. at start of scene.
    next.x = random(next.x-edgeLength, next.x+edgeLength);
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
    vertexMap.set('alphaChange', alphaChange);
    newLine.push(vertexMap);
    //this.allVertices.push(vertexMap);
  }
  return newLine;
}
*/
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//creates a wave and a dot that follows the path of the wave. 
/*
let wavePoints = []; // Array to store points of the wavy line
let dotSize = 10;    // Size of the dot
let t = 0;           // Parameter to track position along the curve
let speed = 0.0005;   // Speed of the dot (adjust this value to control how fast the dot moves)

function setup() {
  createCanvas(800, 400);
  
  // Pre-calculate the wavy line points (shortened by half)
  for (let x = 0; x <= width; x += 100) { // Change from 50 to 100 to shorten the line
    let y = height / 2 + random(-50, 50); // Random y offset to create the wave
    wavePoints.push(createVector(x, y));  // Store each point in the array
  }
}

function draw() {
  background(220);
  
  noFill();
  stroke(0);
  strokeWeight(2);
  
  // Draw the pre-constructed wavy line
  beginShape();
  for (let point of wavePoints) {
    curveVertex(point.x, point.y); // Use curveVertex for a smoother curve
  }
  endShape();
  
  // Draw the moving dot along the curve
  noStroke(); // Remove stroke for the dot
  fill(255, 0, 0); // Set the dot color to red

  // Calculate the total number of control points
  let numPoints = wavePoints.length;

  // Use the modulus operator to keep t within the length of the curve
  let currentIndex = floor(t * (numPoints - 1)); // Calculate the current index based on t
  let nextIndex = currentIndex + 1; // Get the next index
  nextIndex = constrain(nextIndex, 0, numPoints - 1); // Ensure we stay within bounds

  // Calculate the position of the dot using curvePoint
  let dotX = curvePoint(
    wavePoints[max(0, currentIndex)].x, 
    wavePoints[min(numPoints - 1, nextIndex)].x, 
    wavePoints[min(numPoints - 1, nextIndex + 1)].x, 
    wavePoints[min(numPoints - 1, nextIndex + 2)].x, 
    t * (numPoints - 1) % 1 // Fractional part for interpolation
  );

  let dotY = curvePoint(
    wavePoints[max(0, currentIndex)].y, 
    wavePoints[min(numPoints - 1, nextIndex)].y, 
    wavePoints[min(numPoints - 1, nextIndex + 1)].y, 
    wavePoints[min(numPoints - 1, nextIndex + 2)].y, 
    t * (numPoints - 1) % 1 // Fractional part for interpolation
  );

  // Draw the dot
  ellipse(dotX, dotY, dotSize, dotSize); // Draw the dot at the current position

  // Increment t to move the dot along the curve
  t += speed;
  if (t > 1) {
    t = 0; // Reset t to loop the dot movement
  }
}
*/