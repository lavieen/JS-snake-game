class Snake {
 constructor() {
  this.pos = {
   x: Math.floor(Math.random() * SIZE),
   y: Math.floor(Math.random() * SIZE)
  };
  this.vx = 1;
  this.vy = 0;
  this.length = 0;
  this.tail = [];
  this.tail[0] = {
   x: this.pos.x - 1,
   y: this.pos.y
  };
  $("#cell-" + this.pos.y + "-" + this.pos.x).addClass("head");
  $("#cell-" + this.tail[0].y + "-" + this.tail[0].x).addClass("tail");
 }

 update() {

  $("#cell-" + this.tail[0].y + "-" + this.tail[0].x).removeClass("tail");
  for (let i = 0; i < this.tail.length - 1; i++) {
   this.tail[i].x = this.tail[i + 1].x;
   this.tail[i].y = this.tail[i + 1].y;
  }
  this.tail[this.tail.length - 1].x = this.pos.x;
  this.tail[this.tail.length - 1].y = this.pos.y;
  $("#cell-" + this.tail[this.tail.length - 1].y + "-" + this.tail[this.tail.length - 1].x).addClass("tail");

  $("#cell-" + this.pos.y + "-" + this.pos.x).removeClass("head");
  this.pos.x += this.vx;
  this.pos.y += this.vy;
  $("#cell-" + this.pos.y + "-" + this.pos.x).addClass("head");
 }

 eat() {
  if (Math.abs(food.x - this.pos.x) + Math.abs(food.y - this.pos.y) == 0) {
   this.length++;
   fcell.removeClass("food");
   findFood();
   this.tail.push({
    x: this.pos.x,
    y: this.pos.y
   });
   $("#cell-" + this.tail[this.tail.length - 1].y + "-" + this.tail[this.tail.length - 1].x).addClass("tail");
   $("#cell-" + this.pos.y + "-" + this.pos.x).removeClass("head");
   this.pos.x += this.vx;
   this.pos.y += this.vy;
   $("#cell-" + this.pos.y + "-" + this.pos.x).addClass("head");

   return true;
  } else {
   return false;
  }
 }

 checkBoundary() {
  $("#cell-" + this.pos.y + "-" + this.pos.x).removeClass("head");
  if (this.pos.x + 1 > SIZE) {
   this.pos.x = 0;
  }
  if (this.pos.y + 1 > SIZE) {
   this.pos.y = 0;
  }
  if (this.pos.x < 0) {
   this.pos.x = SIZE - 1;
  }
  if (this.pos.y < 0) {
   this.pos.y = SIZE - 1;
  }
  $("#cell-" + this.pos.y + "-" + this.pos.x).addClass("head");
 }

 dir(x, y) {
  this.vx = x;
  this.vy = y;
 }

 death() {
  for (let t of this.tail) {
   if (t.x == this.pos.x && t.y == this.pos.y) {
    gameover();
   }
  }
 }

}