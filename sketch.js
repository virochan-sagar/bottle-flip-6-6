var background1,backgroundimg,brushimg,bucketimg,soapimg,showerimg,bottleimg,handwashimg;

var obstraclesgroup;

var bottle1;

var invisibleground;

var score=0;

var PLAY=1, END=0,gamestate=1;

var stand;

function preload(){
  
  brushimg=loadImage("brush rack.png");
  bucketimg=loadImage("bucket.png");
  soapimg=loadImage("soap image.png");
  showerimg=loadImage("bathtub2.png");
  bottleimg=loadImage("bottle1.png");
  handwashimg=loadImage("handwash.png")
}
function setup() {
  createCanvas(1600,800);
  background1=createSprite(width/2, height-300, width, 10);
  //background1.addImage(backgroundimg);
  background1.x=background1.width/2;
 
  //background1.scale=6;
  obstraclesgroup=new Group();
   bottle1=createSprite(15,height-570,50,50);
  bottle1.addImage(bottleimg);
  bottle1.scale=0.2;

  invisibleground=createSprite(width/2,height-300,width,5);
  invisibleground.visible=false
  bottle1.debug=true;

  stand=createSprite(10,height-500,width/8,7)
  stand.velocityX=-1;
}

function draw() {
  background("pink");
  if(gamestate===PLAY){
    if(background1.x<0){
      background1.x=background1.width/2;
     
    }  
    score=score+Math.round(getFrameRate()/60)

    obstracles();

if(keyDown("space")){
  bottle1.velocityY=-7;
  //bottle1.velocityX=0;
}
bottle1.velocityY=bottle1.velocityY+0.5;

if(bottle1.isTouching(obstraclesgroup)){
  bottle1.velocityY=0;
 if(keyDown("space")){
  bottle1.velocityY=-7;
  //bottle1.velocityX=0;
} 
}
background1.velocityX=-6;
if(bottle1.isTouching(invisibleground)){
  gamestate=END;

}
  }

  
  else if(gamestate===END){
    background1.velocityX=0;
    obstraclesgroup.setVelocityXEach(0);
    obstraclesgroup.destroyEach(0);
    textSize(30);
    text("Game Over",width/2,height/2);
  }
 
  textSize(18);
  text("score= "+score,width-300,40);
  
  

//bottle1.collide(invisibleground);
bottle1.collide(stand);

  drawSprites();
}
function obstracles(){
  if(frameCount%100===0){
    var obstacle=createSprite(width,400,50,50);
    obstacle.velocityX=-4;
    var rand=Math.round(random(1,4));
    if(rand===1){

      obstacle.addImage(brushimg);
      obstacle.scale=0.4;
    }
    else if(rand===2){
      obstacle.addImage(bucketimg);
       obstacle.scale=0.4;
    }
    else if(rand===3){
      obstacle.addImage(soapimg);
    }
    else if(rand===4){
      obstacle.addImage(showerimg);
    }
    else{
      obstacle.addImage(handwashimg);
    }
    obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
    obstacle.debug=true;
obstraclesgroup.add(obstacle);
obstacle.depth=bottle1.depth
bottle1.depth=bottle1.depth+1
  }
  
}


