let w = 450;
let h = 300;
let groundY1 = h-(h/4);
let groundY2 = h/4;
let skyY2 = h-(h/4);
const sizediff = 5;
let rainSpeed = 3;
let rainMap = new Map();
const rainDropCount = 400;
let cloudMap = new Map();
let angle = 0;
let x1 = 0;
let y1 = 0;
let x2 = 150;
let y2 = 150;
let cloudSize = [1, 20];
let cloudPos = [-100, 0];
let cloudRoll = [20,0];
//let cloudSpeed = 2;
let cloudCount =2000;
let cloudOffset = 0;

let allLimbs = new Map();


function setup() {
  createCanvas(w, h);
  angleMode(DEGREES);
  setRain();
  setClouds();
  setLimbs();
  //frameRate(5)
}

function draw() {
  //noStroke();
  background(0,220);
  sky();
  ground();
  rain();
  clouds();
  //template();
  roughPerson();
  jointBend();
}

function roughPerson(){
  push();
  ellipseMode(CORNER);
  //noStroke();
  fill('white');
  let headLoc = [138,100];
  let torsoLoc = [headLoc[0]+7,headLoc[1]+20];
  let leftArmLoc = [headLoc[0]+5,headLoc[1]+25];
  let rightArmLoc = [headLoc[0]+14,headLoc[1]+25];
  let leftLegLoc = [headLoc[0]+7,headLoc[1]+(headLoc[1]/2)+5];
  let rightLegLoc =[headLoc[0]+12,headLoc[1]+(headLoc[1]/2)+5];
  let headSize = [25,25];
  let torsoSize = [10,45];
  let leftArmSize = [5,40];
  let rightArmSize = leftArmSize;
  let leftLegSize = [5,35];
  let rightLegSize = leftLegSize;
  //limbs
  let armLimbSize = [leftArmSize[0],leftArmSize[1]/2]
  let legLimbSize = [leftLegSize[0],leftLegSize[1]/2]

  //torso
  push();
  translate(torsoLoc[0],torsoLoc[1]);
  ellipse(0,0,torsoSize[0],torsoSize[1]);
  pop();  //head
  push();
  translate(headLoc[0],headLoc[1]);
  ellipse(0,0,headSize[0],headSize[1]);
  pop();
  //left arm
  //1
  push();
  translate(leftArmLoc[0],leftArmLoc[1]);
  ellipse(0,0,armLimbSize[0],armLimbSize[1])
  pop();
  //2
  push();
  translate(leftArmLoc[0],leftArmLoc[1] + armLimbSize[1]-8);
  ellipse(0,0,armLimbSize[0],armLimbSize[1])
  pop();
  //right arm
  //1
  push();
  translate(rightArmLoc[0],rightArmLoc[1]);
  ellipse(0,0,armLimbSize[0],armLimbSize[1]);
  pop();
  //2
  push();
  translate(rightArmLoc[0],rightArmLoc[1]+ armLimbSize[1]-8);
  ellipse(0,0,armLimbSize[0],armLimbSize[1]);
  pop();
  //left leg
  push();
  fill('white')
  translate(leftLegLoc[0],leftLegLoc[1]);
  ellipse(0,0,leftLegSize[0],leftLegSize[1]);
  pop();
  //1
  push();
  translate(leftLegLoc[0],leftLegLoc[1]);
  ellipse(0,0,legLimbSize[0],legLimbSize[1]);
  pop();
  //2
  push();
  translate(leftLegLoc[0],leftLegLoc[1] + legLimbSize[1]);
  ellipse(0,0,legLimbSize[0],legLimbSize[1]);
  pop();

  //right leg
  push();
  fill('white')
  translate(rightLegLoc[0],rightLegLoc[1]);
  ellipse(0,0,rightLegSize[0],rightLegSize[1]);
  pop();
  //1
  push();
  translate(rightLegLoc[0],rightLegLoc[1]);
  ellipse(0,0,legLimbSize[0],legLimbSize[1]);
  pop();
  //2
  push();
  translate(rightLegLoc[0],rightLegLoc[1]+legLimbSize[1]);
  ellipse(0,0,legLimbSize[0],legLimbSize[1]);
  pop();
  pop();
}
function template(){
  let headLoc = [138,100];
  let torsoLoc = [headLoc[0]+7,headLoc[1]+25];
  let leftArmLoc = [headLoc[0]+2,headLoc[1]+25];
  let rightArmLoc = [headLoc[0]+17,headLoc[1]+25];
  let leftLegLoc = [headLoc[0]+7,headLoc[1]+(headLoc[1]/2)+10];
  let rightLegLoc =[headLoc[0]+12,headLoc[1]+(headLoc[1]/2)+10];
  let headSize = [25,25];
  let torsoSize = [10,35];
  let leftArmSize = [5,40];
  let rightArmSize = leftArmSize;
  let leftLegSize = [5,35];
  let rightLegSize = leftLegSize;

  //size template
  push();
  translate(100,100);
  fill('white')
  rect(0,0,100,100);
  pop();
  //head
  push();
  translate(headLoc[0],headLoc[1]);
  fill('purple');
  rect(0,0,headSize[0],headSize[1]);
  pop();
  //torso
  push();
  translate(torsoLoc[0],torsoLoc[1]);
  rect(0,0,torsoSize[0],torsoSize[1]);
  pop();
  //left arm
  push();
  fill('gold')
  translate(leftArmLoc[0],leftArmLoc[1]);
  rect(0,0,leftArmSize[0],leftArmSize[1]);
  pop();
  //right arm
  push();
  fill('gold')
  translate(rightArmLoc[0],rightArmLoc[1]);
  rect(0,0,rightArmSize[0],rightArmSize[1]);
  pop();
  //left leg
  push();
  fill('white')
  translate(leftLegLoc[0],leftLegLoc[1]);
  rect(0,0,leftLegSize[0],leftLegSize[1]);
  pop();
  //right leg
  push();
  fill('white')
  translate(rightLegLoc[0],rightLegLoc[1]);
  rect(0,0,rightLegSize[0],rightLegSize[1]);
  pop();
}
function sky() {
  //sky should be 3/4th the size of screen
  fill('#6daebe');
  rect(0, 0, w,skyY2);
}

function ground() {
  //ground should be 1/4th the size of screen
  fill('#ab7b66');
  rect(0, groundY1, w,groundY2);
}

function clouds() {
  //clouds should be represented by lines 
  //straight lines will follow a circular path  
  //A line will rotate
  //A line will follow a circular path. 
  //A line will finish a single rotation after it has finished a single path.
  //repeat for all other clouds.
  //General: cloudSpeed, cloudRoll, cloudSize
  //Specific: cloudPos, angle, 
  for(let i = 0; i < cloudCount; ++i){
    let positionMap = cloudMap.get(i);
    let cloudPosX = positionMap.get('cloudX');
    let cloudPosY = positionMap.get('cloudY');
    let angle = positionMap.get('angle');
    let sw = positionMap.get('strokeWeight');
    let off = positionMap.get('offset');
    let cloudSpeed = positionMap.get('speed');
    let r = positionMap.get('redRange');
    let g  = positionMap.get('greenRange');
    let b = positionMap.get('blueRange');
    push();
    //strokeWeight changes thickness of lines and stroke change color from black to white
    strokeWeight(sw);
    stroke(500);
    translate(cloudPosX, cloudPosY)
    if(cloudPosX > w + w/6){
      cloudPosX = cloudRespawn(i);
      //cloud is at its endpoint
      //cloudOffset = 0;
    }
    cloudPosX += cloudSpeed;
    rotate(-angle);
    let strengthFill = 255;
    let strengthStroke = 255;
    //noStroke();
    //colorMode(HSB);
    fill(r,g,b);
    rect(cloudRoll[0],cloudRoll[1],cloudSize[0],cloudSize[1]);
    pop();
    angle += 1;
    if(angle > 360){
      //improbable of reaching but want to avoid overflow. 
      angle = 0;
    }
    positionMap.set('cloudX', cloudPosX);
    positionMap.set('angle', angle);
    cloudMap.set(i, positionMap);
  }

}

function cloudRespawn(i){
  let positionMap = cloudMap.get(i);
  let xRange = positionMap.get('xRange');
  let off = positionMap.get('offset');
  let max = 0 - xRange[1];
  let min = 0 - xRange[0];
  let posX = map(noise(off), 0,1,0, min, max)
  return posX;
}
function setClouds(){
  for(let i = 0; i < cloudCount; ++i){
    let positionMap = new Map();
    //create a Cluster
    let min = 1;
    let max = 100;
    positionMap.set('offset', max - Math.floor(Math.random() * (max - min + 1)));
    let off = positionMap.get('offset');
    positionMap.set('maxCluster', 10);
    let clusterSize = positionMap.get('maxCluster');
    positionMap.set('clusterID', Math.floor(random(clusterSize)));   //clusterID represents the specific cluster of clouds this cloud will be with.

    let id = positionMap.get('clusterID');
    let maxClusters = positionMap.get('maxCluster');
    min = id * (w/maxClusters);
    max = (id + 1) * (w/maxClusters);
    let xRange = [min, max];     //xRange represent the x parameters for a cloud spawn
    positionMap.set('xRange', xRange);
    min = 80;
    max = 90;
    let redRange = Math.floor(map(noise(off), 0,1, min, max));
    min = 106;
    max = 130;
    let blueRange = Math.floor(map(noise(off), 0,1, min, max))
    min = 117;
    max = 150;
    let greenRange = Math.floor(map(noise(off), 0,1, min, max))
    console.log(blueRange);
    positionMap.set('speed', (id+1)*.1);
    positionMap.set('color', [redRange, blueRange, greenRange]);

    positionMap.set('angle', 360 - Math.floor(Math.random() * (360 - 0 + 1)));
    min = 0;
    max = w;
    //positionMap.set('cloudX', max - Math.floor(Math.random() * (max - min + 1)));
    positionMap.set('cloudX', map(noise(off), 0,1,0, min, max));
    min = 50;
    max = 200;
    //positionMap.set('cloudY', max - Math.floor(Math.random() * (max - min + 1)));
    positionMap.set('cloudY', map(noise(off), 0,1,0, min, max));
    min = 1
    max = 1000
    positionMap.set('strokeWeight', .5 * map(noise(off), 0,1,0, min, max))
    min = 0;
    max = 10;
    cloudMap.set(i, positionMap);
    //every ID represent a range a cloud line is allowed to be in. 
    //This should create a cluster of lines ressembling a cloud.
  }
}

function rain(){
  //a plethora of tiny lines falling downwards
  //should start at varying heights 
  //repeat begins falling just out of frame, 0 - length of line
  //each path ends at a random point between the top and bottom boundaries of the ground. 
  //each should have the same rainSpeed
  for(let i = 0; i < rainDropCount; ++i){
    updateRainDrop(i);
    let position = rainMap.get(i);
    let x1 = position.get('x1');
    let y1 = position.get('y1');
    let x2 = position.get('x2');
    let y2 = position.get('y2');
    let endpoint = position.get('endpoint');
    if(y2 >= endpoint){
      min = h - groundY2;
      endpoint = h - Math.floor(Math.random() * (h - min + 1));
      x1 = Math.floor(Math.random() * (w - 0 + 1));
      x2 = x1;
      y1 = -20 - sizediff;
      y2 = y1 + sizediff;
      position.set('x1',x1);
      position.set('x2',x2);
      position.set('y1',y1);
      position.set('y2',y2);
      position.set('endpoint',endpoint);
      rainMap.set(i, position);
    }
  }
}

function updateRainDrop(i){
  let position = rainMap.get(i);
  let x1 = position.get('x1');
  let x2 = position.get('x2');
  let y1 = position.get('y1');
  let y2 = position.get('y2');
  line(x1,y1,x2,y2);
  y1 += rainSpeed;
  y2 += rainSpeed;
  position.set('y1', y1);
  position.set('y2', y2);
  rainMap.set(i, position);
}

function setRain(){
  for(let i = 0; i < rainDropCount; ++i){
    let positionMap = new Map();
    positionMap.set('x1', Math.floor(Math.random() * (w - 0 + 1)));
    positionMap.set('x2', positionMap.get('x1'));
    positionMap.set('y1', Math.floor(Math.random() * (-h - 0 + 1)))
    positionMap.set('y2', positionMap.get('y1') + sizediff)
    min = h - groundY2
    positionMap.set('endpoint', h - (Math.floor(Math.random() * (h - min + 1))));
    rainMap.set(i, positionMap);
  }
}

function person(){

}

function setLimbs(){
  let change = 0.5;
  let range = [0,75];
  let shape = [50,180];
  let angle = 0;
  let legPosition = [width/3,height/3]
  push();
  //head has one joint connected to torso

  //torso has 5 joints connected to head, right leg and arm,  left leg and arm.
  //one arm has 2 limbs. the top arm has 2 joints, the forearm has one joint.
  //one leg has 2 limbs. the top leg has 2 joints, the shin has one joint.  
  pop();
}

function jointBend(){
  //each limb has a joint with a specific range of motion. 
}