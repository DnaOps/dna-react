import React, { useState } from "react";
import styled from "styled-components";

import idIcon from "../../assets/images/id_icon.png";
import pwIcon from "../../assets/images/pw_icon.png";
import activatedIdIcon from "../../assets/images/activated_id.png";
import activatedPwIcon from "../../assets/images/activated_pw.png";

import checkIcon from "../../assets/images/check.png";
import activatedCheckIcon from "../../assets/images/activated_check.png";
import googleLogo from "../../assets/images/google_icon.png";

import WaveGroup from "../organisms/WaveGroup";

import InputContainer from "../organisms/InputContainer";
import CommunityButton from "../organisms/CommunityButton";
import ErrorMessage from "../organisms/ErrorMessage";

import axios from "axios";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.div`
  width: 300px;
  height: 334px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #024298;
  box-sizing: border-box;
  padding: 45px 25px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 12px;
`;

const StyledKeepLogin = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 3.5px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const KeepLogin = ({ keepLoginClicked, onClick }) => {
  return (
    <StyledKeepLogin
      style={{ color: keepLoginClicked ? "#024298" : "#b5b5b5" }}
    >
      <Icon
        src={keepLoginClicked ? activatedCheckIcon : checkIcon}
        onClick={onClick}
      />
      <span onClick={onClick}>로그인 상태 유지</span>
    </StyledKeepLogin>
  );
};

const StyledGoogleLoginButton = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #828282;
  border-radius: 8px;
  box-sizing: border-box;
  margin: 4px 0;
  color: #828282;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
  margin: 4px;
`;

const GoogleLoginButton = () => {
  return (
    <StyledGoogleLoginButton>
      <GoogleIcon src={googleLogo} />
      Google 로그인
    </StyledGoogleLoginButton>
  );
};

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 4px 0 0 0;
  font-size: 10px;
  color: #828282;
  font-weight: 400;
`;

const StyledLink = styled.div`
  box-sizing: border-box;
  margin: 0 3px;
  cursor: pointer;
`;

const Link = ({ typo }) => {
  return <StyledLink>{typo}</StyledLink>;
};

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const [keepLoginClicked, setKeepLoginClicked] = useState(false);
  const onClickKeepLogin = () => {
    setKeepLoginClicked((prev) => !prev);
  };

  const regex = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");
  // 정규 표현식 객체 생성

  const handleId = (e) => {
    setId(e.target.value);

    if (regex.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const handleLogin = () => {
    console.log("login clicked");
    const signInData = {
      email: id,
      password: pw,
    };
    console.log("sign in data: ", signInData);
    axios
      .post("http://localhost:8080/authenticate", signInData)
      .then((res) => {
        const jwt = res.data.data.jwt;
        console.log("res:", jwt);
        console.log("request sended");
        localStorage.setItem("Authorization", jwt.accessToken);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const inputInfo = [
    {
      type: "text",
      placeholder: "아이디",
      src: { activated: activatedIdIcon, non_activated: idIcon },
      handle: handleId,
    },
    {
      type: "password",
      placeholder: "비밀번호",
      src: { activated: activatedPwIcon, non_activated: pwIcon },
      handle: handlePw,
    },
  ];

  const linkTypo = ["회원가입", "아이디 찾기", "문의"];

  return (
    <Container>
      <LoginForm>
        <div>
          <InputContainer inputInfo={inputInfo} />

          <KeepLogin
            keepLoginClicked={keepLoginClicked}
            onClick={onClickKeepLogin}
          />

          <ErrorMessage
            valid={!idValid && id.length > 0}
            msg="아이디를 입력해주세요."
          />
          <ErrorMessage
            valid={!pwValid && pw.length > 0}
            msg="비밀번호를 입력해주세요."
          />
        </div>

        <div>
          <CommunityButton
            typo="로그인"
            activated={id && pw && idValid && pwValid}
            onClick={handleLogin}
          />
          <GoogleLoginButton />
        </div>
      </LoginForm>
      <LinkContainer>
        {linkTypo.map((item, index) => {
          return (
            <>
              <Link key={item} typo={item} />
              {index < linkTypo.length - 1 ? "|" : null}
            </>
          );
        })}
      </LinkContainer>
      <WaveGroup />
    </Container>
  );
}
