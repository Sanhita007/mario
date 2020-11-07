var mario;
var brick;
var ground;
var star;
var mushroom;
var enemy;
var mysteryBox;
var marioImage,groundImage,brickImage,starImage
var bg
var starGroup;
var brickGroup;
var leftWall;
var rightWall;
var END=0
var PLAY=1
var gameState=PLAY;
function preload(){
  marioImage=loadAnimation("image/right1.jpg","image/right2.jpg","image/right3.jpg")
  brickImage=loadImage("image/brick.png")
  starImage=loadImage("image/Star.png")

bg=loadImage("image/background.png")
}
function setup() {
  createCanvas(800,400);

    ground=createSprite(120,340,300000,50);
    mario=createSprite(50,310,10,10);
    leftWall=createSprite(800,400,20,500)
    rightWall=createSprite(400,800,20,500)
    starGroup=new Group();
    brickGroup=new Group();
    mario.scale=0.1;
    ground.scale=0.1;
    ground.visible=false;
    leftWall.visible=false;
    rightWall.visible=false;
    ground.velocityX=-2;
    
   
}

function draw() {
  background(bg);
  mario.addAnimation("mario",marioImage);

  if(gameState===PLAY){
    spawnStars();
    spawnBrick();
    jump();

    mario.collide(rightWall);
    mario.collide(leftWall);

    if(keyDown(LEFT_ARROW)){
      mario.velocityX=-2
      mario.velocityY=0
      }
    if(keyDown(RIGHT_ARROW)){
        mario.velocityX=2
        mario.velocityY=0
        }
    if(brickGroup.isTouching(mario)){

      gameState=END;
    }

  }
  else if(gameState===END){

    mario.velocityY=0;
    brickGroup.destroyEach();
    starGroup.destroyEach();
    text("Game Over",200,200)

  }
 
  mario.collide(ground);   
  drawSprites();
}
function jump(){
  console.log(mario.y);
  if(keyDown("space")&& mario.y>=290){
  mario.velocityY=-12;
  }
 mario.velocityY=mario.velocityY+0.8
}
function spawnStars(){
  if (frameCount % 130 === 0) {
    star=createSprite(800,200);
    star.addImage("star",starImage)
    star.scale=0.06;
    star.y = Math.round(random(260,190));
    star.velocityX = -3;
    star.lifetime = 270;
    starGroup.add(star);
    
  }
}
function spawnBrick(){
  if (World.frameCount % 90 === 0) {
    brick=createSprite(800,200,10,10);
    brick.y = Math.round(random(200,250));
    brick.addImage("brick",brickImage)
    brick.scale=0.2;
    brick.velocityX = -3;
    brick.lifetime = 270;
    brickGroup.add(brick);

  }
}