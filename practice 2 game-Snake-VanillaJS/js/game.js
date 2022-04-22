const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const groundImg = new Image();
groundImg.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const box = 32; // width or heigth of little square
let score = 0;
let food = {
    x: Math.floor(Math.random()*17+1) * box,  // range need cells [1,17]
    y: Math.floor(Math.random()*15+3) * box // range need cells [1,15] (3 - offset from top)
}

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let dir = null; // direction

//draw objects in canvas
function drawGame(){
    // draw image
    ctx.drawImage(groundImg, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++){
        //draw square (part of snake body)
        //ctx.fillStyle = "green";
        ctx.fillStyle = i == 0 ? "green" : "red"; //snake head - green, body - red;
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    //move snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
        //eat food
        if(snakeX === food.x && snakeY === food.y){
            score++;
            //spawn new food
            food = {
                x: Math.floor(Math.random()*17+1) * box,
                y: Math.floor(Math.random()*15+3) * box 
            }
        }
        else{
            snake.pop();
        }
    if(snakeX < box || snakeX > box * 17 || snakeY < 3*box || snakeY > 17*box) clearInterval(gameId);
    if(dir==='l') snakeX -= box;
    if(dir==='r') snakeX += box;
    if(dir==='u') snakeY -= box;
    if(dir==='d') snakeY += box;
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    eatTail(newHead, snake);
    snake.unshift(newHead);
}

// check if head eat own tail
function eatTail(head, arr){
    for(let i = 0; i<arr.length; i++)
        if(head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(gameId);
}

document.addEventListener('keydown', e=>{ //function direction
    //if(e.keyCode) // deprecated
    if(e.code === 'ArrowLeft' && dir !== 'r')           dir = 'l';
    else if (e.code === 'ArrowUp' && dir !== 'd')       dir = 'u';
    else if (e.code === 'ArrowRight' && dir !== 'l')    dir = 'r';
    else if (e.code === 'ArrowDown' && dir !== 'u')     dir = 'd';
})

let gameId = setInterval(drawGame, 150);