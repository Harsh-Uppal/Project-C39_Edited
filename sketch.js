// JavaScript source code
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//All Variables
let CamX = 0, CamY = 0, player, gravity = -1, upArrawPressed = false,blocks = [],blockImg,frame = 0,isOver = false,isStarted = false,difficulty = 0;
let gameOVerIMg;

function setup() {

    createCanvas(1200, 700);

    engine = Engine.create();
    world = engine.world;

    //Give values to variables
    player = { posX: 100, posY: 00, image: loadImage("FlappyBird.png"), applyGravity: applyGravity };
    blockImg = loadImage("Block.bmp");
    gameOVerIMg = loadImage("GameOver.png");
}

function draw() {
    background("white");
    Engine.update(engine);

    if (isOver) {

        background("black");
        image(gameOVerIMg, 0, -200, 1200, 700);
        stroke("white");
        fill("white");
        textSize(100);
        textFont("Georgia");
        text("Your Score : " + frame, 280, 430);
        text("Press Space to play again", 40, 580);
    }
    else
    {
        if(!isStarted){
            rect(10,10,100,100);
            rect(110,10,100,100);
            rect(210,10,100,100);
            return;
        }
        
        applyGravity();
        displayPlayer();
        displayObstacles();

        if (frame % (200/difficulty) == 0) {
            createObstacles();
        }

        applyXGravity();

        if (checkForEnd()) {
            isOver = true;
        }

        if (frame % 4000 == 0) {
            LagProofing();
        }

        frame++;
    }
    
}

function keyPressed() {
    //catch key presses
    if (keyCode == 38 && !isOver && isStarted) {
        upArrawPressed = true;
    }
    else if (isOver && keyCode == 32) {
        isOver = false;
        frame = 0;
        player = { posX: 100, posY: 00, image: loadImage("FlappyBird.png"), applyGravity: applyGravity };
        gravity = -1;
        blocks = [];
    }
}

function applyGravity() {
    if (!upArrawPressed) {
        gravity++;
    }
    else {
        gravity = -1;
        gravity = -10;
        upArrawPressed = false;
    }

    player.posY += gravity;
}

function displayPlayer() {
    image(player.image, player.posX, player.posY, 40, 30);
}

function mousePressed(){
    if(mouseX > 9 && mouseX < 110)
    {
        if(isStarted)
            return;
        if(mouseY > 9 && mouseY < 110){
            difficulty = 1;
            isStarted = true;
        }
        else if(mouseY > 109 && mouseY < 210){
            difficulty = 2;
            isStarted = true;
        }
        else if(mouseY > 209 && mouseY < 310){
            difficulty = 3;
            isStarted = true;
        }
    }
}

function createObstacles() {
    var gapY = round(random(0, 30));
    var gapHeight = round(random(6, 18));

    for (var i = 0; i < gapY - gapHeight / 8;i++) {
        blocks[blocks.length] = {posY : i * 20,posX : 1200};
    }

    for (var i = gapY + gapHeight/2; i < 50; i++) {
        blocks[blocks.length] = {posY : i * 20,posX : 1200};
    }
}

function displayObstacles() {
    for (var i = 0; i < blocks.length; i++) {
        image(blockImg, blocks[i].posX, blocks[i].posY,20,20);
    }
}

function checkForEnd() {
    for (var i = 0; i < blocks.length; i++) {
        if (isTouching(player, blocks[i])) {
            return true;
        }
    }

    if (player.posY > 1000 || player.posY < -100) {
        return true;
    }

    return false;
}

function isTouching(b1, b2) {

    if (b1.posX + 10 > b2.posX && b1.posX - 10 < b2.posX) {
        if (b1.posY + 10 > b2.posY && b1.posY - 10 < b2.posY) {
            return true;
        }
    }

    return false;
}

function applyXGravity() {
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].posX-=5;
    }
}

function LagProofing() {
    var i = 0;

    while (i < blocks.length) {
        if (blocks[i].posX > -20 || blocks[i].posY < 1000) {
            break;
        }
        i++;
    }

    var newArray = [];

    for (var j = i; j < blocks.length; j++) {
        newArray[newArray.length] = blocks[j];
    }

    blocks = newArray;
}
