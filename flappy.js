let bird = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();
let road = new Image();
let back = new Image();

bird.src = "img/bird.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
road.src = "img/road.png";
back.src = "img/back.png";


let fly_audio = new Audio();
let score_audio = new Audio();
score_audio.volume = 0.1;

fly_audio.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

let canavas = document.getElementById("canvas");
let context = canavas.getContext("2d");

canavas.width = 256;
canavas.height = 512;

let posX = 10;
let posY = 150;
let velY = 0;
let gravity = 0.2;
let gap = 110;
let score = 0;

let pipe = [];
pipe[0] = {
    x: canavas.width,
    y: 0 
}
function reload (){
    posX = 10;
    posY = 150;
    velY = 0;
    gravity = 0.2;
    pipe = [];
    pipe[0] = {
        x: canavas.width,
        y: 0 
    }
}
function draw(){
    context.drawImage(back,0,0);
    context.drawImage(bird, posX,posY);
    
    if(posY >= canavas.height - road.height - bird.height || posY < 0){
        reload();
    }
    velY += gravity;
    posY += velY;
    
    for(let i = 0; i < pipe.length; i++){
        context.drawImage(pipeUp , pipe[i].x , pipe[i].y)
        context.drawImage(pipeBottom , pipe[i].x , pipe[i].y + pipeUp.height + gap)
        pipe[i].x -= 2;
        if(pipe[i].x == 80){
            pipe.push({
                x: canavas.width,
                y:Math.floor(Math.random()*pipeUp.height) - pipeUp.height
            })
        }
        if(pipe[i].x < -pipeUp.width){
            pipe.shift();
        }
        if(posX + bird.width >= pipe[i].x &&
            posX <= pipe[i].x + pipeUp.width &&
            (posY <= pipe[i].y + pipeUp.height ||
                posY + bird.height >= pipe[i].y + pipeUp.height + gap)){
            reload();
        }
        if(pipe[i].x <= posX){
            score_audio.play();
            score++;
        }
    }
    context.drawImage(road, 0, canavas.height - road.height);
}
canavas.addEventListener("mousedown", moveUp);
document.addEventListener("keyup", keyPressed);

function keyPressed(event) {
    if (event.keyCode === 32) {
        moveUp();
    }
}

function moveUp(){
    velY = -4;
    fly_audio.play();
}
setInterval(draw,20);