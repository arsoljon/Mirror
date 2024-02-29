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
let cloudSize = [0, 25];
let cloudPos = [-100, 0];
let cloudRoll = [20,0];
let cloudSpeed = 0.5;
let cloudCount = 500;


function setup() {
  createCanvas(w, h);
  angleMode(DEGREES);
  setRain();
  setClouds();
  //frameRate(5)
}

function draw() {
  background(220);
  sky();
  ground();
  rain();
  clouds();
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
    push();
    translate(cloudPosX, cloudPosY)
    if(cloudPosX > w+w/4){
      //cloud is at its endpoint
      let min = -w/4;
      let max = -w;
      cloudPosX = max - Math.floor(Math.random() * (max - min + 1));
    }
    cloudPosX += cloudSpeed;
    rotate(-angle);
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

function setClouds(){
  for(let i = 0; i < cloudCount; ++i){
    let positionMap = new Map();
    positionMap.set('angle', 360 - Math.floor(Math.random() * (360 - 0 + 1)));
    let min = w;
    let max = -w;
    positionMap.set('cloudX', max - Math.floor(Math.random() * (max - min + 1)));
    positionMap.set('cloudY', 0)
    cloudMap.set(i, positionMap);
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