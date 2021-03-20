var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var bell;
var yellowimg, redimg, pinkimg;
var yellowFallen, redFallen,pinkFallen;
var yellowp, redp, pinkp;
var coneImg,nailImg,holeImg;
var conee, nail,hole;
var gameOver,gameOverImg;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1=loadAnimation("mainPlayer1-1.png","mainPlayer2-1.png");
  mainRacerImg2=loadAnimation("mainPlayer3.png");
  yellowimg=loadAnimation("opponent4.png","opponent5.png");
  yellowFallen=loadAnimation("opponent6.png");
  pinkimg=loadAnimation("opponent1.png","opponent2.png");
  pinkFallen=loadAnimation("opponent3.png");
  redimg=loadAnimation("opponent7.png","opponent8.png");
  redFallen=loadAnimation("opponent9.png");
  bell=loadSound("bell.mp3");
  coneImg=loadImage("obstacle1.png");
  nailImg=loadImage("obstacle3.png");
  holeImg=loadImage("obstacle2.png");
  gameOverImg=loadImage("gameOver.png");
}

function setup(){
  
createCanvas(700,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -(5+2*distance/150);

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("collided",mainRacerImg2)
mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
mainCyclist.setCollider("rectangle",0,0,50,mainCyclist.height);  

  gameOver=createSprite(550,100,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.6;
  gameOver.visible=false;
  
  mainPG=createGroup();
  mainPG.add(mainCyclist);
  redPG=createGroup();
  pinkPG=createGroup();
  yellowPG=createGroup();
  conePG=createGroup();
  nailPG=createGroup();
  holePG=createGroup();
}

function draw() {
  background(0);
  
  
  
  if(gameState===PLAY){
  console.log("game is in play state")
    mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
   mainCyclist.y = World.mouseY;
   edges=createEdgeSprites();
   mainCyclist.collide(edges);
//makes path reappear fromm half of its width
    if(path.x < 0 ){
    path.x = width/3;
    }
    distance=distance+Math.round(getFrameRate()/50);
    players();
    obstacle();
    if (keyDown("space")){
      bell.play();
    }
 }
  if (mainPG.isTouching(yellowPG)||mainPG.isTouching(redPG)||mainPG.isTouching(pinkPG)||mainPG.isTouching(conePG)||mainPG.isTouching(nailPG)||mainPG.isTouching(holePG)){ 
    mainCyclist.changeAnimation("collided",mainRacerImg2)
    if(mainPG.isTouching(yellowPG)){
      yellowp.changeAnimation("yellowF",yellowFallen);
      yellowPG.setVelocityXEach(0);
    }
    if(mainPG.isTouching(redPG)){
      redp.changeAnimation("redF",redFallen);
      redPG.setVelocityXEach(0);
    }
    if(mainPG.isTouching(pinkPG)){
      pinkp.changeAnimation("pinkF",pinkFallen);
      pinkPG.setVelocityXEach(0);
    }
    conePG.setLifetimeEach(-1);
    nailPG.setLifetimeEach(-1);
    holePG.setLifetimeEach(-1);
    conePG.setVelocityXEach(0);
    nailPG.setVelocityXEach(0);
    holePG.setVelocityXEach(0);
     if (mainPG.isTouching(conePG)||mainPG.isTouching(nailPG)||mainPG.isTouching(holePG)){
        pinkPG.setVelocityXEach(2);
    redPG.setVelocityXEach(2);
    yellowPG.setVelocityXEach(3);
     }
     
     
      
    gameOver.visible=true;
    gameState=END;
    path.velocityX=0;
    
    
  
  }
  if (gameState===END&&keyDown(UP_ARROW)){
    reset();
  }
  drawSprites();
  textSize(16);
  fill(255);
  text("Distance: "+ distance,550,30);
  if (gameState===END){
    textSize(20);
    fill(255);
    text("Press 'up arrow' to ",400,200);
     text("restart the game ",400,220);
  }
}
function player1(){
  redp  = createSprite(500,random(50,250),20,20);
  redp.addAnimation("redRunning",redimg);
  redp.addAnimation("redF",redFallen);
  redp.changeAnimation("redRunning",redimg);
  redp.scale=0.06; 
  redp.velocityX=-(4+2*distance/150);
  redPG.add(redp);
}
function player2(){
  pinkp  = createSprite(500,random(50,250),20,20);
  pinkp.addAnimation("pinkRunning",pinkimg);
  pinkp.addAnimation("pinkF",pinkFallen);
  pinkp.changeAnimation("pinkRunning",pinkimg);
  pinkp.scale=0.06;
  pinkp.velocityX=-(3+2*distance/150);
  pinkPG.add(pinkp);
}
function player3(){
  yellowp  = createSprite(500,random(50,250),20,20);
  yellowp.addAnimation("yellowRunning",yellowimg);
  yellowp.addAnimation("yellowF",yellowFallen);
  yellowp.changeAnimation("yellowRunning",yellowimg);
  yellowp.scale=0.06;
  yellowp.velocityX=-(2+2*distance/150);
  yellowPG.add(yellowp);
}

function players(){
  if (frameCount%160===0){
    var rand=Math.round(random(1,3));
  switch (rand){
    case 1:player1();
    break;
    case 2:player2();
    break;
    case 3:player3();
    break;  
  }
  }
  
}
function cones(){
  conee  = createSprite(500,random(50,250),20,20);
  conee.addImage(coneImg);
  conee.scale=0.06;
  conee.velocityX=-5;
  conePG.add(conee);
}
function nails(){
  nail  = createSprite(500,random(50,250),20,20);
  nail.addImage(nailImg);
  nail.scale=0.06;
  nail.velocityX=-5;
  nailPG.add(nail);
}
function holes(){
  hole  = createSprite(500,random(50,250),20,20);
  hole.addImage(holeImg);
  hole.scale=0.06;
  hole.velocityX=-5;
  holePG.add(hole);
}
function obstacle(){
  if (frameCount%180===0){
    var rand=Math.round(random(1,3));
  switch (rand){
    case 1:cones();
    break;
    case 2:nails();
    break;
    case 3:holes();
    break;  
  }
  }
}


function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  
  pinkPG.destroyEach();
  redPG.destroyEach();
  yellowPG.destroyEach();
  
  distance=0;
  
  conePG.destroyEach();
  nailPG.destroyEach();
  holePG.destroyEach();
  
  path.velocityX=-(5+2*distance/150);
}