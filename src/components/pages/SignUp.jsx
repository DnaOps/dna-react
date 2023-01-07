import React, { useState } from "react";
import styled from "styled-components";

import emailIcon from "../../assets/images/email_icon.png";
import phoneIcon from "../../assets/images/phone_icon.png";
import idIcon from "../../assets/images/id_icon.png";
import pwIcon from "../../assets/images/pw_icon.png";

import activatedEmailIcon from "../../assets/images/activated_email.png";
import activatedPhoneIcon from "../../assets/images/activated_phone.png";
import activatedIdIcon from "../../assets/images/activated_id.png";
import activatedPwIcon from "../../assets/images/activated_pw.png";

import WaveGroup from "../organisms/WaveGroup";

import InputContainer from "../organisms/InputContainer";
import CommunityButton from "../organisms/CommunityButton";
import ErrorMessage from "../organisms/ErrorMessage";
import SingUpBackGround from "../organisms/SignUpBackGround";


const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpForm = styled.div`
  width: 300px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #024298;
  box-sizing: border-box;
  padding: 45px 25px;
`;

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


export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const emailRegExp =
      /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (emailRegExp.test(email)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
    const phoneRegExp = /^(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/; // 하이픈(-) 제거

    if (phoneRegExp.test(phone)) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
  };

  const onChangeId = (e) => {
    setId(e.target.value);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (idRegExp.test(id)) {
      setIsId(true);
    } else {
      setIsId(false);
    }
  };

  const onChangePw = (e) => {
    setPw(e.target.value);
    const pwRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

    if (pwRegExp.test(pw)) {
      setIsPw(true);
    } else {
      setIsPw(false);
    }
  };

  const inputInfo = [
    {
      type: "text",
      placeholder: "이메일",
      src: { activated: activatedEmailIcon, non_activated: emailIcon },
      handle: onChangeEmail,
    },
    {
      type: "text",
      placeholder: "전화번호",
      src: { activated: activatedPhoneIcon, non_activated: phoneIcon },
      handle: onChangePhone,
    },
    {
      type: "text",
      placeholder: "아이디",
      src: { activated: activatedIdIcon, non_activated: idIcon },
      handle: onChangeId,
    },
    {
      type: "password",
      placeholder: "비밀번호",
      src: { activated: activatedPwIcon, non_activated: pwIcon },
      handle: onChangePw,
    },
  ];

  const linkTypo = ["로그인", "문의"];

  return (
    <Container>
      <SingUpBackGround />
      <SignUpForm>
        <div>
          <InputContainer inputInfo={inputInfo} />

          <ErrorMessage
            valid={!isEmail && email.length > 0}
            msg="이메일 형식에 맞지 않습니다."
          />
          <ErrorMessage
            valid={!isPhone && phone.length > 0}
            msg="전화번호 형식에 맞지 않습니다."
          />

          <ErrorMessage
            valid={!isId && id.length > 0}
            msg="아이디 형식에 맞지 않습니다."
          />
          <ErrorMessage
            valid={!isPw && pw.length > 0}
            msg="비밀번호는 8자리 이상, 영소문자, 대문자, 특수문자를 포함하여야 합니다."
          />
        </div>

        <div>
          <CommunityButton
            typo="가입 요청"
            activated={email && phone && id && pw && isEmail && isId && isPw}
          />
        </div>
      </SignUpForm>
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