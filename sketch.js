let w = 450;
let h = 300;
//ground
let groundY1 = h-(h/4);
let groundY2 = h/4;
//sky
let skyY2 = h-(h/4);
const sizediff = 5;
//rain
let rainSpeed = 3;
let rainMap = new Map();
const rainDropCount = 400;
//cloud
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
let cloudCount =250;
let cloudOffset = 0;
//
let allLimbs = new Map();
let limbAngle1 = 0.0;
let limbAngle2 = 0.0;
let range1 = [0,45];
let range2 = [0,45];
let change1 = 0.5;

let speedRotation = 1;
let armRotation = 0;
let scene = 0;
let sceneSetup = [false,false,false,false,false];
let defaultLimbs;

function setup() {
  createCanvas(w, h);
  angleMode(DEGREES);
  setRain();
  setClouds();
  setLimbs();
  //frameRate(5)
}

function draw() {
  background(0,220);
  sky();
  ground();
  rain();
  clouds();
  //template();
  //moveLine();
  //walk
  roughPerson();
}


let segLength = 50;
let currentPoint = 75;
let lineChange = 1;
let x3 = w / 2;
let y3 = h/2; 
let x4 = x3;
let y4 = y3;

function testLimbs(){
  let firstLimb = allLimbs.get('leftArmLoc');
  push();
  strokeWeight(10);
  stroke(255, 204, 0);
  point(firstLimb[0].x, firstLimb[0].y);
  point(firstLimb[1].x, firstLimb[1].y);
  //strokeWeight(20);
  point(firstLimb[2].x, firstLimb[2].y);
  //console.log(firstLimb[2])
  pop();
}

function moveLine(){
  //manipulate left arm to wave back and forth
  //change the coords for the left hand
  //get arm to move up.

  
  //dragSegment(0, mouseX, mouseY);
//  for (let i = 0; i < x.length - 1; i++) {
//    dragSegment(i + 1, x[i], y[i]);
//  }
  
  currentPoint += lineChange;
  if(currentPoint > 100 || currentPoint < 50){
    lineChange = -lineChange
  }
  //let rotation = allLimbs.get('leftArmRotation');
  //rotation += change1;
  //allLimbs.set('leftArmRotation', rotation);
}

function dragSegment(i, xin, yin){
  
  dx = xin - x3;
  dy = yin - y3;
  let angle1 = atan2(dy, dx);

  tx = xin - cos(angle1) * segLength;
  ty = yin - sin(angle1) * segLength;
  dx = tx - x4;
  dy = ty - y4;
  let angle2 = atan2(dy, dx);
  x3 = x4 + cos(angle2) * segLength;
  y3 = y4 + sin(angle2) * segLength;

  segment(x3, y3, angle1);
  segment(x4, y4, angle2);
  /*
  console.log('x3: ' + x3);
  console.log('y3: ' + y3);
  console.log('angle1: ' + angle1);
  console.log('x4: ' + x4);
  console.log('y4: ' + y4);
  console.log('angle2: ' + angle2);
  */
 }

function segment(x,y,a){
  push();
  translate(x,y);
  rotate(a);
  line(0,0,segLength,segLength);
  pop();
}

function makeArms(){
  //apply a general arm rotation to both arms. Recenter the axis point at leftLoc point
  push();
  strokeWeight(5);
  stroke(255, 255);
  let leftLoc = allLimbs.get('leftArmLoc');
  let rightLoc = allLimbs.get('rightArmLoc');
  let leftSize = allLimbs.get('leftArmSize');
  let rightSize = allLimbs.get('rightArmSize');
  let leftRotation = allLimbs.get('leftArmRotation');
  let rightRotation = allLimbs.get('rightArmRotation');
  makeArm(leftLoc, leftSize, leftRotation);
  makeArm(rightLoc, rightSize, rightRotation);
  //dragSegment(leftLoc[0], leftLoc[1], leftRotation[0]);
  //console.log('leftLoc1: ' + leftLoc[0]);
  //console.log('rightLoc2: ' + leftLoc[1]);
  //console.log('leftrotation: ' + leftRotation)
  
  pop();
}

function makeLegs(){
  push();
  strokeWeight(5.0);
  stroke(255, 255);
  let leftLoc = allLimbs.get('leftLegLoc');
  let rightLoc = allLimbs.get('rightLegLoc');
  let leftSize = allLimbs.get('leftLegSize');
  let rightSize = allLimbs.get('rightLegSize');  
  let leftRotation = allLimbs.get('leftLegRotation');
  let rightRotation = allLimbs.get('rightLegRotation');
  makeLeg(leftLoc, leftSize, leftRotation);
  makeLeg(rightLoc, rightSize, rightRotation);
  pop();
}

function makeArm(armLocation, limbSize, rotation, adjustSize = 2){
  //console.log('arm location : ' + armLocation[1].x);
  //console.log('arm rotation : ' + limbSize[1] * cos(rotation[0]));
  //let sum = armLocation[1].x + limbSize[1] * cos(rotation[0]);
  //console.log('arm sum: ' + sum)
  //armLocation[1].x *= cos(rotation[0]);
  //armLocation[1].y = (limbSize[1]/2) * sin(rotation[0]);
  //armLocation[2].x = (limbSize[1]/2) * cos(rotation[1]);
  //armLocation[2].y = (limbSize[1]/2) * sin(rotation[1]);
  //apply cosine rule. 
  //first limb uses rotation[0]
  if(rotation[0] != 0){
    let s1 = Math.pow(limbSize[1],2) + Math.pow(limbSize[1],2);
    let s2 = 2*limbSize[1]*limbSize[1];
    let s3 =  cos(rotation[0]);
    let s4 = s1 - (s2*s3);
    let distanceBetween0_1 = Math.sqrt(s4);
    armLocation[1].x = armLocation[0].x + Math.abs(distanceBetween0_1)*cos(rotation[0]);
    armLocation[1].y = armLocation[0].y + Math.abs(distanceBetween0_1)*sin(rotation[0]);
  }
  //second limb uses rotation[1]
  if(rotation[1] != 0){
    s1 = Math.pow(limbSize[1],2) + Math.pow(limbSize[1],2);
    s2 = 2*limbSize[1]*limbSize[1];
    s3 =  cos(rotation[1]);
    s4 = s1 - (s2*s3);
    distanceBetween1_2 = Math.sqrt(s4);
    armLocation[2].x = armLocation[1].x + Math.abs(distanceBetween1_2)*cos(rotation[1]);
    armLocation[2].y = armLocation[1].y + Math.abs(distanceBetween1_2)*sin(rotation[1]);
  }
  push();
  line(armLocation[0].x,armLocation[0].y,armLocation[1].x,armLocation[1].y);
  pop();
  push();
  line(armLocation[1].x, armLocation[1].y, armLocation[2].x,armLocation[2].y);
  pop();
}
/*
function makeArm(armLocation, limbSize, rotation, adjustSize = 2){
    //adjustSize: should not be 0, and the smaller you want the limb, the bigger the number
    //if 1 rotates, the starting positions to the 2 limb needs to change. 
    //1
    let p1 = createVector(0,0);
    push();
    translate(armLocation[0],armLocation[1]);
    rotate(rotation[0]);
    line(0,0,limbSize[0],limbSize[1]/adjustSize)
    pop();
    //2
    push();
    translate(armLocation[0],armLocation[1] + limbSize[1]/adjustSize);
    rotate(rotation[1]);
    ellipse(0,0,limbSize[0],limbSize[1])
    pop();
}
*/

function makeLeg(legLocation, limbSize, rotation){
  //legLocation[1].x = limbSize[1] * cos(rotation[0]);
  //legLocation[1].y = limbSize[1] * sin(rotation[0]);
  //legLocation[2].x = limbSize[1] * cos(rotation[1]);
  //legLocation[2].y = limbSize[1] * sin(rotation[1]);
  //1
  push();
  line(legLocation[0].x,legLocation[0].y,legLocation[1].x,legLocation[1].y);
  pop();
  //2
  push();
  line(legLocation[1].x,legLocation[1].y,legLocation[2].x,legLocation[2].x);
  pop();
}
/*
function makeLeg(legLocation, limbSize, rotation){
    //1
    push();
    translate(legLocation[0],legLocation[1]);
    rotate(rotation[0]);
    line(0,0,limbSize[0],limbSize[1]);
    pop();
    //2
    push();
    translate(legLocation[0],legLocation[1] + limbSize[1]);
    rotate(rotation[1]);
    line(0,0,limbSize[0],limbSize[1]);
    pop();
}
*/

function makeHead(){
  let loc = allLimbs.get('headLoc');
  let size = allLimbs.get('headSize');
  push();
  translate(loc.x,loc.y);
  ellipse(0,0,size[0],size[1]);
  pop();
}

function makeTorso(){
  let loc = allLimbs.get('torsoLoc');
  let size = allLimbs.get('torsoSize');
  push();
  translate(loc[0].x,loc[0].y);
  ellipse(0,0,size[0],size[1]);
  pop();
}

function roughPerson(){
  //roation value should always update in the rough person method. 

  //the person will be moving according to the speed of a song. So different set of movements for 
  //different parts of the song. 
  /*  The song should be about 78 bpm   */
  //for debugging, utilize a onPress method with the spacebar to cycle through the movements. 
  //There is a 1st walk, 2nd walk, pause looking up, pause looking down, free fall, etc.
  //using the scene variable to go through various scenes, increment scene each time a 
  //  button is pressed. if scene > 5 reset to 0. all scenes will move except for 0, freezing at last movement of scene 5.


  jointBend()

  
  

  //jointBend();
  //drawBody();
 }

function mousePressed(){
  //used to cycle through the scenes of the person. 
  scene += 1;
  if (scene > 1){
    resetLimbs();
    scene = 0;
  }
}

function resetLimbs(){
  headLoc = defaultLimbs.get('headLoc');
  torsoLoc = defaultLimbs.get('torsoLoc')
  leftArmLoc = defaultLimbs.get('leftArmLoc')
  rightArmLoc = defaultLimbs.get('rightArmLoc')
  leftLegLoc = defaultLimbs.get('leftLegLoc')
  rightLegLoc = defaultLimbs.get('rightLegLoc')
  headSize = defaultLimbs.get('headSize')
  torsoSize = defaultLimbs.get('torsoSize')
  leftArmSize = defaultLimbs.get('leftArmSize')
  rightArmSize = defaultLimbs.get('rightArmSize')
  leftLegSize = defaultLimbs.get('leftLegSize')
  rightLegSize = defaultLimbs.get('rightLegSize')
  leftArmRotation = defaultLimbs.get('leftArmRotation')
  rightArmRotation = defaultLimbs.get('rightArmRotation')
  leftLegRotation = defaultLimbs.get('leftLegRotation')
  rightLegRotation = defaultLimbs.get('rightLegRotation')
  headRotation = defaultLimbs.get('headRotation')
  torsoRotation = defaultLimbs.get('torsoRotation')
  

  allLimbs.set('headLoc', headLoc);
  allLimbs.set('torsoLoc', torsoLoc);
  allLimbs.set('leftArmLoc',leftArmLoc);
  allLimbs.set('rightArmLoc', rightArmLoc);
  allLimbs.set('leftLegLoc', leftLegLoc);
  allLimbs.set('rightLegLoc', rightLegLoc);
  allLimbs.set('headSize', headSize);
  allLimbs.set('torsoSize',torsoSize);
  allLimbs.set('leftArmSize', leftArmSize);
  allLimbs.set('rightArmSize',rightArmSize);
  allLimbs.set('leftLegSize', leftLegSize);
  allLimbs.set('rightLegSize', rightLegSize);
  allLimbs.set('leftArmRotation',leftArmRotation);
  allLimbs.set('rightArmRotation',rightArmRotation);
  allLimbs.set('leftLegRotation',leftLegRotation);
  allLimbs.set('rightLegRotation',rightLegRotation);
  allLimbs.set('headRotation',headRotation);
  allLimbs.set('torsoRotation',torsoRotation);

  armRotation = 0;
}
function drawBody(){
  makeTorso(); 
  makeHead();
  makeLegs();
  makeArms();
  testLimbs();
}
/*
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
*/
function sky() {
  //sky should be 3/4th the size of screen
  push();
  fill('#6daebe');
  rect(0, 0, w,skyY2);
  pop();
}

function ground() {
  //ground should be 1/4th the size of screen
  push();
  fill('#ab7b66');
  rect(0, groundY1, w,groundY2);
  pop();
}

function clouds() {
  push();
  fill('gray');
  //clouds should be represented by lines 
  //straight lines will follow a circular path  
  //A line will rotate
  //A line will follow a circular path. 
  //A line will finish a single rotation after it has finished a single path.
  //repeat for all other clouds.
  //General: cloudSpeed, cloudRoll, cloudSize
  //Specific: cloudPos, angle, 
  let history = [];
  for(let i = 0; i < cloudCount; ++i){
    let positionMap = cloudMap.get(i);
    let x = positionMap.get('cloudX');
    let y = positionMap.get('cloudY');
    let angle = positionMap.get('angle');
    let sw = positionMap.get('strokeWeight');
    let off = positionMap.get('offset');
    let cloudSpeed = positionMap.get('speed');
    let r = positionMap.get('redRange');
    let g  = positionMap.get('greenRange');
    let b = positionMap.get('blueRange');
    let v = createVector(x,y);
    history.push(v);
    let maxCopies = 5;
    if(history.length > maxCopies){
      history.splice(0,1);
    }
    push();
    //strokeWeight changes thickness of lines and stroke change color from black to white
    fill('gray');
    strokeWeight(sw);
    stroke(500);
    translate(x, y)
    if(x > w + w/6){
      x = cloudRespawn(i);
      //cloud is at its endpoint
      //cloudOffset = 0;
    }
    x += cloudSpeed;
    rotate(-angle);
    let strengthFill = 255;
    let strengthStroke = 255;
    //noStroke();
    //colorMode(HSB);
    fill(r,g,b);
    rect(cloudRoll[0],cloudRoll[1],cloudSize[0],cloudSize[1]);
    //add trail to the clouds
    for(let i = 0; i < history.length; ++i){
      rect(cloudRoll[0]-i*5,cloudRoll[1]-i*1,cloudSize[0],cloudSize[1]);
    }
    pop();
    angle += 1;
    if(angle > 360){
      //improbable of reaching but want to avoid overflow. 
      angle = 0;
    }
    positionMap.set('cloudX', x);
    positionMap.set('angle', angle);
    cloudMap.set(i, positionMap);
  }
  pop();
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


/*
function setLimbs(){
  let change = 0.5;
  let range = [0,75];
  let shape = [50,180];
  let angle = 0;
  let legPosition = [w/3,h/3]
  push();
  //head has one joint connected to torso

  //torso has 5 joints connected to head, right leg and arm,  left leg and arm.
  //one arm has 2 limbs. the top arm has 2 joints, the forearm has one joint.
  //one leg has 2 limbs. the top leg has 2 joints, the shin has one joint.  
  let headLoc = [138,100];
  allLimbs.set('headLoc', headLoc);
  allLimbs.set('torsoLoc', [headLoc[0]+7,headLoc[1]+20]);
  allLimbs.set('leftArmLoc',[headLoc[0]+7,headLoc[1]+27]);
  allLimbs.set('rightArmLoc', [headLoc[0]+17,headLoc[1]+27]);
  allLimbs.set('leftLegLoc', [headLoc[0]+9,headLoc[1]+(headLoc[1]/2)+5]);
  allLimbs.set('rightLegLoc', [headLoc[0]+15,headLoc[1]+(headLoc[1]/2)+5]);
  allLimbs.set('headSize', [25,25]);
  allLimbs.set('torsoSize',[10,45]);
  allLimbs.set('leftArmSize', [0,20]);
  allLimbs.set('rightArmSize',[0,20]);
  allLimbs.set('leftLegSize', [0,20]);
  allLimbs.set('rightLegSize', [0,20]);
  allLimbs.set('legLimbSize',[0,20/2]);
  allLimbs.set('leftArmRotation',[0,0]);
  allLimbs.set('rightArmRotation',[0,0]);
  allLimbs.set('leftLegRotation',[0,0]);
  allLimbs.set('rightLegRotation',[0,0]);
  allLimbs.set('headRotation',0);
  allLimbs.set('torsoRotation',0);
  defaultLimbs = allLimbs;
  pop();
}
*/
function setLimbs(){
  push();
  //head has one joint connected to torso
  //torso has 5 joints connected to head, right leg and arm,  left leg and arm.
  //one arm has 2 limbs. the top arm has 2 joints, the forearm has one joint.
  //one leg has 2 limbs. the top leg has 2 joints, the shin has one joint.  
  let headLoc = createVector(138,100);
  let armSize = 25;
  let legSize = 50;
  let armOffsetY = 28;
  let legOffsetY = (headLoc.y/2)+10;

  allLimbs.set('headLoc', headLoc);
  allLimbs.set('torsoLoc', [createVector(headLoc.x+7,headLoc.y+20), createVector(headLoc.x+7,headLoc.y+20+45)]);
  allLimbs.set('leftArmLoc',[createVector(headLoc.x+7,headLoc.y+armOffsetY), createVector(headLoc.x+7,headLoc.y+armOffsetY+armSize/2),createVector(headLoc.x+7,headLoc.y+armOffsetY+armSize) ]);
  allLimbs.set('rightArmLoc',[ createVector(headLoc.x+17,headLoc.y+armOffsetY), createVector(headLoc.x+17,headLoc.y+armOffsetY+armSize/2), createVector(headLoc.x+17,headLoc.y+armOffsetY+armSize)]);
  allLimbs.set('leftLegLoc', [createVector(headLoc.x+9,headLoc.y+legOffsetY), createVector(headLoc.x+9,headLoc.y+legOffsetY+legSize/2),createVector(headLoc.x+9,headLoc.y+legOffsetY+legSize)]);
  allLimbs.set('rightLegLoc', [createVector(headLoc.x+15,headLoc.y+legOffsetY),createVector(headLoc.x+15,headLoc.y+legOffsetY+legSize/2),createVector(headLoc.x+15,headLoc.y+legOffsetY+legSize)]);
  allLimbs.set('headSize', [25,25]);
  allLimbs.set('torsoSize',[10,45]);
  allLimbs.set('leftArmSize', [0,armSize]);
  allLimbs.set('rightArmSize',[0,armSize]);
  allLimbs.set('leftLegSize', [0,legSize]);
  allLimbs.set('rightLegSize', [0,legSize]);
  allLimbs.set('leftArmRotation',[0,0]);
  allLimbs.set('rightArmRotation',[0,0]);
  allLimbs.set('leftLegRotation',[0,0]);
  allLimbs.set('rightLegRotation',[0,0]);
  allLimbs.set('headRotation',0);
  allLimbs.set('torsoRotation',0);
  defaultLimbs = allLimbs;
  pop();
}

function jointBend(){
  push();
  noStroke();
  ellipseMode(CORNER);
  fill('white');
  //each limb has a joint with a specific range of motion. 
  //when switching 
  let leftArmRotation = allLimbs.get('leftArmRotation');
  let rightArmRotation = allLimbs.get('rightArmRotation'); 
  let leftLegRotation = allLimbs.get('leftLegRotation');
  let rightLegRotation = allLimbs.get('rightLegRotation');
  //let previousLimbs = [leftArmRotation,rightArmRotation,leftLegRotation,rightLegRotation];
  //arms
  if (scene === 1){
    //change the rotations for the legs
    //starting position. walk.
    leftLegRotation = [0,0];
    rightLegRotation = [0,0];
    allLimbs.set('leftLegRotation', leftLegRotation);                                                                                                                                                                      
    allLimbs.set('rightLegRotation', rightLegRotation);
    rightArmRotation = [0,0];
    leftArmRotation = [100,100];
    allLimbs.set('leftArmRotation', leftArmRotation);                                                                                                                                                                      
    allLimbs.set('rightArmRotation', rightArmRotation);
    //end
  }
  else{
    //get back to the original by referencing the previous rotation.
    leftArmRotation = allLimbs.get('leftArmRotation');
    rightArmRotation = allLimbs.get('rightArmRotation'); 
    leftLegRotation = allLimbs.get('leftLegRotation');
    rightLegRotation = allLimbs.get('rightLegRotation');

    leftLegRotation = [0,0];
    rightLegRotation = [0,0];
    leftArmRotation = [0,0];
    rightArmRotation = [0,0];
    allLimbs.set('leftLegRotation', leftLegRotation);
    allLimbs.set('rightLegRotation', rightLegRotation);
    allLimbs.set('leftArmRotation', leftArmRotation);
    allLimbs.set('rightArmRotation', rightArmRotation);
    
  }
  /*
  if (armRotation > 50 || armRotation < -50){
    speedRotation *= -1;
  }
  armRotation += speedRotation;
*/

  drawBody();
  pop();
}