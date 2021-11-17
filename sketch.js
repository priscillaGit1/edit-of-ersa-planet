var ground;
var path,ATBImg;
var gameState = 2;
var atb;
var player;
var toolBoxScore = 0;
var screwScore = 0;
var lives = 3;
var shootingStars = 3;
var score = 0;
var end =0
var resetB

function preload(){
backgroundImg = loadImage("ersa.jpg")
screwImg = loadImage("screw.png");
obst1Img = loadImage("obst3.png");
obst2Img = loadImage("obst2.png");
monster1Img = loadImage("monst1.png");
monster2Img = loadImage("monst2.png");
toolBoxImg = loadImage("toolBox.png")
spaceImg = loadImage("space2.jpg")
spaceShipImg = loadImage("spaceShip.png");
ast1Img = loadImage("ast1.png")
ast2Img = loadImage("ast2.png")
ufoImg = loadImage("ufo.png")
meteorImg = loadImage("meteor.png")
applaudImg = loadImage("applauds.jpg")

}

function setup() {
  createCanvas(1350,650);
  
  
  path=createSprite(1300,250,500,650); 
  path.addImage(backgroundImg); 
  path.scale = 4.5;
  //path.velocityX = -5;

 // atb= createSprite(650,500,100,100);

  player= createSprite(500,500,30,30);

  invisibleG = createSprite(0,675,1350,50);
 
  
toolG = new Group();
obst1G = new Group();
obst2G = new Group();
obst3G = new Group();
obst4G = new Group();
obst5G = new Group();
obst6G = new Group();
screwG = new Group();
obst7G = new Group();






}




function draw() {
  background(0);
  
  drawSprites();
  
  player.setCollider("rectangle",0,0,200,200);
  player.debug = true


if(gameState===0){
  fill("black")

  rect(0,0,1350,650)
  fill("white")
  //stroke("white")
  textSize(25);
  text("Welcome to 'Lost in Space'!!!", 500,50)
  fill("lightblue")
  textSize(18);
  text("A new planet called Ersa has been discovered. It got the name Ersa because scientists after observations believe that this planet though deserted had dew drops.",10,100)
  
  fill("white")
  text("Astera was sent to find and collect information new planet. She was successful. However now she is stuck there due to a crash.", 50,140)
  text("You are the chosen one to help Astera come out of this planet.", 50,170)
  
  fill("lightpink")
  text("There are 2 stages.",10,210)
  textSize(16)
  text("1st- You have to collect 5 screws, 2 tool boxes and not let the obstacles and aliens hurt Astera. This will fix the broken spaceship and take Ersa outside the planet",30,240)
  text("2nd- You will have to defend Ersa from the asteroids, comets and attack them using missiles. ",30,260)

  textAlign("center")

  textSize(20)
  fill("lightgreen")
  text("You have 3 shooting stars to use to save your life (3 lives)", 650, 300 )
  text("If you successfully pass these 2 stages, you have accomplished the mission!!! Astera would be forever thankful to you!",650,330)
 
  textSize(18)
  fill("magenta")
  text("Astera can be controlled using up arrow and down arrow. To launch a missile, press on 'a' key.",650, 370)

  textSize(20)
  fill("white")
  text("PRESS ON SPACE KEY TO START",650, 410)

  textSize(50)
  fill("red")
  text("All the best!!",650, 500)

  if (keyDown("space")&& player.y>=500){
    gameState = 1;
    player.velocityY= -1;
  }
  


}





if (gameState===1){
  path.velocityX = -5;

  if (path.x<0){
    path.x = width/2
  }


 player.y = player.y+1 
player.collide(invisibleG);


if(toolBoxScore<2){
  tools();
}


if(screwScore<5){
  screw1();
}


  // keyPressed();
  obstI()
  obstII()
  obstIII()

stroke("lightblue")
fill("lightblue")
textSize(18)
text("ToolBox:"+toolBoxScore+"/2",1000,100)
text("Screws:"+screwScore+"/5",1000,130)

textSize(20)
stroke("red")
fill("red")
text("lives:"+lives,100,100)



if (player.isTouching(toolG)){
  toolBoxScore = toolBoxScore+1
  toolG.destroyEach();
}

if(player.isTouching(screwG)){
  screwScore = screwScore+1
  screwG.destroyEach();
}

if(player.isTouching(obst1G)||player.isTouching(obst2G)||player.isTouching(obst3G)){
  lives = lives-1
  obst1G.destroyEach();
  obst2G.destroyEach();
  obst3G.destroyEach();

}

if(toolBoxScore===2&&screwScore===5){
   gameState = 2;
  }

  if(lives===0){
  gameState = 4;
  }


}
 

// gameState-2(space)
if(gameState===2){
  path.addImage(spaceImg)
  path.scale = 3.5;


  path.velocityX = -(5+2*score/1000);
  
 

 score = score+Math.round(frameCount/300);

  keyPressed();
  obstIV();
  obstV();
  obstVI();
  obstVII();
 
  if (path.x<0){
    path.x = width/2
  }

  player.addImage(spaceShipImg)
  player.scale = 0.4
  player.x = 200;

 fill("white") 
 text("Shooting-stars="+shootingStars,100,100);
 text("Score="+score,100,150)

 if(player.isTouching(obst4G)||player.isTouching(obst5G)||player.isTouching(obst6G)||player.isTouching(obst7G)){
  shootingStars = shootingStars-1
  obst4G.destroyEach();
  obst5G.destroyEach();
  obst6G.destroyEach();
  obst7G.destroyEach();
}

if(shootingStars===0){
  gameState = 4;
  }

if (score===5000){
  gameState= 3
}


}  


if(gameState===3){
  fill("black")
  textSize(25)
  text("YAY!!!You did it!Astera reached earth safe and sound because of you!!",300,300)
  won();  
  player.destroy();


}

 if(gameState===4){
    // reset();
    text("Oops!You lost! But you must ry again! Press 'r' to play again",100,300);
    
    if(keyDown("Space")){

      console.log("pressed")
    gameState = 1;
   // path.addImage(backgroundImg)
    }
}

console.log("gamestate:"+gameState)
}

function screw1(){
  if(frameCount%400===0){
    var screw = createSprite(1350,Math.round(random(400,550)),30,30);
    screw.addImage(screwImg);
    screw.scale = 0.15;
    screw.velocityX = -4
    screw.lifetime = 1000;
    screwG.add(screw);
  }
}

function tools(){
  if(frameCount%500===0){
    var toolB = createSprite(1350,Math.round(random(400,550)),30,30);
    toolB.addImage(toolBoxImg);
    toolB.scale = 0.19;
    toolB.velocityX = -4
    toolB.lifetime = 1000;
    toolG.add(toolB)
  }
}
 

function keyPressed(){

  if(keyDown(UP_ARROW)){
    player.y = player.y-5;
  }

  if(keyDown(DOWN_ARROW)){
    player.y = player.y+5;
  }

}

function obstI(){
  if(frameCount%200===0){
    var obst1 = createSprite(1500,Math.round(random(100,550)),30,30);
    obst1.addImage(monster1Img);
    obst1.scale = 0.5;
    obst1.velocityX = -5
    obst1.lifetime = 1000;
    obst1G.add(obst1);
  }
}


function obstII(){
  if(frameCount%150===0){
    var obst2 = createSprite(1350,Math.round(random(400,550)),30,30);
    obst2.addImage(obst2Img);
    obst2.scale =  0.2;
    obst2.velocityX = -4
    obst2.lifetime = 1000;
    obst2G.add(obst2);

  }
}

function obstIII(){
  if(frameCount%180===0){
    var obst3 = createSprite(1500,Math.round(random(200,550)),30,30);
    obst3.addImage(monster2Img);
    obst3.scale =  0.2;
    obst3.velocityX = -6
    obst3.lifetime = 1000;
    obst3G.add(obst3);

  }
}

function obstVI(){
  if(frameCount%190===0){
    var obst6 = createSprite(1000,Math.round(random(0,100)),30,30);
    obst6.addImage(meteorImg);
    obst6.scale = 0.3;
    obst6.velocityX = -10
    obst6.velocityY = 10
    obst6.lifetime = 1000;
    obst6G.add(obst6);
  }
}

function obstIV(){
  if(frameCount%211===0){
    var obst4 = createSprite(Math.round(random(500,1350)),0,30,30);
    obst4.addImage(ast1Img);
    obst4.scale = 0.2;
    obst4.velocityX = -15
    obst4.velocityY = 8
    obst4.lifetime = 1000;
    obst4G.add(obst4);
    
  }
}

function obstV(){
  if(frameCount%200===0){
    var obst5 = createSprite(1500,Math.round(random(50,650)),30,30);
    obst5.addImage(ast2Img);
    obst5.scale = 0.2;
    obst5.velocityX = -18
    obst5.lifetime = 1000;
    obst5G.add(obst5);
    
  }
}

function obstVII(){
  if(frameCount%300===0){
    var obst7 = createSprite(1500,Math.round(random(100,550)),30,30);
    obst7.addImage(ufoImg);
    obst7.scale = 0.08;
    obst7.velocityX = -20
    obst7.lifetime = 1000;
    obst7G.add(obst7);
    
  }
}

function reset(){
  
  toolG.destroyEach();
  screwG.destroyEach();
  obst1G.destroyEach();
  obst2G.destroyEach();
  obst3G.destroyEach();
  obst4G.destroyEach();
  obst5G.destroyEach();
  obst6G.destroyEach();
  obst7G.destroyEach();

  
  path.velocityX = 0;
  //player.destroy();

 screwScore = 0
 toolBoxScore = 0

}

function won(){
  path.addImage(applaudImg);
  path.x = 675
  path.y = 250
  path.scale = 2.5
  path.velocityX = 0;
  
  
  toolG.destroyEach();
  screwG.destroyEach();
  obst1G.destroyEach();
  obst2G.destroyEach();
  obst3G.destroyEach();
  obst4G.destroyEach();
  obst5G.destroyEach();
  obst6G.destroyEach();
  obst7G.destroyEach();


}