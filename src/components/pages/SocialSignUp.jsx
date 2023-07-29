import { useState } from "react";

import styled from "styled-components";

import phoneIcon from "../../assets/images/phone_icon.png";
import idIcon from "../../assets/images/id_icon.png";

import activatedPhoneIcon from "../../assets/images/activated_phone.png";
import activatedIdIcon from "../../assets/images/activated_id.png";

import WaveGroup from "../organisms/WaveGroup";

import InputContainer from "../organisms/InputContainer";
import CommunityButton from "../organisms/CommunityButton";
import ErrorMessage from "../organisms/ErrorMessage";
import SingUpBackGround from "../organisms/SignUpBackGround";
import { useNavigate, useParams } from "react-router-dom";
import { postSocialSignUp } from "../../api/request";

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const SignUpForm = styled.div`
	width: 300px;
	height: 250px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: #fff;
	border-radius: 20px;
	border: 1px solid #024298;
	box-sizing: border-box;
	padding: 45px 25px 25px 25px;
`;

const SocialSignUp = () => {
	const navigate = useNavigate();

	const { provider, providerId, email } = useParams();

	const [username, setUsername] = useState("");
	const [studentId, setStudentId] = useState("");

	const [isUsername, setIsUsername] = useState(false);
	const [isStudentId, setIsStudentId] = useState(false);

	const onChangeUsername = (e) => {
		setUsername(e.target.value);
		const usenameRegExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
		if (usenameRegExp.test(username)) {
			setIsUsername(true);
		} else {
			setIsUsername(false);
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
	];

	const handleSignUp = () => {
		const signUpData = {
			username: username,
			studentId: studentId,
			email: email,
			provider: provider,
			providerId: providerId,
		};
		postSocialSignUp(signUpData);
	};

	const validations = [
		!isUsername && username.length > 0,
		!isStudentId && studentId.length > 0,
	];
	const errorMessages = [
		"이름을 입력해주세요.",
		"학번 형식에 맞지 않습니다.",
		"이메일 형식에 맞지 않습니다.",
		"비밀번호는 8자리 이상, 영소문자, 대문자, 특수문자를 포함하여야 합니다.",
	];
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
				</div>
				<div>
					<CommunityButton
						typo="가입 요청"
						activated={username && studentId && isUsername && isStudentId}
						onClick={() => {
							handleSignUp();
							navigate("/login");
						}}
					/>
				</div>
			</SignUpForm>
			<WaveGroup />
		</Container>
	);
};

export default SocialSignUp;
