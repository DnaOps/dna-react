import styled from "styled-components";

import dnaIcon from "../../../src/assets/images/dna_icon.png";

const DnaIcon = styled.img`
  position: absolute;
  top: 80px;
`;

const SingUpBackGround = () => {
  return (
    <>
      <DnaIcon src={dnaIcon} />
    </>
  );
};

export default SingUpBackGround;
