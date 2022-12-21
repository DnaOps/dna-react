import React, { useRef, useEffect, useState } from "react";
import Wave from "../molecules/Wave";
import "../../index.css";

const WaveGroup = () => {
  const canvasRef = useRef(null);
  // const [stageWidth, setStageWidth] = useState(document.body.clientWidth * 2);
  // const [stageHeight, setStageHeight] = useState(
  //   document.body.clientHeight * 2
  // );
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const wave = new Wave();

    const animate = async () => {
      context.clearRect(
        0,
        0,
        document.body.clientWidth * 2,
        document.body.clientHeight * 2
      );

      wave.draw(context);

      window.requestAnimationFrame(animate);
    };

    window.addEventListener("resize", () => {
      // setStageWidth(document.body.clientWidth);
      // setStageHeight(document.body.clientHeight);

      canvas.width = document.body.clientWidth * 2;
      canvas.height = document.body.clientHeight * 2;

      context.scale(2, 2);

      wave.resize(document.body.clientWidth, document.body.clientHeight);
    });

    window.requestAnimationFrame(animate);
  }, []);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default WaveGroup;
