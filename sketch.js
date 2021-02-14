var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backGround;
var doraemon;
var doracake1, doracake2;
var track;
var train;
var coinSound;
var gameOverSound;
var score = 0;


function preload(){
backGroundImage = loadImage("street.png");
  trackImage = loadImage("track.png");
  trainImage = loadImage("train.png");
  doracake = loadImage("doracake.png");
  doraemonImage = loadImage("doraemon-2.png");
  coinSound = loadSound("collect.wav");
  gameOverSound = loadSound("game-over.wav");
  
  gameOverImage = loadImage("game-over.png");
  restartImage = loadImage("click_me.png");
}

function setup() 
{
  createCanvas(300, 400)
  
 backGround = createSprite(150, 200, 0, 0);
  backGround.addImage(backGroundImage);
  backGround.scale = 0.4;
  
  track = createSprite(75, 200);
  track.addImage(trackImage);
  track.scale = 1.5;
  
   track1 = createSprite(230, 200);
  track1.addImage(trackImage);
  track1.scale = 1.5; 
  
  doraemon =  createSprite(150, 300);
  doraemon.addImage(doraemonImage);
  doraemon.scale = 0.4;
  doraemon.setCollider("rectangle", 0, 0, 150, 200);
  
  gameOver = createSprite(150, 200);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.4; 
  
   restart = createSprite(150, 365);
  restart.addImage(restartImage);
  restart.scale = 0.5; 
  
  trainGroup = new Group();
  doracakeGroup = new Group();
  
}

function draw() {
  
 
  
  
  if(gameState === PLAY)
    {  
      doraemon.visible = true;
      
      gameOver.visible = false;
      restart.visible = false;
      
      if(doraemon.x<0)
        {
          doraemon.x = 150;
          doraemon.y = 300;
        }
      
    if( doraemon.x>400)
        {
          doraemon.x = 150;
          doraemon.y = 300;
        }
      
  if(keyDown("left"))
    {
      doraemon.x=doraemon.x-2;
    }
  
  if(keyDown("right"))
    {
      doraemon.x=doraemon.x+2;
    }
  if (frameCount%320===0)
    {
      doracake2 = createSprite(230 , 0);
  doracake2.addImage(doracake);
  doracake2.scale = 0.1;
      doracake2.setCollider("rectangle", 0, 0, 500, 350);
      doracake2.velocityY = (1+1*score/5);
      doracakeGroup.add(doracake2);
    }
  
  if (frameCount%740===0)
    {
      doracake1 = createSprite(75 , 0);
  doracake1.addImage(doracake);
  doracake1.scale = 0.1;
      doracake1.setCollider("rectangle", 0, 0, 500, 350);
      doracake1.velocityY = (1+1*score/5);
      doracakeGroup.add(doracake1);
    }
  
  if(frameCount%580===0)
    {
      train = createSprite(230, 0)
  train.addImage(trainImage);
  train.scale = 0.4;
        train.setCollider("rectangle", 0, 0, 150, 200);
  train.velocityY = (1+1*score/5);
      trainGroup.add(train);
    }
  
  if(frameCount%270===0)
    {
     train1 = createSprite(75, 0)
  train1.addImage(trainImage);
  train1.scale = 0.4;
       train1.setCollider("rectangle", 0, 0, 150, 200)
  train1.velocityY = (1+1*score/5);
      trainGroup.add(train1);
    }
  
  if(doracakeGroup.isTouching(doraemon))
    {
      score = score+1;
      doracakeGroup[0].destroy();
      coinSound.play();
    }
  if(trainGroup.isTouching(doraemon))
    {
      gameOverSound.play();
      gameState = END; 
    }
}
  
  if(mousePressedOver(restart))
    {
      reset();
    }
  
  if(gameState===END)
    {
      doraemon.visible = false;
      
      doracakeGroup.setVelocityYEach(0);
      doracakeGroup.destroyEach();
      trainGroup.setVelocityYEach(0);
      trainGroup.destroyEach();
      
      gameOver.visible = true;
      restart.visible = true;
    }
  
 drawSprites();
  textFont("Arial Black");
  textSize(20);
  fill("skyblue");
  text("DORACAKE =" + score,70, 30)
}

function reset()
{
  gameState = PLAY;
  score = 0;
}