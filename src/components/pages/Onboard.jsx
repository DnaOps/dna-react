import WaveGroup from "../organisms/WaveGroup.jsx";
import styled from "styled-components";

import onboardIcon from "../../assets/images/onboard_icon.png";
import donggukImg from "../../assets/images/dongguk.png";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardContainer = styled.div`
  display: flex;
`;

const StyledBoard = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px #000;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 0 28px;
  margin: 2px;
  font-family: Jua;
  color: #fff;
  font-size: 40px;
  font-weight: 700;
`;

const Board = ({ typo, color, element }) => {
  return (
    <StyledBoard style={{ background: color }}>
      {typo}
      {element}
    </StyledBoard>
  );
};

const DonggukImg = styled.img`
  box-sizing: border-box;
  margin: 4px -8px 0 20px;
`;

const OnboardIcon = styled.img`
  margin: 3px;
`;

const StyledDNAIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: 80px 0 -80px 0;
  text-align: center;
`;

const DNAIntroTypo = styled.div``;

const DNAIntroBlue = styled.span`
  color: #024298;
`;

const DNAIntro = () => {
  return (
    <StyledDNAIntro className="jua">
      <DNAIntroTypo>
        동국대학교 중앙동아리 <DNAIntroBlue>DNA</DNAIntroBlue>는 Dongguk Network
        Users'의 Association의 줄임말로
        <br />
        <DNAIntroBlue>컴퓨터</DNAIntroBlue>를 좋아하거나 배우고 싶은 사람들이
        모여 만든 <DNAIntroBlue>학술 동아리</DNAIntroBlue>입니다.
      </DNAIntroTypo>
      <EnterButton className="jua">Enter</EnterButton>
    </StyledDNAIntro>
  );
};

const EnterButton = styled.div`
  width: 90px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffcece;
  border: solid 3px #000;
  border-radius: 8px;
  box-sizing: border-box;
  margin: 12px 0 0 0;
  box-shadow: 5px 5px 5px #000;
  cursor: pointer;
`;

const Onboard = () => {
  return (
    <Container>
      <Board
        typo="Dongguk"
        color="#fab80a"
        element={<DonggukImg src={donggukImg} />}
      />
      <BoardContainer>
        <Board typo="Network" color="#024298" />
        <Board typo="Users'" color="#C5C5C5" />
      </BoardContainer>
      <BoardContainer>
        <Board typo="Association" color="#7BA4DA" />
        <OnboardIcon src={onboardIcon} />
      </BoardContainer>
      <DNAIntro />
      <WaveGroup />
    </Container>
  );
};

export default Onboard;
