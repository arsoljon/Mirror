

//import person from './person.js'
//import scenes from './scenes.js'
//import sky from './sky.js'
import Ground from './Ground.js'
//import rain from './rain.js'
//import clouds from './clouds.js';
//



new p5(function(p5)
{
  let w = 450;
  let h = 300;
  p5.setup = function()
  {
    p5.createCanvas(w, h);
    p5.angleMode(p5.DEGREES);
    this.ground = new Ground(p5,w,h);
    //allClouds = new clouds(p5);
    //setRain();
    //setLimbs();
  }

  p5.draw = function()
  {
    p5.background(0,220);
    this.ground.drawGround(p5);
    //sky();
    //ground();
    //rain();
    //clouds();
    //roughPerson();
    //playScenes();  
  }
});

/*
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
*/










