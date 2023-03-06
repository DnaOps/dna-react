import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoImg from "../../../src/assets/images/logo_img.png";
import logoText from "../../../src/assets/images/logo_text.png";
import menu from "../../../src/assets/images/menu.png";

import styled from "styled-components";

import { useRecoilValue } from "recoil";
import UserInfoState from "../../state/UserInfoState";

const Container = styled.div`
  width: 100%;
  height: 53px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  border: solid 2.5px #024298;
  box-sizing: border-box;
  padding: 0 8px;
  position: absolute;
  z-index: 1;

  overflow: hidden;
  transition: all ease-in-out 0.5s;
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
  transition: all ease-in-out 0.5s;
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

const StyledDropDownNav = styled.div`
  margin: 0 0 12px 0;
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;
`;

const DropDownNav = ({ option, url }) => {
  const navigate = useNavigate();
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <StyledDropDownNav
      key={option}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      style={{ textDecoration: mouseOver ? "underline" : null }}
      onClick={() => navigate(url)}
    >
      {option}
    </StyledDropDownNav>
  );
};

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
`;

const UpperSpace = styled.div`
  height: 53px;
`;

const Nav = ({ typo, options }) => {
  const navOnClick = {
    "About us": "/home",
    회칙: "/rule",
    공지사항: "/notify_list",
    자유게시판: "/board_list",
    "스터디 게시판": "/study_list",
    "앨범 게시판": "/album_list",
  };

  return (
    <div>
      <StyledNav>{typo}</StyledNav>
      <DropDownNavContainer>
        {options.map((option) => (
          <DropDownNav option={option} url={navOnClick[option]} />
        ))}
      </DropDownNavContainer>
    </div>
  );
};

const StyledNavToLogin = styled.div`
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const NavToLogin = () => {
  const [mouseOver, setMouseOver] = useState(false);

  const navigateLogin = useNavigate("login");

  const onClick = () => {
    navigateLogin("/login");
  };
  return (
    <StyledNavToLogin
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      onClick={onClick}
      style={{
        textDecoration: mouseOver ? "underline 1.7px" : "none",
      }}
    >
      로그인이 필요합니다.
    </StyledNavToLogin>
  );
};

const Header = () => {
  const navigate = useNavigate();

  const [menuClicked, setMenuClicked] = useState(false);
  const menuClickHandler = () => {
    setMenuClicked((prev) => !prev);
  };

  const nav = ["개요", "게시판"];
  const navOptions = {
    개요: ["About us", "회칙"],
    게시판: ["공지사항", "자유게시판", "스터디 게시판", "앨범 게시판"],
  };

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

  const userInfo = useRecoilValue(UserInfoState);

  return (
    <>
      <Container
        style={menuClicked ? menuOpenedAnimation : menuClosedAnimation}
      >
        <LogoContainer>
          <LogoImg src={logoImg} />
          <LogoText src={logoText} />
        </LogoContainer>

        <NavContainer onClick={menuClickHandler}>
          {nav.map((t) => (
            <Nav key={t} typo={t} options={navOptions[t]} />
          ))}
          <DropDownDivider
            style={menuClicked ? menuDividerAppear : menuDividerDisappear}
          />
          <MenuWrapper onClick={menuClickHandler}>
            <Menu src={menu} onClick={menuClickHandler} />

            <DropDownMenuWrapper>
              {userInfo.username ? (
                <>
                  <DropDownMenu>
                    <b>{userInfo.username}</b> 회원님
                  </DropDownMenu>
                  <DropDownMenuContainer>
                    <DropDownMenu>
                      권한 :&nbsp;
                      {userInfo.role == "USER_ROLE" ? "회원" : "관리자"}
                    </DropDownMenu>
                    <DropDownMenu>
                      게시글 수 : {userInfo.postCount}
                    </DropDownMenu>
                    <DropDownMenu>
                      댓글 수 : {userInfo.commentCount}
                    </DropDownMenu>
                  </DropDownMenuContainer>
                  <DropDownMenu>
                    가입일시 : {userInfo.createdDate.substring(0, 10)}
                  </DropDownMenu>
                </>
              ) : (
                <NavToLogin />
              )}
            </DropDownMenuWrapper>
          </MenuWrapper>
        </NavContainer>
      </Container>
      <UpperSpace />
    </>
  );
};

export default Header;
