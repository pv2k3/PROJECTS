const canvas = document.getElementById('canvas1');

const ctx = canvas.getContext('2d');
// console.log(ctx);

const CANAVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = '../assets/shadow_dog.png';

const spriteWidth = 575;
const spriteHeight = 523;

let frameX = 0;
let frameY = 4;

let gameFrame = 0;
const staggerFrames = 4;
function animate(){

    ctx.clearRect(0, 0, CANAVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY*spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    requestAnimationFrame(animate);
    if(gameFrame % staggerFrames === 0){
        frameX = (frameX+1)%11;
    }
    gameFrame++;
}
animate();