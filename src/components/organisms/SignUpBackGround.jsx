import styled from "styled-components";

import dnaIcon from "../../../src/assets/images/dna_icon.png";
import signUpImg from "../../../src/assets/images/signUp_img.png";


const DnaIcon = styled.img`
  position: absolute;
  top: 80px;
`;

const SignUpImg = styled.img`
  position: absolute;
  width: 316.63px;
  height: 282px;
  left: 70px;
  top: 443px;
`;

const SingUpBackGround = () => {
  return (
    <>
      <DnaIcon src={dnaIcon} />
      <SignUpImg src={signUpImg} />

    </>
  )
}

export default SingUpBackGround;
