var knife;
var knife1;
var PLAY=1;
var END=0;
var gameState=1;
var fruitGroup,enemyGroup;
var fruit1 , monster, fruit2,fruit3, fruit4 ;
var score=0


function preload(){
  knife=loadImage("sword.png")
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  
  monsterImage=loadAnimation("alien1.png","alien2.png")
  gameOverImage = loadImage("gameover.png")
  
  knifesound=loadSound("knifeSwooshSound.mp3")

  gameover=loadSound("gameover.mp3")
}
function setup(){
  createCanvas(windowWidth,windowHeight)
  
  knife1=createSprite(300,750)
  knife1.addImage(knife);
  knife1.scale=0.8
  
  fruitGroup=new Group()
  enemyGroup=new Group()
}

function draw() {
  background("lightblue");
  knife1.x=World.mouseX
  knife1.y=World.mouseY

  if(gameState===PLAY){
  fruits();
enemy();
if(fruitGroup.isTouching(knife1)){

  fruitGroup.destroyEach();
  score=score+2;
  knifesound.play()

}
else 
  {
 if(enemyGroup.isTouching(knife1)){
   
      gameState=END;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
     fruitGroup.setVelocityYEach(0);
   enemyGroup.setVelocityYEach(0);
  knife1.addImage(gameOverImage);
      knife1.x=300;
      knife1.y=700;
   gameover.play()
 
 }
  }
}
  fruits();
  drawSprites();
  enemy();
  textSize(20)
  fill("red")
  text("score = "+ score ,width/2,height-600)     
               
}

function fruits(){
  if(World.frameCount%80===0){
  fruit=createSprite(400,200,20,20)
 fruit.scale=0.2
    r=Math.round(random(1,4))
      if(r==1){
        fruit.addImage(fruit1)
      }else if (r==2){
        fruit.addImage(fruit2)
      }else if(r==3){
        fruit.addImage(fruit3)
      }else if(r==4){
        fruit.addImage(fruit4)
      }
    fruit.x=Math.round(random(180,900))
    fruit.velocityY=10
    fruit.setLifetime=100
    fruitGroup.add(fruit)
    position=Math.round(random(1,2))
    if (position==1){
      fruit.x=400
       if(score>4){
      fruit.velocityY=(10+2)
    }
    }
     if (position==2){
       if(score>10){
      monster.velocityY=15
      console.log(monster.velocityY)
    }
     }
    
   }
}

function enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20)
    monster.addAnimation("moving",monsterImage);
    monster.x=Math.round(random(100,800));
    monster.velocityY=12
    monster.setLifetime=80 
    enemyGroup.add(monster)
  }
}

