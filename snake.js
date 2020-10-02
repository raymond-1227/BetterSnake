const BG_COLOUR = '#f2f2f2';
const SNAKE_COLOUR = '#3b3b3b';
const FOOD_COLOUR = '#cf6679';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.height = 500;

const FR = 10;
const S = 20;
const T = canvas.width / S;

let pos, vel, food, snake;

function init(){
  pos = {x: 0, y: 0};
  vel = {x: 0, y: 0};

  snake = [{x: 0, y: 0}]

  randomFood();
}

init();

function randomFood(){
  food = {
    x: Math.floor(Math.random() * T),
    y: Math.floor(Math.random() * T),
  }

  for (let cell of snake) {
    if(cell.x === food.x && food.y === cell.y) {
      return randomFood();
    }
  }
}

document.addEventListener('keydown', keydown);

function keydown(e){
  switch(e.keyCode) {
    case 37: {
      return vel = {x: -1, y: 0}
    }
    case 38: {
      return vel = {x: 0, y: -1}
    }
    case 39: {
      return vel = {x: 1, y: 0}
    }
    case 40: {
      return vel = {x: 0, y: 1}
    }
  }
}

setInterval(() => {
  requestAnimationFrame(gameLoop);
}, 1000 /FR);

function gameLoop(){
  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = SNAKE_COLOUR;
  for (let cell of snake) {
    ctx.fillRect(cell.x*S, cell.y*S, S,S);
  }

  ctx.fillStyle = FOOD_COLOUR;
  ctx.fillRect(food.x*S,food.y*S,S,S);

  pos.x += vel.x;
  pos.y += vel.y;

  if (pos.x < 0) {
    pos.x = T
  }

  if (pos.x > T) {
    pos.x = 0
  }

  if (pos.y < 0) {
    pos.y = T
  }

  if (pos.y > T) {
    pos.y = 0
  }

  if (food.x === pos.x && food.y === pos.y) {
    snake.push({...pos});
    pos.x += vel.x;
    pos.y += vel.y;
    randomFood();
  }

  if (vel.x || vel.y) {
    snake.push({...pos});
    snake.shift();
  }
}