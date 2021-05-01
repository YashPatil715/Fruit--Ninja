var PLAY = 1;
var END = 0;
var gameState = 1;
var sword;
var swordImage;
var fruit,monster;
var fruit1,fruit2,fruit3,fruit4;
var monsterImage;
var fruitGroup,enemyGroup;
var gameOverImage;
var knifeSwooshSound,gameoverSound
var score = 0;
function preload(){
monsterImage = loadAnimation("alien1.png","alien2.png");
gameOverImage = loadImage("gameover.png");  
swordImage = loadImage("sword.png");
fruit1 = loadImage("fruit1.png");
fruit2 = loadImage("fruit2.png");
fruit3 = loadImage("fruit3.png");
fruit4 = loadImage("fruit4.png");
knifeSwooshSound=loadSound("knifeSwooshSound.mp3")
gameoverSound=loadSound("gameover.mp3")
}
function setup(){
createCanvas(490,480);  
sword = createSprite(40,200,20,20);
sword.addImage(swordImage);
sword.scale=0.7
//sword.debug = true;
fruitGroup = createGroup();
enemyGroup = createGroup();
}



function draw(){
background("lightblue")
 sword.y = World.mouseY; 
  sword.x = World.mouseX;
 
  if(gameState===PLAY){
   if(fruitGroup.isTouching(sword)){
   fruitGroup.destroyEach();
   knifeSwooshSound.play();
    score = score+2;
   }
   fruits();
   Enemy();
    
  if(enemyGroup.isTouching(sword)){
     gameState = END;
     }
  }
  else if(gameState === END){
  gameoverSound.play();
  fruitGroup.setVelocityXEach(0); 
  enemyGroup.setVelocityXEach(0);
  fruitGroup.setLifetimeEach(-1);
  enemyGroup.setLifetimeEach(-1);
  sword.addImage(gameOverImage);
  sword.x=250;
  sword.y=200;
  }
  
  
  
  drawSprites();
text("Score:" + score,400,20)
}
function fruits(){
  if(World.frameCount%80===0){
  fruit=createSprite(400,200,20,20) 
  fruit.scale = 0.2;
  //fruit.debug = true;
  r=Math.round(random(1,4));
  if(r == 1){
  fruit.addImage(fruit1);
  } else if (r == 2){
  fruit.addImage(fruit2);
  } else if (r == 3){
  fruit.addImage(fruit3);
  }else if (r == 4){
  fruit.addImage(fruit4);
  }
  fruit.y = Math.round(random(50,340));           fruit.velocityX=-(7+(score/4));
  fruit.setLifeTime=100;           
  fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
  monster=createSprite(400,200,20,20);
  monster.addAnimation("moving",monsterImage);
  //monster.debug = true;
  monster.y=Math.round(random(100,300));
  monster.velocityX=-(8+(score/10));
  monster.setLifeTime=50;
  enemyGroup.add(monster);
  }
}




