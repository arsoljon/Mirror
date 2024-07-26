

export default class Person
{
  constructor(p5){
    this.allLimbs = new Map();
    this.defaultLimbs = new Map();
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
    let torsoMap = this.setTorso(p5);
    //console.log("2nd map size = " + torsoMap.size);
    this.allLimbs.set('torsoMap',torsoMap);
    //let torso = this.allLimbs.get('torsoSections')
    //let neck = torso['neck'];
    //let abs = torso['abs'];
    //let hips = torso['hips'];
    this.defaultLimbs = this.allLimbs;
    p5.pop();
  }

  setTorso(p5){
        //set torso positions to adjust for custom shape vectors
        let torsoMap = new Map();
        let torsoLoc = this.allLimbs.get('torsoLoc')[0];
        let torsoSize = this.allLimbs.get('torsoSize');
        let wideValue = torsoSize[0]/2;
        let heightOffset = 5;
        let lengthValue = torsoSize[1]/2-3;
        let abs1Offset = 0;
        let abs2Offset = 0;
        //neck; 3-different vectors
        let neck1 = p5.createVector(torsoLoc.x,torsoLoc.y)
        let neck2 = p5.createVector(neck1.x+wideValue,neck1.y-heightOffset)
        let neck3 = p5.createVector(neck1.x + 2*wideValue, neck1.y)
        //abs; 2 different vectors
        let abs1 = p5.createVector(neck3.x+abs1Offset, neck3.y+lengthValue)
        let abs2 = p5.createVector(neck1.x+abs2Offset,neck1.y+lengthValue);
        //hips; 3 different vectors
        let hips1 = p5.createVector(abs1.x,abs1.y+lengthValue);
        let hips2 = p5.createVector(hips1.x-wideValue,hips1.y+heightOffset);
        let hips3 = p5.createVector(abs2.x,abs2.y+lengthValue);
        let allNecks = [neck1,neck2,neck3];
        torsoMap.set('neck',[neck1,neck2,neck3]);
        torsoMap.set('abs',[abs1,abs2]);
        torsoMap.set('hips',[hips1,hips2,hips3]);
        //console.log("1st map size = " + torsoMap.size);
        //console.log("neck details = " + torsoMap.get('hips'));
        return torsoMap;
  }
  makeHead(p5){
    p5.push();
    p5.strokeWeight(1);
    p5.stroke(0,0,0);
    p5.noStroke();
    //p5.noStroke();
    let loc = this.allLimbs.get('headLoc');
    let size = this.allLimbs.get('headSize');
    p5.translate(loc.x,loc.y);
    p5.ellipse(0,0,size[0],size[1]);
    p5.pop();
  }
  makeTorso(p5){
    p5.push();
    p5.strokeWeight(1);
    p5.stroke(0,0,0);
    p5.noStroke();
    let loc = this.allLimbs.get('torsoLoc');
    let size = this.allLimbs.get('torsoSize');
    p5.translate(loc[0].x,loc[0].y);
    p5.rect(0,0,size[0]+1,size[1]-5);
    p5.pop();
  }
  makeTorso2(p5){
    p5.push();
    //let torso = this.allLimbs.get('torsoSections')
    //let neck = torso['neck'];
    //let abs = torso['abs'];
    //let hips = torso['hips'];
    let torsoMap = this.allLimbs.get('torsoMap');

    let neck = torsoMap.get('neck');
    let abs = torsoMap.get('abs');
    let hips = torsoMap.get('hips');

    let torsoLoc = this.allLimbs.get('torsoLoc')[0];
    let torsoSize = this.allLimbs.get('torsoSize');
    let wideValue = torsoSize[0]/2;
    let heightOffset = 5;
    let lengthValue = torsoSize[1]/2-3;
    let abs1Offset = 0;
    let abs2Offset = 0;
    /*
    //neck; 3-different vectors
    let neck1 = [torsoLoc.x,torsoLoc.y]
    let neck2 = [neck1[0]+wideValue,neck1[1]-heightOffset]
    let neck3 = [neck1[0] + 2*wideValue, neck1[1]]
    //abs; 2 different vectors
    let abs1 = [neck3[0]+abs1Offset, neck3[1]+lengthValue]
    let abs2 = [neck1[0]+abs2Offset,neck1[1]+lengthValue];
    //hips; 3 different vectors
    let hips1 = [abs1[0],abs1[1]+lengthValue];
    let hips2 = [hips1[0]-wideValue,hips1[1]+heightOffset];
    let hips3 = [abs2[0],abs2[1]+lengthValue];
    */
    /*
    //alter direction
    //neck-forward
    neck1[0] += 6;
    neck1[1] += 0;
    neck2[0] += 3;
    neck2[1] += 3;
    neck3[0] += 3;
    neck3[1] += 5;
    */
    //p5.noStroke();
    p5.beginShape();

    p5.curveVertex(neck[0].x,neck[0].y);
    p5.curveVertex(neck[1].x,neck[1].y);
    p5.curveVertex(neck[2].x,neck[2].y);
    p5.curveVertex(abs[0].x,abs[0].y);
    p5.curveVertex(hips[0].x,hips[0].y);
    p5.curveVertex(hips[1].x,hips[1].y);
    p5.curveVertex(hips[2].x,hips[2].y);
    p5.curveVertex(abs[1].x,abs[1].y);

    p5.vertex(neck[0].x,neck[0].y);
    p5.vertex(neck[1].x,neck[1].y);
    p5.vertex(neck[2].x,neck[2].y);
    p5.vertex(abs[0].x,abs[0].y);
    p5.vertex(hips[0].x,hips[0].y);
    p5.vertex(hips[1].x,hips[1].y);
    p5.vertex(hips[2].x,hips[2].y);
    p5.vertex(abs[1].x,abs[1].y);
    
    p5.endShape();
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
    this.makeArm(p5, leftLoc, leftSize[1], leftRotation);
    this.makeArm(p5, rightLoc, rightSize[1], rightRotation);
    p5.pop();
  }
  makeArm(p5,armLocation, limbSize, rotation, adjustSize = .5){
    let cosX = p5.cos(rotation[0]);
    let sinY = p5.sin(rotation[0]);
    //xStationary += 1;
    let endPoint1 = [cosX*limbSize,sinY*limbSize]
    
    p5.push();
    p5.stroke(255,255,255)
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
    this.makeLeg(p5, leftLoc, leftSize[1], leftRotation);
    this.makeLeg(p5, rightLoc, rightSize[1], rightRotation);
    p5.pop();
  }
  makeLeg(p5, legLocation, limbSize, rotation, adjustSize = .3){
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
    this.makeLegs(p5);
    this.makeArms(p5);
    this.makeTorso(p5);
    //this.makeTorso2(p5);
    this.makeHead(p5);
    //this.testLimbs(p5);
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
  getPerson(){
    return this.allLimbs;
  }
  getDefault(){
    return this.defaultLimbs;
  }
  updatePerson(p5, person){
    this.allLimbs = person;
  }
}

function drawTorso2(){
  push();
  let wideValue = 20;
  let heightOffset = 10;
  let lengthValue = 40;
  let waist1Offset = 0;
  let waist2Offset = 0;
  //neck; 3-different vectors
  let neck1 = [250,100]
  let neck2 = [neck1[0]+wideValue,neck1[1]-heightOffset]
  let neck3 = [neck1[0] + 2*wideValue, neck1[1]]
  //waist; 2 different vectors
  let waist1 = [neck3[0]+waist1Offset, neck3[1]+lengthValue]
  let waist2 = [neck1[0]+waist2Offset,neck1[1]+lengthValue];
  //bottom; 3 different vectors
  let bottom1 = [waist1[0],waist1[1]+lengthValue];
  let bottom2 = [bottom1[0]-wideValue,bottom1[1]+heightOffset];
  let bottom3 = [waist2[0],waist2[1]+lengthValue];
  
  //alter direction
  //neck-forward
  neck1[0] += 6;
  neck1[1] += 0;
  neck2[0] += 3;
  neck2[1] += 3;
  neck3[0] += 3;
  neck3[1] += 5;
  beginShape();
  
  curveVertex(neck1[0],neck1[1]);
  curveVertex(neck2[0],neck2[1]);
  curveVertex(neck3[0],neck3[1]);
  curveVertex(waist1[0],waist1[1]);
  curveVertex(bottom1[0],bottom1[1]);
  curveVertex(bottom2[0],bottom2[1]);
  curveVertex(bottom3[0],bottom3[1]);
  curveVertex(waist2[0],waist2[1]);
  
  vertex(neck1[0],neck1[1]);
  vertex(neck2[0],neck2[1]);
  vertex(neck3[0],neck3[1]);
  vertex(waist1[0],waist1[1]);
  vertex(bottom1[0],bottom1[1]);
  vertex(bottom2[0],bottom2[1]);
  vertex(bottom3[0],bottom3[1]);
  //vertex(waist2[0],waist2[1]);
  endShape();
  pop();
}
/* first attempt to make custom shape; worm.

function setup() {
  createCanvas(400, 400);
}
let rewind = false;
let wiggle = 30;
let waist1 = [130,150]
let waist2 = [110,150]
let waist1Max = waist1[0] + wiggle;
let waist2Max = waist2[0]+ wiggle;
let waist1Min = waist1[0]- wiggle/2;
let waist2Min = waist2[0]- wiggle/2;
let speed = 1;
function draw() {
  background(220);
  if(rewind == false){
    waist1[0] += speed;
    waist2[0] += speed;
  }
  else{
    speed *= -1;
  }
  if(waist1[0] > waist1Max){
    rewind = !rewind;
  }
  else if(waist1[0] < waist1Min){
    rewind = !rewind;
  }
  beginShape();
  curveVertex(120,100);
  curveVertex(140,100);
  curveVertex(waist1[0],waist1[1]); //waist1
  curveVertex(140,200);
  curveVertex(120,200);
  curveVertex(waist2[0],waist2[1]);  //waist2
  curveVertex(120,100);
  //vertex(120,100);
  vertex(140,100);
  vertex(waist1[0],waist1[1]);  //waist1
  vertex(140,200);
  vertex(120,200);
  vertex(waist2[0],waist2[1]); //waist2
  vertex(120,100);
  
  endShape();
}
   */
  
  
  