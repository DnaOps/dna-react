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

import { postSignUp, postSocialSignUp } from "../../api/request";
import { useNavigate } from "react-router-dom";

import googleLogo from "../../assets/images/google_icon.png";
import naverLogo from "../../assets/images/naver_logo.png";

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const SignUpForm = styled.div`
	width: 300px;
	min-height: 385px;
	max-height: 445px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: #fff;
	border-radius: 20px;
	border: 1px solid #024298;
	box-sizing: border-box;
	padding: 45px 25px 25px 25px;
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
	const navigate = useNavigate();
	const path = typo === "로그인" ? "/login" : "";
	const linkOnClick = () => {
		navigate(path);
	};
	return <StyledLink onClick={linkOnClick}>{typo}</StyledLink>;
};

const StyledConfirmMessage = styled.div`
	margin-top: 3.5px;
	color: #024298;
	font-size: 10px;
`;

const PwComfirmMessage = ({ valid, msg, pwValid }) => {
	return (
		<StyledConfirmMessage>
			{valid ? (
				<div>{msg}</div>
			) : pwValid ? (
				<div style={{ color: "#a10c0c" }}>
					{"비밀번호가 일치하지 않습니다."}
				</div>
			) : null}
		</StyledConfirmMessage>
	);
};

const StyledGoogleSignUpButton = styled.div`
	width: 300px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	border: 1px solid #828282;
	border-radius: 8px;
	box-sizing: border-box;
	margin: 24px 0 4px 0;
	color: #828282;
	font-size: 15px;
	font-weight: 700;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	cursor: pointer;
`;

const GoogleIcon = styled.img`
	width: 20px;
	height: 20px;
	margin: 4px;
`;

const GoogleSignUpButton = ({ onClick }) => {
	return (
		<StyledGoogleSignUpButton onClick={onClick}>
			<GoogleIcon src={googleLogo} />
			Google로 회원가입
		</StyledGoogleSignUpButton>
	);
};

const StyledNaverSignUpButton = styled.div`
	width: 300px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #2db400;
	border: 1px solid #2db400;
	border-radius: 8px;
	box-sizing: border-box;
	margin: 4px 0;
	color: #fff;
	font-size: 15px;
	font-weight: 700;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	cursor: pointer;
`;

const NaverIcon = styled.img`
	width: 40px;
	height: 40px;
	/* margin: 4px; */
`;

const NaverSignUpButton = ({ onClick }) => {
	return (
		<StyledNaverSignUpButton onClick={onClick}>
			<NaverIcon src={naverLogo} />
			<a
				href="http://54.144.153.88:8080/oauth2/authorization/naver"
				style={{ textDecoration: "none", color: "#fff" }}
			>
				NAVER로 회원가입
			</a>
		</StyledNaverSignUpButton>
	);
};

export default function SignUp() {
	const [username, setUsername] = useState("");
	const [studentId, setStudentId] = useState("");
	const [email, setEmail] = useState("");
	const [pw, setPw] = useState("");
	const [pwConfirm, setPwComfirm] = useState("");

	const [isUsername, setIsUsername] = useState(false);
	const [isStudentId, setIsStudentId] = useState(false);
	const [isEmail, setIsEmail] = useState(false);
	const [isPw, setIsPw] = useState(false);
	const [isPwConfirm, setIsPwComfirm] = useState(false);

	const navigate = useNavigate();

	const onChangeUsername = (e) => {
		setUsername(e.target.value);
		const usenameRegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
		if (usenameRegExp.test(username)) {
			setIsUsername(true);
		} else {
			setIsUsername(false);
		}
	};

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
		const emailRegExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		if (emailRegExp.test(email)) {
			setIsEmail(true);
		} else {
			setIsEmail(false);
		}
	};

	const onChangeStudentId = (e) => {
		setStudentId(e.target.value);
		const studentIdRegExp = /^([0123456789])([0-9]{8,})$/;

		if (studentIdRegExp.test(studentId)) {
			setIsStudentId(true);
		} else {
			setIsStudentId(false);
		}
	};

	const onChangePw = (e) => {
		setPw(e.target.value);
		const pwRegExp = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;

		if (pwRegExp.test(pw)) {
			setIsPw(true);
		} else {
			setIsPw(false);
		}
	};

	const onChangePwConfirm = (e) => {
		const currentPwConfirm = e.target.value;
		setPwComfirm(currentPwConfirm);

		if (pw !== currentPwConfirm) {
			setIsPwComfirm(false);
		} else {
			setIsPwComfirm(true);
		}
	};

	const inputInfo = [
		{
			type: "text",
			placeholder: "이름",
			src: { activated: activatedIdIcon, non_activated: idIcon },
			handle: onChangeUsername,
		},
		{
			type: "text",
			placeholder: "학번",
			src: { activated: activatedPhoneIcon, non_activated: phoneIcon },
			handle: onChangeStudentId,
		},
		{
			type: "text",
			placeholder: "이메일",
			src: { activated: activatedEmailIcon, non_activated: emailIcon },
			handle: onChangeEmail,
		},
		{
			type: "password",
			placeholder: "비밀번호",
			src: { activated: activatedPwIcon, non_activated: pwIcon },
			handle: onChangePw,
		},
		{
			type: "password",
			placeholder: "비밀번호 확인",
			src: { activated: activatedPwIcon, non_activated: pwIcon },
			handle: onChangePwConfirm,
		},
	];

	const linkTypo = ["로그인", "문의"];

	const handleSignUp = () => {
		const signUpData = {
			username: username,
			studentId: studentId,
			email: email,
			password: pw,
		};
		console.log("sign up clicked");
		postSignUp(signUpData);
	};

	const validations = [
		!isUsername && username.length > 0,
		!isStudentId && studentId.length > 0,
		!isEmail && email.length > 0,
		!isPw && pw.length > 0,
	];
	const errorMessages = [
		"이름을 입력해주세요.",
		"학번 형식에 맞지 않습니다.",
		"이메일 형식에 맞지 않습니다.",
		"비밀번호는 8자리 이상, 영소문자, 대문자, 특수문자를 포함하여야 합니다.",
	];

	const handleGoogle = () => {
		const signUpData = {
			type: "google",
			username: username,
			studentId: studentId,
			email: email,
			password: pw,
		};
		postSocialSignUp(signUpData);
	};
	const handleNaver = () => {
		const signUpData = {
			type: "naver",
			username: username,
			studentId: studentId,
			email: email,
			password: pw,
		};
		postSocialSignUp(signUpData);
	};

	return (
		<Container>
			<SingUpBackGround />
			<SignUpForm>
				<div>
					<InputContainer inputInfo={inputInfo} />

					{validations.map((validation, index) => (
						<ErrorMessage
							key={index}
							valid={
								validations
									.slice(0, index)
									.every((current) => current === false) && validation
							}
							msg={errorMessages[index]}
						/>
					))}

					<PwComfirmMessage
						valid={isPwConfirm && pw.length > 0}
						pwValid={isPw && pw.length > 0}
						msg="비밀번호가 일치합니다."
					/>
					<ErrorMessage
						valid={!isPwConfirm && pwConfirm.length > 1}
						msg="비밀번호가 일치하지 않습니다."
					/>
				</div>

				<div>
					<CommunityButton
						typo="가입 요청"
						activated={
							username &&
							studentId &&
							email &&
							pw &&
							pwConfirm &&
							isUsername &&
							isStudentId &&
							isEmail &&
							isPw &&
							isPwConfirm
						}
						onClick={() => {
							handleSignUp();
							navigate("/login");
						}}
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

			<GoogleSignUpButton onClick={handleGoogle} />
			<NaverSignUpButton onClick={handleNaver} />
			<WaveGroup />
		</Container>
	);
}
