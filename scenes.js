
export default class Scenes
{
  constructor(p5,person, ground){
    this.scene = 0;
    this.allLimbs = person;
    this.ground = ground;
    console.log(this.ground);
  }
  playScenes(p5){
    this.sceneNumber = 0;
    if (this.sceneNumber == 0){
      //noStroke();
      //fill('white');
      this.sceneOne(p5);
    }
    //drawBody();
  }
  sceneOne(p5,head_goal, leg_goal, arm_goal, angle1, angle2){
    p5.push();
    let start = this.allLimbs.get('startingPoint');
    let y = this.ground[0].y;
    let x = start.x;
    let speed = 0.2;
    x += speed;
    let height = this.ground[1].y;
    let startingPoint = p5.createVector(x, y-(height*.7));

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
    let torsoLoc = this.allLimbs.get("torsoLoc");
    let leftLegLoc = this.allLimbs.get("leftLegLoc");
    let rightLegLoc = this.allLimbs.get("rightLegLoc");
    let leftLegFreeze = this.allLimbs.get("leftLegFreeze");
    let rightLegFreeze = this.allLimbs.get("rightLegFreeze");
    
    //Alter Head
    let headLoc = this.allLimbs.get("headLoc");
    let headFreeze = this.allLimbs.get("headFreeze");
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
    let leftArmLoc = this.allLimbs.get("leftArmLoc");
    let rightArmLoc = this.allLimbs.get("rightArmLoc");
    let leftArmSize = this.allLimbs.get('leftArmSize');
    let rightArmSize = this.allLimbs.get('rightArmSize');
    let leftArmRotation = this.allLimbs.get('leftArmRotation');
    let rightArmRotation = this.allLimbs.get('rightArmRotation');
    let leftLegRotation = this.allLimbs.get('leftLegRotation');
    let rightLegRotation = this.allLimbs.get('rightLegRotation');
    let leftArmFreeze = this.allLimbs.get("leftArmFreeze");
    let rightArmFreeze = this.allLimbs.get("rightArmFreeze");
    let movingForward = this.allLimbs.get("movingForward");
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
  
    this.allLimbs.set("headLoc", headLoc);
    this.allLimbs.set("leftLegLoc",leftLegLoc);
    this.allLimbs.set("rightLegLoc", rightLegLoc);
    this.allLimbs.set("leftArmLoc", leftArmLoc);
    this.allLimbs.set("rightArmLoc", rightArmLoc);
    this.allLimbs.set("leftArmRotation", leftArmRotation);
    this.allLimbs.set("leftLegRotation", leftLegRotation);
    this.allLimbs.set("rightLegRotation", rightLegRotation);
    this.allLimbs.set("headFreeze", headFreeze);
    this.allLimbs.set("leftLegFreeze", leftLegFreeze);
    this.allLimbs.set("rightLegFreeze", rightLegFreeze);
    this.allLimbs.set("rightArmFreeze", rightArmFreeze);
    this.allLimbs.set("leftArmFreeze", leftArmFreeze);
    this.allLimbs.set("movingForward", movingForward);
    this.allLimbs.set("startingPoint", startingPoint);
    p5.pop();
  }
  getPerson(){
    return this.allLimbs;
  }
}

let scene = 0;

function playScenes(){
    sceneNumber = 0;
    if (sceneNumber == 0){
      //noStroke();
      //fill('white');
      sceneOne();
    }
    drawBody();
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
