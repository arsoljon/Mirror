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
  //roughPerson();
  playScenes();
}

function playScenes(){
  sceneNumber = 0;
  if (sceneNumber == 0){
    //noStroke();
    //fill('white');
    sceneOne();
  }
  drawBody();
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
  strokeWeight(7);
  stroke(255, 204, 0);
  point(firstLimb[0].x, firstLimb[0].y);
  point(firstLimb[1].x, firstLimb[1].y);
  //strokeWeight(20);
  point(firstLimb[2].x, firstLimb[2].y);
  //console.log(firstLimb[2])
  pop();
}

function sceneOne(head_goal, leg_goal, arm_goal, angle1, angle2){
  push();
  //hands in pocket
  //This function should set the position of all body parts. 
  // *^head(-,-) x-coord should be slightly right. y-coord should be slightly down.
  // torso(-,-) as of now the torso will remain upright.
  // *^leftarm(90,90) 
  // *^rightarm(-,-) should align with torso to hide.
  // *~leftLeg and rightleg will mimic walking. 
  // * limbs that will be altered.
  // ^ limbs that will lock into only one location
  // ~ limbs that will continue moving 
  // keep nextScene boolean variable to trigger the next scene.
  let nextScene = false;
  let torsoLoc = allLimbs.get("torsoLoc");
  let leftLegLoc = allLimbs.get("leftLegLoc");
  let rightLegLoc = allLimbs.get("rightLegLoc");
  let leftLegFreeze = allLimbs.get("leftLegFreeze");
  let rightLegFreeze = allLimbs.get("rightLegFreeze");
  
  //Alter Head
  let headLoc = allLimbs.get("headLoc");
  let headFreeze = allLimbs.get("headFreeze");
  let maxHeadOffset = [-15,-15];
  let headGoal = [torsoLoc[0].x + maxHeadOffset[0], torsoLoc[0].y + maxHeadOffset[1]];
  if(headFreeze == false){
    let speed = 0.1;
    headLoc.x += speed;
    headLoc.y += speed;
  }
  if(headLoc.x >= headGoal[0] && headLoc.y >= headGoal[1]){
    headFreeze = true;
  }
  //Alter Arms
  let leftArmLoc = allLimbs.get("leftArmLoc");
  let rightArmLoc = allLimbs.get("rightArmLoc");
  let leftArmSize = allLimbs.get('leftArmSize');
  let rightArmSize = allLimbs.get('rightArmSize');
  let leftArmRotation = allLimbs.get('leftArmRotation');
  let rightArmRotation = allLimbs.get('rightArmRotation');
  let leftLegRotation = allLimbs.get('leftLegRotation');
  let rightLegRotation = allLimbs.get('rightLegRotation');
  let leftArmFreeze = allLimbs.get("leftArmFreeze");
  let rightArmFreeze = allLimbs.get("rightArmFreeze");
  let movingForward = allLimbs.get("movingForward");
  //right
  let rightArmOffset = 5;
  let rightArmGoal = torsoLoc[0].x+rightArmOffset; //torsoLoc only has one (x,y).
  if(rightArmLoc[0].x > rightArmGoal && rightArmFreeze == false){
    let speed = 0.1;
    rightArmLoc[0].x -= speed;
    rightArmLoc[1].x -= speed;
    rightArmLoc[2].x -= speed;
  }
  if(rightArmLoc[0].x <= rightArmGoal){
    rightArmFreeze = true;
  }
  //left
  let leftArmGoal = [120,60];
  if(leftArmRotation[0] < leftArmGoal[0] ){
    let speed = 1;
    leftArmRotation[0] += speed;
  }
  if(leftArmRotation[1] > leftArmGoal[1]){
    let speed = -1;
    leftArmRotation[1] += speed;
  }

  //Alter Legs 
  let legOffset = 20; 
  let maxLegMovement = [135-legOffset,45+legOffset];
  let legSpeed = [0.7,0.5];
  //right
  //forward - lead with top limb.
  
  if(movingForward == true){
    if(rightLegRotation[0] > maxLegMovement[1]){
      rightLegRotation[0] -= legSpeed[0];
    }
    if(rightLegRotation[1] > maxLegMovement[1]){
      rightLegRotation[1] -= legSpeed[1];
    }
    if(leftLegRotation[0] < maxLegMovement[0]){
      leftLegRotation[0] += legSpeed[1];
    }
    if(leftLegRotation[1] < maxLegMovement[0]){
      leftLegRotation[1] += legSpeed[0];
    }
    if(rightLegRotation[1] <= maxLegMovement[1]+legOffset/4){
      movingForward = !movingForward;
    }
  }
  else{
    if(rightLegRotation[0] < maxLegMovement[0]){
      rightLegRotation[0] += legSpeed[1];
    }
    if(rightLegRotation[1] < maxLegMovement[0]){
      rightLegRotation[1] += legSpeed[0];
    }
    if(leftLegRotation[0] > maxLegMovement[1]){
      leftLegRotation[0] -= legSpeed[0];
    }
    if(leftLegRotation[1] > maxLegMovement[1]){
      leftLegRotation[1] -= legSpeed[1];
    }
    if(leftLegRotation[1] <= maxLegMovement[1]){
      movingForward = !movingForward;
    }
  }
  


  let goal_angle1 = 90;
  let goal_angle2 = 90;
  let speed1 = 0;
  let speed2 = 0;
  let change1 = 0.8;
  let change2 = 0.9;
  if(angle1 >= goal_angle1){
    speed1 = -change1;
  }
  else if(angle1 <= goal_angle1){
    speed1 = change1;    
  }
  if(angle2 >= goal_angle2){
    speed2 = -change2;
  }
  else if(angle2 <= goal_angle2){
    speed2 = change2;
  }
  if(angle1 <= (goal_angle1 + change1) && angle1 >= (goal_angle1 - change1)){
    angle1 = goal_angle1; 
    speed1 = 0;
  }
  if(angle2 <= (goal_angle2 + change2) && angle2 >= (goal_angle2 - change2)){
    angle2 = goal_angle2;
    speed2 = 0;
   }
  angle1 += speed1;
  angle2 += speed2;

  allLimbs.set("headLoc", headLoc);
  allLimbs.set("leftLegLoc",leftLegLoc);
  allLimbs.set("rightLegLoc", rightLegLoc);
  allLimbs.set("leftArmLoc", leftArmLoc);
  allLimbs.set("rightArmLoc", rightArmLoc);
  allLimbs.set("leftArmRotation", leftArmRotation);
  allLimbs.set("leftLegRotation", leftLegRotation);
  allLimbs.set("rightLegRotation", rightLegRotation);
  allLimbs.set("headFreeze", headFreeze);
  allLimbs.set("leftLegFreeze", leftLegFreeze);
  allLimbs.set("rightLegFreeze", rightLegFreeze);
  allLimbs.set("rightArmFreeze", rightArmFreeze);
  allLimbs.set("leftArmFreeze", leftArmFreeze);
  allLimbs.set("movingForward", movingForward);
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
  //makeArm(leftLoc, leftSize, leftRotation);
  //makeArm(rightLoc, rightSize, rightRotation);


  makeArm2(leftLoc, leftSize[1], leftRotation);
  makeArm2(rightLoc, rightSize[1], rightRotation);

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
  //makeLeg(leftLoc, leftSize, leftRotation);
  //makeLeg(rightLoc, rightSize, rightRotation);
  makeLeg2(leftLoc, leftSize[1], leftRotation);
  makeLeg2(rightLoc, rightSize[1], rightRotation);
  pop();
}


/* Method to have 2 lines rotate independently around connected joints. 

xStationary = 100;
yStationary = 100;
angle1 = 120;
angle2 = 60;
newXStationary = xStationary;
newYStationary = yStationary;
limbSize = 30;
dotSpeed = 0.01;
speed1 = 0.01;
speed2 = 0.7;
sceneNumber = 0;
sec = -1;
armSize = 25;
armLoc = [[xStationary,yStationary],[xStationary,yStationary+ armSize/2],[xStationary,yStationary + armSize]];
armRot = [90,90]

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)
  sec = second();
}

function draw() {
  background(220);
  makeArm(armLoc, armSize, armRot);
  if(Math.abs(second() - sec) >= 5){
    //scenes will change every 5 seconds;
    sec = second();
    //sceneNumber++;
    sceneMax = 2;
    if(sceneNumber > sceneMax){
      sceneNumber = 0;
    }
  }
  sceneMax = 2;
  if(sceneNumber > sceneMax){
      sceneNumber = 0;
  }
  if(sceneNumber == 0){
    sceneOne();
    //sceneFour();
  }
  else if(sceneNumber == 1){
    sceneTwo();
    //sceneOne();
  }
  else if(sceneNumber == 2){
    sceneThree();
  }
  xStationary += dotSpeed;
  yStationary += dotSpeed;
  cosX = cos(angle1);
  sinY = sin(angle1);
  //xStationary += 1;
  endPoint1 = [cosX*limbSize,sinY*limbSize]
  
  push();
  translate(xStationary, yStationary);
  line(0,0,endPoint1[0],endPoint1[1])
  pop();
  
  push();
  strokeWeight(4)
  point(xStationary,yStationary);
  pop();
  push();
  strokeWeight(10);
  translate(xStationary,yStationary);
  point(endPoint1[0],endPoint1[1]);
  pop();
  
  newXStationary += speed2;
  newYStationary += speed2;
  cosX = cos(angle2);
  sinY = sin(angle2);
  newX = xStationary + endPoint1[0];
  newY = yStationary + endPoint1[1];
  endPoint2 = [cosX*limbSize, sinY*limbSize];
  
  push();
  translate(newX, newY);
  line(0,0,endPoint2[0],endPoint2[1])
  pop();
  
  message = "sceneNumber : " + sceneNumber;
  message2 = "seconds: " + sec;
  text(message, 300,100);
  text(message2, 300,110);
}

function sceneOne(){
  goal_angle1 = 90;
  goal_angle2 = 90;
  speed1 = 0;
  speed2 = 0;
  change1 = 0.8;
  change2 = 0.9;
  found1 = false;
  found2 = false;
  if(angle1 >= goal_angle1){
    speed1 = -change1;
  }
  else if(angle1 <= goal_angle1){
    speed1 = change1;    
  }
  if(angle2 >= goal_angle2){
    speed2 = -change2;
  }
  else if(angle2 <= goal_angle2){
    speed2 = change2;
  }
  if(angle1 <= (goal_angle1 + change1) && angle1 >= (goal_angle1 - change1)){
    angle1 = goal_angle1; 
    speed1 = 0;
    found1 = true;
  }
  if(angle2 <= (goal_angle2 + change2) && angle2 >= (goal_angle2 - change2)){
    angle2 = goal_angle2;
    speed2 = 0;
    found2 = true;
   }
  if(found1 == true && found2 == true)   {
    sceneNumber++;  
  }
  angle1 += speed1;
  angle2 += speed2;
}
function sceneTwo(){
  goal_angle1 = 120;
  goal_angle2 = 60;
  speed1 = 0;
  speed2 = 0;
  found1 = false;
  found2 = false;  
  if(angle1 <= goal_angle1){
    speed1 = 0.7;
  }
  if(angle2 >= goal_angle2){
    speed2 = -0.5
  }
  if(angle1 >= goal_angle1){
    angle1 = goal_angle1; 
    speed1 = 0;
    found1 = true;
  }
  if(angle2 <= goal_angle2){
    angle2 = goal_angle2;
    speed2 = 0;
    found2 = true;
   }
  if(found1 == true && found2 == true)   {
    sceneNumber++;  
  }
  angle1 += speed1;
  angle2 += speed2;
  message = "angle1 : " + angle1;
  message2 = "goal angle1 : " + goal_angle1;
  message3 = "angle2 : " + angle2;
  message4 = "goal_angle2 : " + goal_angle2;
  text(message,100,300)
  text(message2,100,310)
  text(message3,100,320)
  text(message4,100,330)
  
}
function sceneThree(){  
  goal_angle1 = 180;
  goal_angle2 = 180;
  speed1 = 0;
  speed2 = 0;
  found1 = false;
  found2 = false;  

  if(angle1 <= goal_angle1){
    speed1 = 0.8;
  }
  if(angle2 <= goal_angle2){
    speed2 = 0.7
  }
  if(angle1 >= goal_angle1){
    angle1 = goal_angle1; 
    speed1 = 0;
    found1 = true;
  }
  if(angle2 >= goal_angle2){
    angle2 = goal_angle2;
    speed2 = 0;
    found2 = true;
   }
  if(found1 == true && found2 == true)   {
    sceneNumber++;  
  }
  angle1 += speed1;
  angle2 += speed2;
}
function sceneFour(){
  angle1 = 0;
  angle2 = 0;
}



function makeArm(armLocation, limbSize, rotation, adjustSize = 2){

  cosX = cos(rotation[0])/limbSize;
  sinY = sin(rotation[0])/limbSize;
  //xStationary += 1;
  endPoint1 = [cosX*limbSize,sinY*limbSize]
  
  push();
  translate(armLocation[0][0], armLocation[0][1]);
  line(0,0,endPoint1[0],endPoint1[1])
  pop();
  
  cosX = cos(rotation[1]);
  sinY = sin(rotation[1]);
  newX = armLocation[0][0] + endPoint1[0];
  newY = armLocation[0][1] + endPoint1[1];
  endPoint2 = [cosX*limbSize, sinY*limbSize];
  
  push();
  translate(newX, newY);
  line(0,0,endPoint2[0],endPoint2[1])
  pop();
  
  /*
  push();
  line(armLocation[0][0],armLocation[0][1],armLocation[1][0],armLocation[1][1]);
  pop();
  push();
  line(armLocation[1][0], armLocation[1][1], armLocation[2][0],armLocation[2][1]);
  pop();
 
  //placements for the joints
  push();
  strokeWeight(5);
  point(armLocation[0][0],armLocation[0][1])
  strokeWeight(3);
  point(armLocation[1][0],armLocation[1][1])
  point(armLocation[2][0],armLocation[2][1])
  pop()
}
*/
function makeArm(armLocation, limbSize, rotation, adjustSize = 2){

  push();
  line(armLocation[0].x,armLocation[0].y,armLocation[1].x,armLocation[1].y);
  pop();
  push();
  line(armLocation[1].x, armLocation[1].y, armLocation[2].x,armLocation[2].y);
  pop();
}

function makeArm2(armLocation, limbSize, rotation, adjustSize = .5){
  let cosX = cos(rotation[0]);
  let sinY = sin(rotation[0]);
  //xStationary += 1;
  endPoint1 = [cosX*limbSize,sinY*limbSize]
  
  push();
  translate(armLocation[0].x, armLocation[0].y);
  line(0,0,endPoint1[0]*adjustSize,endPoint1[1]*adjustSize)
  pop();
  
  cosX = cos(rotation[1]);
  sinY = sin(rotation[1]);
  newX = armLocation[0].x + endPoint1[0]*adjustSize;
  newY = armLocation[0].y + endPoint1[1]*adjustSize;
  endPoint2 = [cosX*limbSize, sinY*limbSize];
  
  push();
  translate(newX, newY);
  line(0,0,endPoint2[0]*adjustSize,endPoint2[1]*adjustSize)
  pop();
}


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

function makeLeg2(legLocation, limbSize, rotation, adjustSize = .3){
  let cosX = cos(rotation[0]);
  let sinY = sin(rotation[0]);
  //xStationary += 1;
  endPoint1 = [cosX*limbSize,sinY*limbSize]
  
  push();
  translate(legLocation[0].x, legLocation[0].y);
  line(0,0,endPoint1[0]*adjustSize,endPoint1[1]*adjustSize)
  pop();
  
  cosX = cos(rotation[1]);
  sinY = sin(rotation[1]);
  newX = legLocation[0].x + endPoint1[0]*adjustSize;
  newY = legLocation[0].y + endPoint1[1]*adjustSize;
  endPoint2 = [cosX*limbSize, sinY*limbSize];
  
  push();
  translate(newX, newY);
  line(0,0,endPoint2[0]*adjustSize,endPoint2[1]*adjustSize)
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
  strokeWeight(0);
  stroke(255, 255);
  let loc = allLimbs.get('headLoc');
  let size = allLimbs.get('headSize');
  push();
  translate(loc.x,loc.y);
  ellipse(0,0,size[0],size[1]);
  pop();
}

function makeTorso(){
  strokeWeight(0);
  stroke(255, 255);
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
  ellipseMode(CORNER);
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
  allLimbs.set('leftArmRotation',[90,90]);
  allLimbs.set('rightArmRotation',[90,90]);
  allLimbs.set('leftLegRotation',[90,90]);
  allLimbs.set('rightLegRotation',[90,90]);
  allLimbs.set('headRotation',0);
  allLimbs.set('torsoRotation',0);
  allLimbs.set('headFreeze', false);
  allLimbs.set('torsoFreeze', false);
  allLimbs.set('leftArmFreeze', false);
  allLimbs.set('rightArmFreeze', false);
  allLimbs.set('leftLegFreeze', false);
  allLimbs.set('rightLegFreeze', false);
  allLimbs.set('movingForward', false);
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
    rightArmRotation = [20,20];
    leftArmRotation = [30,30];
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
    leftArmRotation = [90,90];
    rightArmRotation = [90,90];
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