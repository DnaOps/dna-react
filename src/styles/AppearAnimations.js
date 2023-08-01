import { createGlobalStyle } from "styled-components";

const AppearAnimation = createGlobalStyle`

.From-Left {
  transform: translateX(-300%);
}

.From-Left-Active {
  transform: translateX(0);
}

.From-Right {
  transform: translateX(300%);
}

.From-Right-Active {
  transform: translateX(0);
}

.From-Up {
  transform: translateY(-200%);
}

.From-Up-Active {
  transform: translateY(0);
}

.From-Bottom {
  transform: translateY(150%);
}

.From-Bottom-Active {
  transform: translateX(0);
}

`;

export default AppearAnimation;
