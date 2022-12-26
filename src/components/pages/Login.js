import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Page = styled.div`
  border-radius: 20px;
  border: 1px solid #024298;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 25%;
  height: 50%;
  max-width: 500px;
  padding: 0 20px;

  left: 50%;
  transform: translate(-50%, 50%);

  background-color: white;

  overflow: hidden;
  flex-direction: column;
`;

const TitleWrap = styled.div`
  font-size: 20px;
  padding: 0 20px;
  font-weight: 700;
  color: black;
`;

const ContentWrap = styled.div`
  margin: top 26px;
  flex: 1;
`;

const InputWrap = styled.div`
  border-radius: 8px;
  padding: 10px;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #b5b5b5;
`;

const ErrorMessageWrap = styled.div`
  margin-top: 8px;
  color: red;
  font-size: 12px;
`;

const KeepLogin = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: 700;
  color: #b5b5b5;
`;

const MainLoginButton = styled.button`
  position: relative;
  left: 0;
  top: 50px;

  width: 100%;
  height: 40px;
  border: none;
  font-weight: 700;
  color: white;
  font-size: 15px;
  background-color: #024298;
  border-radius: 8px;
  cursor: pointer;
`;

const GoogleLoginButton = styled.button`
  position: relative;
  left: 0;
  top: 50px;

  /*  background-image: url(./assets/images/google_icon.png);
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 70px 10px;
  */

  border: 1px solid #828282;
  width: 100%;
  height: 40px;
  font-weight: 700;
  color: #828282;
  font-size: 15px;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
`;

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const regex = new RegExp(
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
  );

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
    <Page>
      <TitleWrap>
        <br />
        <br />
      </TitleWrap>

      <ContentWrap>
        <InputWrap>
          <input
            type="text"
            className="input"
            placeholder="아이디"
            value={id}
            onChange={handleId}
          />
        </InputWrap>
        <ErrorMessageWrap>
          {!idValid && id.length > 0 && <div>아이디를 입력해주세요.</div>}
        </ErrorMessageWrap>
        <InputWrap>
          <input
            type="password"
            className="input"
            placeholder="비밀번호"
            value={pw}
            onChange={handlePw}
          />
        </InputWrap>
        <ErrorMessageWrap>
          {!pwValid && pw.length > 0 && <div>비밀번호를 입력해주세요.</div>}
        </ErrorMessageWrap>

        <KeepLogin>로그인 상태 유지</KeepLogin>
      </ContentWrap>

      <div>
        <MainLoginButton>로그인</MainLoginButton>
      </div>
      <div style={{ marginTop: "10px" }}>
        <GoogleLoginButton>Google 로그인</GoogleLoginButton>
      </div>
    </Page>
  );
}
