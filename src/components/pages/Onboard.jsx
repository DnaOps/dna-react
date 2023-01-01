import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import onboardIcon from "../../assets/images/onboard_icon.png";
import donggukImg from "../../assets/images/dongguk.png";

import "../../index.css";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e7e6f5;
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
  transition: all 1s ease-in-out;
  font-family: Jua;
  color: #fff;
  font-size: 40px;
  font-weight: 700;
`;

const Board = ({ boardInfo }) => {
  const { ref, inView } = useInView();

  return (
    <StyledBoard
      ref={ref}
      style={{ background: boardInfo.color }}
      className={inView ? boardInfo.className + "-Active" : boardInfo.className}
      // inView 시 제자리로 돌아오는 애니메이션 적용되도록 From-(direction)-Active로 클래스명 변경
    >
      {boardInfo.typo}
      {boardInfo.element}
    </StyledBoard>
  );
};

const DonggukImg = styled.img`
  box-sizing: border-box;
  margin: 4px -8px 0 20px;
`;

const OnboardIcon = styled.img`
  margin: 3px;
  transition: all 1s ease-in-out;
`;

const StyledDNAIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: 80px 0 -80px 0;
  text-align: center;
  transition: all 1s ease-in-out;
`;

const DNAIntroTypo = styled.div``;

const DNAIntroBlue = styled.span`
  color: #024298;
`;

const DNAIntro = () => {
  const { ref, inView } = useInView();
  // inview animation에서 transition delay 값을 넣지 않는 경우 애니메이션이 적용되지 않는 듯 보일 수 있음

  const navigate = useNavigate();
  const handleClickEnter = () => {
    navigate("/login");
  };
  // 경로 설정: 라우팅 X

  return (
    <StyledDNAIntro
      ref={ref}
      className={inView ? "jua From-Bottom-Active" : "jua From-Bottom"}
    >
      <DNAIntroTypo>
        동국대학교 중앙동아리 <DNAIntroBlue>DNA</DNAIntroBlue>는 Dongguk Network
        Users'의 Association의 줄임말로
        <br />
        <DNAIntroBlue>컴퓨터</DNAIntroBlue>를 좋아하거나 배우고 싶은 사람들이
        모여 만든 <DNAIntroBlue>학술 동아리</DNAIntroBlue>입니다.
      </DNAIntroTypo>
      <EnterButton className="jua" onClick={handleClickEnter}>
        Enter
      </EnterButton>
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

// 4개의 보드가 갖는 텍스트, 색, 아이콘(선택), 애니메이션 적용을 위한 클래스명을 객체화 시커서 전달
const boardInfo = {
  dongguk: {
    typo: "Dongguk",
    color: "#fab80a",
    element: <DonggukImg src={donggukImg} />,
    className: "From-Up",
  },
  network: {
    typo: "Network",
    color: "#024298",
    element: null,
    className: "From-Left",
  },
  users: {
    typo: "Users'",
    color: "#C5C5C5",
    element: null,
    className: "From-Right",
  },
  association: {
    typo: "Association",
    color: "#7BA4DA",
    element: null,
    className: "From-Bottom",
  },
};

const Onboard = () => {
  const { ref, inView } = useInView();

  return (
    <Container>
      <Board boardInfo={boardInfo.dongguk} />
      <BoardContainer>
        <Board boardInfo={boardInfo.network} />
        <Board boardInfo={boardInfo.users} />
      </BoardContainer>
      <BoardContainer>
        <Board boardInfo={boardInfo.association} />
        <OnboardIcon
          ref={ref}
          className={inView ? "From-Bottom-Active" : "From-Bottom"}
          src={onboardIcon}
        />
      </BoardContainer>
      <DNAIntro />
    </Container>
  );
};

export default Onboard;
