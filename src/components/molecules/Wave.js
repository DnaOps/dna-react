import React from "react";
import Point from "../atoms/Point";

class Wave {
  state = {
    stageWidth: 0,
    stageHeight: 0,
    point: null,
  };

  constructor() {
    this.centerX = document.body.clientWidth / 2;
    this.centerY = document.body.clientHeight / 2;
    this.point = new Point(this.centerX, this.centerY);
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.init();
  }

  init() {
    this.point.update();
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = "#ff0000";

    this.point.update();

    console.log("point : " + this.point.x + " " + this.point.y);
    context.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
    context.fill();
  }
}

export default Wave;
