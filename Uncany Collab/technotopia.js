const { Engine, World, Bodies, Composite } = Matter;

let circleAdded = false; // false when new snowflakes could be added


let engine;
let world;
let circles = []; // the snowflakes
let user = []; //the user
let snowX;
let snowY;
let snowSize;

let video;
let poseNet;
let poses = [];
let pose;

var speech;
let previousSpeech = '';
let speeches = []
let newspeech=[]

let frame


//record


function preload(){
  frame=loadImage('frame.png')
}

function modelLoaded() {
  console.log("PoseNet model loaded!");
}
function gotPoses(newPoses) {
  poses = newPoses;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
    //pose in the house
    video = createCapture(VIDEO);

    video.size(windowWidth, windowHeight);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

  //engine
  engine = Engine.create();
  world = engine.world;

  frameRate(25);
  //speech identifier



  speech = new p5.SpeechRec('en-US', gotSpeech); // speech recognition object (will prompt for mic access)
  speech.continuous = true;
  //speech.interimResults = true;
  speech.start(); // start listening
}


function draw() {
  background(255);
  textAlign(CENTER);
  fill(255,21,147)
  text('VOICE MEMO 2O24',width/2,height/2)

  //image(video, 0, 0);
  Engine.update(engine);


  for (var p = 0; p < poses.length; p++) {

        
    pose = poses[p].pose;
  
    let nose = pose.nose;
    let userX = width - nose.x;
    let userY = nose.y;

      noStroke()
      fill(0)
      //ellipse(userX,userY,10)


  if (speech.resultString !== previousSpeech
    ) { 
        //console.log("New speech detected:", speech.resultString);
        circles.push(new Circle(userX, userY, 2, speeches[speeches.length-1]));
       // circleAdded = true //stop pushing (one at a time)
        previousSpeech = speech.resultString;
        speeches.push(previousSpeech)
        newspeech = [previousSpeech];
      //  text(previousSpeech,mouseX, mouseY)
        //boundaries.splice(i, 1);
       // poses.splice(p, 1) // so that i and p would sync?
    }

      // Check if pose is within canvas 
      for (let i = 0; i < newspeech.length; i++) {
       text(newspeech[i],userX,userY)
      }
    }



  for (let i = 0; i < circles.length; i++) {
    circles[i].update(frameCount / 50);
   circles[i].show();

    //check if land
    if (circles[i].isLanding()) {
      circles[i].resetPosition(); // Reset position
      
    }
  }

  //image(mask,0,0,width,height)
  //image(frame,mouseX,mouseY,width,height)


  // for (let i = 0; i < boundaries.length; i++) {
  //  boundaries[i].show();

  //   //   boundaries.splice(i-1, 1);
  //   //  console.log(boundaries.length)
  // }
}


function gotSpeech()
{
  console.log(speech.resultString); // log the result
}