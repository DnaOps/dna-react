import React from "react";

class Point {
  state = {
    x: 0,
    y: 0,
    cur: 0,
  };

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.fixedX = x;
    this.speed = 0.05;
    this.cur = 0;
    this.max = Math.random() * 100 + 100;
  }

  update() {
    this.cur += this.speed;
    this.x = this.fixedX + Math.sin(this.cur) * this.max;
  }
}

export default Point;
