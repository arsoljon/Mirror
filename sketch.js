

//import person from './person.js'
//import scenes from './scenes.js'
import Sky from './Sky.js'
import Ground from './Ground.js'
import Rain from './Rain.js'
import Clouds from './Clouds.js';
import Person from './Person.js'
import Scenes from './Scenes.js'
import Vertical_Hatching from './hatching/vertical_hatching.js'
import Angled_Hatching from './hatching/angled_hatching.js';



new p5(function(p5)
{
  p5.setup = function()
  {
    this.w = 450;
    this.h = 300;
    p5.createCanvas(this.w, this.h);
    p5.angleMode(p5.DEGREES);
    this.setGroundCover(p5);
    this.ground = new Ground(p5,this.w,this.h);
    this.ground.drawGround(p5)
    this.groundCanvas = this.ground.getCanvas();
    //this.ground.setupCanvas();
    //this.groundCanvas = this.ground.getCanvas();
    this.sky = new Sky(p5, this.w, this.h);
    this.rain = new Rain(p5,this.w,this.h, this.ground.getGroundY2());
    this.rain.setRain(p5);
    this.clouds = new Clouds(p5,this.w,this.h);
    this.clouds.setClouds(p5);
    this.vertical_hatching = new Vertical_Hatching(p5, this.w, this.h);
    this.angled_hatching = new Angled_Hatching(p5, this.w, this.h);
    this.person = new Person(p5);
    this.person.setLimbs(p5);
    this.scenes = new Scenes(p5,this.person.getPerson(), this.ground.getGround(p5));
    
    //this.groundCanvas.background(255,255,255,100)
    //this.ground.drawGround(p5, this.groundCanvas);
  
    //setRain();
    //setLimbs();
    this.i = 0;
    this.gc1 = 0;
  }

  p5.draw = function()
  {
    p5.background(0,0);
    //this.groundCanvas.clear()
    this.sky.drawSky(p5);
    this.angled_hatching.drawHatching(p5);
    this.i-=0.9;
    if (this.i < -this.w){
      this.i = this.w;
    }
    this.updateGroundCover(p5,0.9);
    p5.image(this.groundCanvas1, this.ground1.getCanvasLocation(), 0);
    p5.image(this.groundCanvas2, this.ground2.getCanvasLocation(), 0);
    //this.ground.drawGround(p5, this.groundCanvas);
    this.rain.drawRain(p5);
    this.clouds.drawClouds(p5);
    this.scenes.playScenes(p5)
    this.person.updatePerson(p5, this.scenes.getPerson());
    this.person.drawBody(p5);
    this.vertical_hatching.drawHatching(p5);

    //this.person = Scenes.getNewPosition();
    //sky();
    //ground();
    //rain();
    //clouds();
    //roughPerson();
    //playScenes();  
  }

  p5.setGroundCover = function(p5)
  {
    //the 2 canvases will provide enough time for the new canvas to follow it
    //as the other leaves the screen.
    this.ground1 = new Ground(p5,this.w,this.h, 0);
    this.ground2 = new Ground(p5,this.w,this.h, this.w);
    this.ground1.drawGround(p5);
    this.ground2.drawGround(p5); 
    this.groundCanvas1 = this.ground1.getCanvas();
    this.groundCanvas2 = this.ground2.getCanvas();
  }
  p5.updateGroundCover = function(p5,i)
  {
    let gc1 = this.ground1.getCanvasLocation();
    let gc2 = this.ground2.getCanvasLocation();
    if (gc1 < -this.w){
      gc1 = this.w;
    }
    if (gc2 < -this.w){
      gc2 = this.w;
    } 
    gc1 -= i;
    gc2 -= i;
    this.ground1.setCanvasLocation(gc1);
    this.ground2.setCanvasLocation(gc2);
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










