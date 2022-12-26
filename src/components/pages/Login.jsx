import React, { useEffect, useState } from "react";
import styled from "styled-components";

import WaveGroup from "../organisms/WaveGroup";

import idIcon from "../../assets/images/id_icon.png";
import pwIcon from "../../assets/images/pw_icon.png";
import checkIcon from "../../assets/images/check.png";
import activatedCheckIcon from "../../assets/images/activated_check.png";
import googleLogo from "../../assets/images/google_icon.png";

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

const InputContainer = styled.div`
  box-sizing: border-box;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #b5b5b5;
`;

const InputDivider = styled.div`
  width: calc(100% + 24px);
  height: 1px;
  background: #b5b5b5;
  box-sizing: border-box;
  margin: 0 -12px;
`;

const InputSubWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 12px;
`;

const StyledKeepLogin = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 3.5px 15px;
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

const ErrorMessageWrapper = styled.div`
  margin-top: 3.5px;
  color: #a10c0c;
  font-size: 10px;
`;

const StyledComminityButton = styled.button`
  width: 100%;
  height: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  border-radius: 8px;
  box-sizing: border-box;
  margin: 4px 0;
`;

const CommunityButton = ({ typo, activated }) => {
  return (
    <StyledComminityButton
      style={{
        background: activated ? "#024298" : "#b5b5b5",
        border: activated ? "1px solid #024298" : "1px solid #b5b5b5",
        cursor: activated ? "pointer" : "",
      }}
    >
      {typo}
    </StyledComminityButton>
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

  const regex = new RegExp(
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
  );
  // 정규 표현식 객체 생성

  const LinkTypo = ["회원가입", "아이디 찾기", "문의"];

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

  return (
    <Container>
      <LoginForm>
        <div>
          <InputContainer>
            <InputSubWrapper>
              <Icon src={idIcon} />
              <input
                type="text"
                className="input"
                placeholder="아이디"
                onChange={handleId}
              />
            </InputSubWrapper>
            <InputDivider />
            <InputSubWrapper>
              <Icon src={pwIcon} />
              <input
                type="password"
                className="input"
                placeholder="비밀번호"
                onChange={handlePw}
              />
            </InputSubWrapper>
          </InputContainer>

          <KeepLogin
            keepLoginClicked={keepLoginClicked}
            onClick={onClickKeepLogin}
          />

          <ErrorMessageWrapper>
            {!idValid && id.length > 0 && <div>아이디를 입력해주세요.</div>}
          </ErrorMessageWrapper>
          <ErrorMessageWrapper>
            {idValid && !pwValid && pw.length > 0 && (
              <div>비밀번호를 입력해주세요.</div>
            )}
          </ErrorMessageWrapper>
        </div>

        <div>
          <CommunityButton typo="로그인" activated={idValid && pwValid} />
          <GoogleLoginButton />
        </div>
      </LoginForm>
      <LinkContainer>
        {LinkTypo.map((item, index) => {
          return (
            <>
              <Link key={item} typo={item} />{" "}
              {index < LinkTypo.length - 1 ? "|" : null}
            </>
          );
        })}
      </LinkContainer>
      <WaveGroup />
    </Container>
  );
}
