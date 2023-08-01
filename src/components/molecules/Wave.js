import React from "react";
import Point from "../atoms/Point";

class Wave {
	constructor(index, totalPoints, color) {
		this.index = index;
		this.totalPoints = totalPoints;
		this.color = color;

		this.centerX = document.body.clientWidth / 2;
		this.centerY = document.body.clientHeight / 2;
		this.points = [];

		this.init();
	}

	resize(stageWidth, stageHeight) {
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;

		this.centerX = stageWidth / 2;
		this.centerY = stageHeight / 2;

		this.pointGap = this.stageHeight / (2 * (this.totalPoints - 1));

		this.init();
	}

	init() {
		this.points = [];
		this.centerPoint = this.totalPoints / 2;
		for (let i = 0; i < this.totalPoints; i++) {
			const point = new Point(
				this.index + i,
				this.centerX / 2 + (i - this.centerPoint) * 80,
				// 축을 수직 -> 사선으로 변경
				this.pointGap * i
			);
			// index, x, y
			this.points[i] = point;
		}
	}

	draw(context) {
		context.beginPath();
		context.fillStyle = this.color;

		let prevX = this.points[0].x;
		let prevY = this.points[0].y;

		context.moveTo(prevX, prevY);

		for (let i = 1; i < this.totalPoints; i++) {
			if (i < this.totalPoints - 1) this.points[i].update();
			// 다른 동작과 update 함수의 범위 다름 주의

			const cx = (prevX + this.points[i].x) / 2;
			const cy = (prevY + this.points[i].y) / 2;

			context.quadraticCurveTo(prevX, prevY, cx, cy);

			prevX = this.points[i].x;
			prevY = this.points[i].y;
		}

		context.lineTo(prevX, prevY);
		context.lineTo(this.points[0].y, this.stageHeight);
		context.lineTo(0, 0);

		context.fill();
		context.closePath();
	}
}

export default Wave;
