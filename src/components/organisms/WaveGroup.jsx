import React, { useRef, useEffect, useState } from "react";
import Wave from "../molecules/Wave";
import "../../index.css";
import styled from "styled-components";

// const Background = styled.div`
//   width: 100%;
//   height: 100%;
//   background: #e7e6f5;
//   position: absolute;
//   z-index: -1;
// `;
class WaveGroupClass {
  constructor() {
    this.totalWave = 2;
    this.totalPoints = 4;
    this.color = ["#DCDAF9", "#b5b1e9"];

    this.waves = [];

    for (let i = 0; i < this.totalWave; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i]);
      this.waves[i] = wave;
    }
  }
}

const WaveGroup = () => {
  const canvasRef = useRef(null);
  const [stageWidth, setStageWidth] = useState(document.body.clientWidth * 2);
  const [stageHeight, setStageHeight] = useState(
    document.body.clientHeight * 2
  );

  const waveGroup = new WaveGroupClass();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const animate = () => {
      const stgWidth = 2 * document.body.clientWidth;
      const stgHeight = 2 * document.body.clientHeight;

      setStageWidth(stgWidth);
      setStageHeight(stgHeight);
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

    window.addEventListener("resize", () => {
      const stgWidth = 2 * document.body.clientWidth;
      const stgHeight = 2 * document.body.clientHeight;

      setStageWidth(stgWidth);
      setStageHeight(stgHeight);

      canvas.width = document.body.clientWidth * 2;
      canvas.height = document.body.clientHeight * 2;

      context.scale(2, 2);

      for (let i = 0; i < waveGroup.totalWave; i++) {
        waveGroup.waves[i].resize(stgWidth, stgHeight);
      }
    });

    window.requestAnimationFrame(animate);
  }, []);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      {/* <Background /> */}
    </>
  );
};

export default WaveGroup;
