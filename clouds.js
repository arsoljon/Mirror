
export default class clouds
{
    constructor(p5,width, height)
    {
        //cloud
        this.cloudMap = new Map();
        this.cloudSize = [1, 20];
        this.cloudRoll = [20,0];
        this.cloudCount = 250;
        this.w = width;
        this.h = height;
        //this.h = 300;
        //setClouds(p5);
    }

    setClouds(p5){
        for(let i = 0; i < this.cloudCount; ++i){
          let positionMap = new Map();
          //create a Cluster
          let min = 1;
          let max = 100;
          positionMap.set('offset', max - Math.floor(Math.random() * (max - min + 1)));
          let off = positionMap.get('offset');
          positionMap.set('maxCluster', 10);
          let clusterSize = positionMap.get('maxCluster');
          positionMap.set('clusterID', Math.floor(p5.random(clusterSize)));   //clusterID represents the specific cluster of clouds this cloud will be with.
      
          let id = positionMap.get('clusterID');
          let maxClusters = positionMap.get('maxCluster');
          min = id * (this.w/maxClusters);
          max = (id + 1) * (this.w/maxClusters);
          let xRange = [min, max];     //xRange represent the x parameters for a cloud spawn
          positionMap.set('xRange', xRange);
          min = 80;
          max = 90;
          let redRange = Math.floor(p5.map(p5.noise(off), 0,1, min, max));
          min = 106;
          max = 130;
          let blueRange = Math.floor(p5.map(p5.noise(off), 0,1, min, max))
          min = 117;
          max = 150;
          let greenRange = Math.floor(p5.map(p5.noise(off), 0,1, min, max))
          positionMap.set('speed', (id+1)*.1);
          positionMap.set('color', [redRange, blueRange, greenRange]);
      
          positionMap.set('angle', 360 - Math.floor(Math.random() * (360 - 0 + 1)));
          min = 0;
          max = this.w;
          //positionMap.set('cloudX', max - Math.floor(Math.random() * (max - min + 1)));
          positionMap.set('cloudX', p5.map(p5.noise(off), 0,1,0, min, max));
          min = 50;
          max = 200;
          //positionMap.set('cloudY', max - Math.floor(Math.random() * (max - min + 1)));
          positionMap.set('cloudY', p5.map(p5.noise(off), 0,1,0, min, max));
          min = 1
          max = 1000
          positionMap.set('strokeWeight', .5 * p5.map(p5.noise(off), 0,1,0, min, max))
          min = 0;
          max = 10;
          this.cloudMap.set(i, positionMap);
          //every ID represent a range a cloud line is allowed to be in. 
          //This should create a cluster of lines ressembling a cloud.
        }
    }

    drawClouds(p5) {
        p5.push();
        p5.fill('gray');
        //clouds should be represented by lines 
        //straight lines will follow a circular path  
        //A line will rotate
        //A line will follow a circular path. 
        //A line will finish a single rotation after it has finished a single path.
        //repeat for all other clouds.
        //General: cloudSpeed, cloudRoll, cloudSize
        //Specific: cloudPos, angle, 
        let history = [];
        for(let i = 0; i < this.cloudCount; ++i){
            let positionMap = this.cloudMap.get(i);
            let x = positionMap.get('cloudX');
            let y = positionMap.get('cloudY');
            let angle = positionMap.get('angle');
            let sw = positionMap.get('strokeWeight');
            let off = positionMap.get('offset');
            let cloudSpeed = positionMap.get('speed');
            let r = positionMap.get('redRange');
            let g  = positionMap.get('greenRange');
            let b = positionMap.get('blueRange');
            let v = p5.createVector(x,y);
            history.push(v);
            let maxCopies = 5;
            if(history.length > maxCopies){
                history.splice(0,1);
            }
            p5.push();
            //strokeWeight changes thickness of lines and stroke change color from black to white
            p5.fill('gray');
            p5.strokeWeight(sw);
            p5.stroke(500);
            p5.translate(x, y)
            if(x > this.w + this.w/6){
                x = this.cloudRespawn(p5,i);
                //cloud is at its endpoint
                //cloudOffset = 0;
            }
            x += cloudSpeed;
            p5.rotate(-angle);
            let strengthFill = 255;
            let strengthStroke = 255;
            //noStroke();
            //colorMode(HSB);
            p5.fill(r,g,b);
            p5.rect(this.cloudRoll[0],this.cloudRoll[1],this.cloudSize[0],this.cloudSize[1]);
            //add trail to the clouds
            for(let i = 0; i < history.length; ++i){
                p5.rect(this.cloudRoll[0]-i*5,this.cloudRoll[1]-i*1,this.cloudSize[0],this.cloudSize[1]);
            }
            p5.pop();
            angle += 1;
            if(angle > 360){
                //improbable of reaching but want to avoid overflow. 
                angle = 0;
            }
            positionMap.set('cloudX', x);
            positionMap.set('angle', angle);
            this.cloudMap.set(i, positionMap);
        }
        p5.pop();
    }
    cloudRespawn(p5,i){
        let positionMap = this.cloudMap.get(i);
        let xRange = positionMap.get('xRange');
        let off = positionMap.get('offset');
        let max = 0 - xRange[1];
        let min = 0 - xRange[0];
        let posX = p5.map(p5.noise(off), 0,1,0, min, max)
        return posX;
    }
}

/*
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

export function clouds() {
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
        message = "CloudMap : " + cloudMap;
        text(message, 200,220);
        console.log(message);
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
    message = "CloudMap : " + cloudMap;
    text(message, 200,200);
    console.log(message);
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

*/