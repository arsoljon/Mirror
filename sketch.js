

//import person from './person.js'
//import scenes from './scenes.js'
import Sky from './Sky.js'
import Ground from './Ground.js'
import Rain from './Rain.js'
//import clouds from './clouds.js';
//



new p5(function(p5)
{
  p5.setup = function()
  {
    this.w = 450;
    this.h = 300;
    p5.createCanvas(this.w, this.h);
    p5.angleMode(p5.DEGREES);
    this.ground = new Ground(p5,this.w,this.h);
    this.sky = new Sky(p5, this.w, this.h);
    this.rain = new Rain(p5,this.w,this.h, this.ground.getGroundY2());
    this.rain.setRain(p5);
    //allClouds = new clouds(p5);
    //setRain();
    //setLimbs();
  }

  p5.draw = function()
  {
    p5.background(220,220);
    this.ground.drawGround(p5);
    this.sky.drawSky(p5);
    this.rain.drawRain(p5);
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










