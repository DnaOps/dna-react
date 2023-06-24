import { createGlobalStyle } from "styled-components";

const KeyFrames = createGlobalStyle`

@keyframes inAnimation {
  0% {
    opacity: 0;
    display: none;
    margin-left: -25px;
  }
  100% {
    opacity: 1;
    display: initial;
  }
}

@keyframes outAnimation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
    margin-left: -25px;
  }
}

`;

export default KeyFrames;
