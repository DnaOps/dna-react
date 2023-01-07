import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: Noto-Sans;
  src: url();
}

@font-face {
  font-family: "Jua";
  font-weight: 700;
  src: url("../assets/fonts/BMJUA_otf.otf") format("opentype"),
    url("../assets//fonts/BMJUA_ttf.ttf") format("truetype");
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

`;

export default GlobalStyle;
