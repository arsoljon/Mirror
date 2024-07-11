

export default class Person
{
  constructor(p5){
    this.allLimbs = new Map();
    this.defaultLimbs;
  }
  setLimbs(p5){
    p5.push();
    //head has one joint connected to torso
    //torso has 5 joints connected to head, right leg and arm,  left leg and arm.
    //one arm has 2 limbs. the top arm has 2 joints, the forearm has one joint.
    //one leg has 2 limbs. the top leg has 2 joints, the shin has one joint.  
    let headLoc = p5.createVector(138,100);
    let armSize = 25;
    let legSize = 50;
    let armOffsetY = 28;
    let legOffsetY = (headLoc.y/2)+10;
  
    this.allLimbs.set('headLoc', headLoc);
    this.allLimbs.set('torsoLoc', [p5.createVector(headLoc.x+7,headLoc.y+20), p5.createVector(headLoc.x+7,headLoc.y+20+45)]);
    this.allLimbs.set('leftArmLoc',[p5.createVector(headLoc.x+7,headLoc.y+armOffsetY), p5.createVector(headLoc.x+7,headLoc.y+armOffsetY+armSize/2),p5.createVector(headLoc.x+7,headLoc.y+armOffsetY+armSize) ]);
    this.allLimbs.set('rightArmLoc',[ p5.createVector(headLoc.x+17,headLoc.y+armOffsetY), p5.createVector(headLoc.x+17,headLoc.y+armOffsetY+armSize/2), p5.createVector(headLoc.x+17,headLoc.y+armOffsetY+armSize)]);
    this.allLimbs.set('leftLegLoc', [p5.createVector(headLoc.x+9,headLoc.y+legOffsetY), p5.createVector(headLoc.x+9,headLoc.y+legOffsetY+legSize/2),p5.createVector(headLoc.x+9,headLoc.y+legOffsetY+legSize)]);
    this.allLimbs.set('rightLegLoc', [p5.createVector(headLoc.x+15,headLoc.y+legOffsetY),p5.createVector(headLoc.x+15,headLoc.y+legOffsetY+legSize/2),p5.createVector(headLoc.x+15,headLoc.y+legOffsetY+legSize)]);
    this.allLimbs.set('headSize', [25,25]);
    this.allLimbs.set('torsoSize',[10,45]);
    this.allLimbs.set('leftArmSize', [0,armSize]);
    this.allLimbs.set('rightArmSize',[0,armSize]);
    this.allLimbs.set('leftLegSize', [0,legSize]);
    this.allLimbs.set('rightLegSize', [0,legSize]);
    this.allLimbs.set('leftArmRotation',[90,90]);
    this.allLimbs.set('rightArmRotation',[90,90]);
    this.allLimbs.set('leftLegRotation',[90,90]);
    this.allLimbs.set('rightLegRotation',[90,90]);
    this.allLimbs.set('headRotation',0);
    this.allLimbs.set('torsoRotation',0);
    this.allLimbs.set('headFreeze', false);
    this.allLimbs.set('torsoFreeze', false);
    this.allLimbs.set('leftArmFreeze', false);
    this.allLimbs.set('rightArmFreeze', false);
    this.allLimbs.set('leftLegFreeze', false);
    this.allLimbs.set('rightLegFreeze', false);
    this.allLimbs.set('movingForward', false);
    this.defaultLimbs = this.allLimbs;
    p5.pop();
  }

  makeHead(p5){
    p5.strokeWeight(0);
    p5.stroke(255, 255);
    let loc = this.allLimbs.get('headLoc');
    let size = this.allLimbs.get('headSize');
    p5.push();
    p5.translate(loc.x,loc.y);
    p5.ellipse(0,0,size[0],size[1]);
    p5.pop();
  }
  makeTorso(p5){
    p5.strokeWeight(0);
    p5.stroke(255, 255);
    let loc = this.allLimbs.get('torsoLoc');
    let size = this.allLimbs.get('torsoSize');
    p5.push();
    p5.translate(loc[0].x,loc[0].y);
    p5.ellipse(0,0,size[0],size[1]);
    p5.pop();
  }

  makeArms(p5){
    //apply a general arm rotation to both arms. Recenter the axis point at leftLoc point
    p5.push();
    p5.strokeWeight(5);
    p5.stroke(255, 255);
    let leftLoc = this.allLimbs.get('leftArmLoc');
    let rightLoc = this.allLimbs.get('rightArmLoc');
    let leftSize = this.allLimbs.get('leftArmSize');
    let rightSize = this.allLimbs.get('rightArmSize');
    let leftRotation = this.allLimbs.get('leftArmRotation');
    let rightRotation = this.allLimbs.get('rightArmRotation');
    //makeArm(leftLoc, leftSize, leftRotation);
    //makeArm(rightLoc, rightSize, rightRotation);
  
  
    this.makeArm2(p5, leftLoc, leftSize[1], leftRotation);
    this.makeArm2(p5, rightLoc, rightSize[1], rightRotation);
  
    //dragSegment(leftLoc[0], leftLoc[1], leftRotation[0]);
    //console.log('leftLoc1: ' + leftLoc[0]);
    //console.log('rightLoc2: ' + leftLoc[1]);
    //console.log('leftrotation: ' + leftRotation)
    
    p5.pop();
  }
  makeArm2(p5,armLocation, limbSize, rotation, adjustSize = .5){
    let cosX = p5.cos(rotation[0]);
    let sinY = p5.sin(rotation[0]);
    //xStationary += 1;
    let endPoint1 = [cosX*limbSize,sinY*limbSize]
    
    p5.push();
    p5.translate(armLocation[0].x, armLocation[0].y);
    p5.line(0,0,endPoint1[0]*adjustSize,endPoint1[1]*adjustSize)
    p5.pop();
    
    cosX = p5.cos(rotation[1]);
    sinY = p5.sin(rotation[1]);
    let newX = armLocation[0].x + endPoint1[0]*adjustSize;
    let newY = armLocation[0].y + endPoint1[1]*adjustSize;
    let endPoint2 = [cosX*limbSize, sinY*limbSize];
    
    p5.push();
    p5.translate(newX, newY);
    p5.line(0,0,endPoint2[0]*adjustSize,endPoint2[1]*adjustSize)
    p5.pop();
  }

  makeLegs(p5){
    p5.push();
    p5.strokeWeight(5.0);
    p5.stroke(255, 255);
    let leftLoc = this.allLimbs.get('leftLegLoc');
    let rightLoc = this.allLimbs.get('rightLegLoc');
    let leftSize = this.allLimbs.get('leftLegSize');
    let rightSize = this.allLimbs.get('rightLegSize');  
    let leftRotation = this.allLimbs.get('leftLegRotation');
    let rightRotation = this.allLimbs.get('rightLegRotation');
    //makeLeg(leftLoc, leftSize, leftRotation);
    //makeLeg(rightLoc, rightSize, rightRotation);
    this.makeLeg2(p5, leftLoc, leftSize[1], leftRotation);
    this.makeLeg2(p5, rightLoc, rightSize[1], rightRotation);
    p5.pop();
  }
  makeLeg2(p5, legLocation, limbSize, rotation, adjustSize = .3){
    let cosX = p5.cos(rotation[0]);
    let sinY = p5.sin(rotation[0]);
    //xStationary += 1;
    let endPoint1 = [cosX*limbSize,sinY*limbSize]
    
    p5.push();
    p5.translate(legLocation[0].x, legLocation[0].y);
    p5.line(0,0,endPoint1[0]*adjustSize,endPoint1[1]*adjustSize)
    p5.pop();
    
    cosX = p5.cos(rotation[1]);
    sinY = p5.sin(rotation[1]);
    let newX = legLocation[0].x + endPoint1[0]*adjustSize;
    let newY = legLocation[0].y + endPoint1[1]*adjustSize;
    let endPoint2 = [cosX*limbSize, sinY*limbSize];
    
    p5.push();
    p5.translate(newX, newY);
    p5.line(0,0,endPoint2[0]*adjustSize,endPoint2[1]*adjustSize)
    p5.pop();
  }

  drawBody(p5){
    p5.ellipseMode(p5.CORNER);
    this.makeTorso(p5); 
    this.makeHead(p5);
    this.makeLegs(p5);
    this.makeArms(p5);
    this.testLimbs(p5);
  }

  testLimbs(p5){
    let firstLimb = this.allLimbs.get('leftArmLoc');
    p5.push();
    p5.strokeWeight(7);
    p5.stroke(255, 204, 0);
    p5.point(firstLimb[0].x, firstLimb[0].y);
    p5.point(firstLimb[1].x, firstLimb[1].y);
    //strokeWeight(20);
    p5.point(firstLimb[2].x, firstLimb[2].y);
    //console.log(firstLimb[2])
    p5.pop();
  }
}

/*
let allLimbs = new Map();
let scene = 0;
let defaultLimbs;



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

  function drawBody(){
    ellipseMode(CORNER);
    makeTorso(); 
    makeHead();
    makeLegs();
    makeArms();
    testLimbs();
  }

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
    //if (armRotation > 50 || armRotation < -50){
    //  speedRotation *= -1;
    //}
    //armRotation += speedRotation;

    drawBody();
    pop();
  }
  */
 /*
  function roughPerson(){
    //roation value should always update in the rough person method. 
  
    //the person will be moving according to the speed of a song. So different set of movements for 
    //different parts of the song. 
    //  The song should be about 78 bpm   
    //for debugging, utilize a onPress method with the spacebar to cycle through the movements. 
    //There is a 1st walk, 2nd walk, pause looking up, pause looking down, free fall, etc.
    //using the scene variable to go through various scenes, increment scene each time a 
    //  button is pressed. if scene > 5 reset to 0. all scenes will move except for 0, freezing at last movement of scene 5.
  
  
    jointBend()
  
    
    
  
    //jointBend();
    //drawBody();
   }

   */
  
  
  