import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { createGlobalStyle } from "styled-components";
import BmjuaOTF from "./assets/fonts/BMJUA_otf.otf";
import BmjuaTTF from "./assets/fonts/BMJUA_ttf.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: Noto-Sans;
  src: url();
}

@font-face {
  font-family: "Jua";
  font-weight: 700;
  src: url(${BmjuaOTF}) format("opentype"), url(${BmjuaTTF}) format("truetype");
}

:root {
  --jua-font: Jua;
  --box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  --box-shadow-deeper: 0 6px 6px rgba(0,0,0,0.26);
}

html {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Noto Sans KR", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

canvas {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
}

input:focus {
  outline:none;
}

.input {
  width: 100%;
  height: 40px;
  outline: none;
  border: none;
  font-size: 14px;
  font-weight: 400;
}

.input::placeholder {
  color: #b5b5b5;
}

.jua {
  font-family: Jua;
  font-size: 20px;
  font-weight: 400;
  line-height: 25px;
}

.enter-button :active {
  transform: translate(5px, 5px);
  box-shadow: none;
}

figure > img {
max-width: 757px;
}

p > img {
max-width: 757px;
}

`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<RecoilRoot>
		<BrowserRouter>
			<GlobalStyle />
			<App />
		</BrowserRouter>
	</RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
