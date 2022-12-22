import React from "react";

class Point {
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedX = x;
    this.speed = 0.05;
    this.cur = index;
    this.max = Math.random() * 100 + 100;
  }

  update() {
    this.cur += this.speed;
    this.x = this.fixedX + Math.sin(this.cur) * this.max;
  }
}

export default Point;
