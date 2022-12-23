import React, { useRef, useEffect, useState } from "react";
import Wave from "../molecules/Wave";
import "../../index.css";

class WaveGroupClass {
  constructor() {
    this.totalWave = 2;
    this.totalPoints = 5;
    this.color = ["#DCDAF9", "rgba(181, 177, 233, 0.5)"];
    // 투명도 조정

    this.waves = [];

    for (let i = 0; i < this.totalWave; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i]);
      this.waves[i] = wave;
    }
  }
}

const WaveGroup = () => {
  const canvasRef = useRef(null);

  const waveGroup = new WaveGroupClass();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resize = () => {
      const stgWidth = 2 * document.body.clientWidth;
      const stgHeight = 2 * document.body.clientHeight;

      canvas.width = document.body.clientWidth * 2;
      canvas.height = document.body.clientHeight * 2;

      context.scale(2, 2);

      for (let i = 0; i < waveGroup.totalWave; i++) {
        waveGroup.waves[i].resize(stgWidth, stgHeight);
      }
    };

    window.addEventListener("resize", resize);

    resize(); // dislay wave with rendering

    const animate = () => {
      const stgWidth = 2 * document.body.clientWidth;
      const stgHeight = 2 * document.body.clientHeight;

      context.clearRect(0, 0, stgWidth, stgHeight);

      // fill background
      context.rect(0, 0, stgWidth, stgHeight);
      context.fillStyle = "#E7E6F5";
      context.fill();

      context.beginPath();
      for (let i = 0; i < waveGroup.totalWave; i++) {
        waveGroup.waves[i].draw(context);
      }

      window.requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default WaveGroup;
