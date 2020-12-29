const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var player
var leftImg, rightImg;
var direction = "left";
var bg;
var loseImg;

function preload(){
  leftImg = loadImage("planeLeft.png");
  rightImg = loadImage("planeRight.png");
  bg = loadImage("spacebg.jpg");
  loseImg = loadImage("lose.png");

}
function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  
  player = new Plane(width/2,height/2);
  //roof = new Wall(400,height*0.1,500,height*0.03);
  //base = new Wall(400,0,100000,height * 0.3);
  //base = new Wall(400,height,100000,height*0.3);

  for(let i =1;i<500;i+=2){
    newWall(i*300+random(200,400),random(height*0.1,height*1),random(100,300),random(50,height/5))
  }
  for(let i =1;i<500;i+=2){
    newWall(i*500+random(200,400),50,random(height*0.1,height*0.3),random(height*0.05,height*0.15))
  }
}

function draw() {
  background(bg);  
  Engine.update(engine);
  
  player.display();
 drawWalls()
  drawSprites();
    camera.position.x = player.body.position.x;
  translate((camera.position.x - 30 + width/2),(camera.position.y - 30 + height/2))
 
}

function keyPressed(){
  
  if(keyCode ==37){
    move("left")
   }
  if(keyCode ==39){
    move("right")
  }
  if(keyCode ==38){  
    move("up")
  }
  
}
function move(pos){
  switch (pos) {
    case "left":
      Matter.Body.applyForce(player.body, player.body.position, {x:-25,y:0})
      player.changeImg(leftImg); 
      break;
    case "right":
      Matter.Body.applyForce(player.body, player.body.position, {x:25,y:0})     
      player.changeImg(rightImg); 
      break;
    case "up":
      if(player.body.velocity.y<5){
        Matter.Body.applyForce(player.body, player.body.position, {x:0,y:-50})
      }
      else if(player.body.velocity.y>5){
        Matter.Body.applyForce(player.body, player.body.position, {x:0,y:-30})
      }    
      break;  
  
    default:
      break;
  }
}

function lose(){
  if(player.isTouching(walls)){
    console.log("working");
    background(loseImg);
  }
}
