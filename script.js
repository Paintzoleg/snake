let canvas = document.getElementById("game");

let ctx = canvas.getContext("2d");

let ground = new Image(); //immage field
ground.src = "img/field.jpg";

let foodImg = new Image(); //food icon
foodImg.src = "img/food.png";
let box = 32; //cize of cells

let score = 0; //count

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != "right") dir = "left";
  else if (event.keyCode == 38 && dir != "down") dir = "up";
  else if (event.keyCode == 39 && dir != "left") dir = "right";
  else if (event.keyCode == 40 && dir != "up") dir = "down";
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) clearInterval(game);
  }
}




function drowGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "#00c400" : "#00aa00";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.fillStyle = "white";
  ctx.font = "26px Arial";
  ctx.fillText(score, box * 2.3, box * 1.5);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    playAudio = new Audio("audio/bite.mp3");
    playAudio.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  // стоп игры на поляx
  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * box ||
    snakeY > box * 17
  ) {
    playAudio = new Audio("audio/bell.mp3");
    playAudio.play();
    clearInterval(game);
  }

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);


}

let game = setInterval(drowGame, 100);

// let btn = document.querySelector('.newgame');//яяяяяяяяяяяяяяяяя

let btn = document.querySelector(".newgame");
btn.onclick = reloadPage;

//!  anyKey.keydown= reloadPage;!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

document.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) window.location.reload();
});

function reloadPage() {
  window.location.reload();
}


