import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoImg from "../../../src/assets/images/logo_img.png";
import logoText from "../../../src/assets/images/logo_text.png";
import menu from "../../../src/assets/images/menu.png";

import styled, { keyframes } from "styled-components";
<<<<<<< HEAD

const Container = styled.div`
  width: 100%;
  min-height: 48px;
=======
import { css } from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 53px;
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  border: solid 2.5px #024298;
  box-sizing: border-box;
  padding: 0 8px;
  position: absolute;
  z-index: 1;
<<<<<<< HEAD
=======
  overflow: hidden;
  transition: all ease-in-out 0.5s;
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  margin: 7px 8px 0 0;
`;

const LogoText = styled.img``;

const NavContainer = styled.div`
  width: 463px;
  min-height: 48px;
  display: flex;
  justify-content: space-between;
`;

const StyledNav = styled.div`
  width: 160px;
  min-height: 48px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

const DropDownDivider = styled.div`
  width: 1px;
  height: 166px;
  background: #024298;
  margin: 14px 0;
<<<<<<< HEAD
=======
  transition: all ease-in-out 0.5s;
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
`;

const MenuWrapper = styled.div`
  width: 143px;
`;

const Menu = styled.img`
  margin-left: 93px;
  cursor: pointer;
`;

const DropDownNavContainer = styled.div`
  height: 152px;
  overflow: hidden;
`;

<<<<<<< HEAD
const fadeInAnimation = keyframes`
0% {
  transform: translateY(-100%);
}

100% {
  transform: translateY(0);
}
`;

=======
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
const DropDownNav = styled.div`
  margin: 0 0 12px 0;
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;
<<<<<<< HEAD
  animation: ${fadeInAnimation} 0.4s ease;
=======
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
`;

const DropDownMenuWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 8px;
  margin-left: 28px;
`;

const DropDownMenuContainer = styled.div`
  margin: 12px 0;
`;

const DropDownMenu = styled.div`
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;
<<<<<<< HEAD
  animation: ${fadeInAnimation} 0.4s ease;
=======
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
`;

const UpperSpace = styled.div`
  height: 53px;
`;

<<<<<<< HEAD
const Nav = ({ typo, menuClicked, options }) => {
  return (
    <div>
      <StyledNav>{typo}</StyledNav>
      {menuClicked ? (
        <DropDownNavContainer>
          {options.map((option) => (
            <DropDownNav key={option}>{option}</DropDownNav>
          ))}
        </DropDownNavContainer>
      ) : null}
=======
const Nav = ({ typo, options }) => {
  return (
    <div>
      <StyledNav>{typo}</StyledNav>
      <DropDownNavContainer>
        {options.map((option) => (
          <DropDownNav key={option}>{option}</DropDownNav>
        ))}
      </DropDownNavContainer>
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();

  const navClickHandler = (Nav) => {
    switch (Nav) {
      // 수정 필요: 경로 임시 설정
      case "개요":
        navigate("/about");
        break;
      case "게시판":
        navigate("/board");
        break;
      default:
        console.log("err: invalid Nav");
    }
  };

  const [menuClicked, setMenuClicked] = useState(false);
  const menuClickHandler = () => {
    setMenuClicked((prev) => !prev);
  };

  const nav = ["개요", "게시판"];
  const navOptions = {
    개요: ["About us", "회칙"],
    게시판: ["공지사항", "자유게시판", "스터디 게시판", "앨범 게시판"],
  };

<<<<<<< HEAD
  return (
    <>
      <Container>
=======
  const menuOpenedAnimation = {
    height: "205px",
  };

  const menuClosedAnimation = {
    height: "53px",
  };

  const menuDividerAppear = {
    height: "166px",
  };
  const menuDividerDisappear = {
    height: "0px",
  };

  return (
    <>
      <Container
        style={menuClicked ? menuOpenedAnimation : menuClosedAnimation}
      >
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
        <LogoContainer>
          <LogoImg src={logoImg} />
          <LogoText src={logoText} />
        </LogoContainer>

        <NavContainer>
          {nav.map((t) => (
            <Nav
              key={t}
              typo={t}
<<<<<<< HEAD
              menuClicked={menuClicked}
=======
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
              options={navOptions[t]}
              onClick={() => {
                navClickHandler(t);
              }}
            />
          ))}
<<<<<<< HEAD
          {menuClicked ? <DropDownDivider /> : null}
          <MenuWrapper>
            <Menu src={menu} onClick={menuClickHandler} />
            {menuClicked ? (
              <DropDownMenuWrapper>
                <DropDownMenu>
                  <b>scorpion</b> 회원님
                </DropDownMenu>
                <DropDownMenuContainer>
                  <DropDownMenu>권한 : 관리자</DropDownMenu>
                  <DropDownMenu>게시글 수 : 10</DropDownMenu>
                  <DropDownMenu>댓글 수 : 10</DropDownMenu>
                </DropDownMenuContainer>
                <DropDownMenu>가입일시 : 2016.09.01</DropDownMenu>
              </DropDownMenuWrapper>
            ) : null}
=======
          <DropDownDivider
            style={menuClicked ? menuDividerAppear : menuDividerDisappear}
          />
          <MenuWrapper>
            <Menu src={menu} onClick={menuClickHandler} />

            <DropDownMenuWrapper>
              <DropDownMenu>
                <b>scorpion</b> 회원님
              </DropDownMenu>
              <DropDownMenuContainer>
                <DropDownMenu>권한 : 관리자</DropDownMenu>
                <DropDownMenu>게시글 수 : 10</DropDownMenu>
                <DropDownMenu>댓글 수 : 10</DropDownMenu>
              </DropDownMenuContainer>
              <DropDownMenu>가입일시 : 2016.09.01</DropDownMenu>
            </DropDownMenuWrapper>
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
          </MenuWrapper>
        </NavContainer>
      </Container>
      <UpperSpace />
    </>
  );
};

export default Header;
