const SIZE = 25;
let snake;
let sID;
let started = false;
let food;
let fcell;

$(document).ready(function () {
  setUpMaze();
});

function setUpMaze() {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      let $cell = $("<div>", {
        class: "cell",
        id: "cell-" + i + "-" + j,
      });
      $(".Maze").append($cell);
    }
  }
  snake = new Snake();
  findFood();
}

function play() {
  if (!snake.eat()) {
    snake.update();
  }
  snake.checkBoundary();
  $(".result").text(snake.length);
  snake.death();
}

function findFood() {
  do {
    food = {
      x: Math.floor(Math.random() * SIZE),
      y: Math.floor(Math.random() * SIZE),
    };
    fcell = $("#cell-" + food.y + "-" + food.x);
  } while (fcell.hasClass("tail") || fcell.hasClass("head"));

  fcell.addClass("food");
}

$(document).keydown(function (e) {
  console.log(e.which);
  switch (e.which) {
    case 32: // pause ther game
      if (started) stop();
      else startGame();
      break;
    case 39: // left
      if (snake.vx != -1) {
        snake.dir(1, 0);
      }
      break;

    case 38: // up
      if (snake.vy != 1) {
        snake.dir(0, -1);
      }
      break;

    case 37: // right
      if (snake.vx != 1) {
        snake.dir(-1, 0);
      }
      break;

    case 40: // down
      if (snake.vy != -1) {
        snake.dir(0, 1);
      }
      break;

    default:
      return;
  }
  e.preventDefault();
});

function startGame() {
  sID = setInterval(play, 100);
  $(".start").addClass("hidden");
  $(".stop").removeClass("hidden");
  started = true;
}

function stop() {
  clearInterval(sID);
  $(".stop").addClass("hidden");
  $(".start").removeClass("hidden");
  started = false;
}

function gameover() {
  stop();
  $(".reload").removeClass("hidden");
  $(".start").addClass("hidden");
  $(".result").addClass("hidden");
  $(".Maze *").remove();
  $("#title").text("Game Over your score is " + snake.length);
}

$(".start").click(startGame);

$(".stop").click(() => {
  stop();
});

$(".reload").click(() => {
  $(".Maze *").remove();
  setUpMaze();
  $(".start").removeClass("hidden");
  $(".result").removeClass("hidden");
  $(".reload").addClass("hidden");
  $("#title").text("SNAKE GAME");
  $(".result").text(0);
});
