import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoImg from "../../../src/assets/images/logo_img.png";
import logoText from "../../../src/assets/images/logo_text.png";
import menu from "../../../src/assets/images/menu.png";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 2.5px #024298;
  box-sizing: border-box;
  padding: 0 8px;
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
  width: 394px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.div`
  height: 20px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

const Menu = styled.img`
  cursor: pointer;
`;

const MenuDropDown = styled.div`
width: 100%;
height: 252px;
border: solid 2.5px #024298;
border-top: none;
`

// const DropDownNavContainer = styled.div`
// width:
// `

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

  return (
    <>
    <Container style={{borderBottom: menuClicked ? "transparent" : null}} >
      <LogoContainer>
        <LogoImg src={logoImg} />
        <LogoText src={logoText} />
      </LogoContainer>

      <NavContainer>
        {nav.map((t) => (
          <Nav
            onClick={() => {
              navClickHandler(t);
            }}
          >
            {t}
          </Nav>
        ))}
        <Menu src={menu} onClick={menuClickHandler} />
      </NavContainer>
      </Container>
      {menuClicked ? <MenuDropDown>menu drop down</MenuDropDown> : null}
    </>
  );
};

export default Header;
