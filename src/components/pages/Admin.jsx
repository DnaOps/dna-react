import styled from "styled-components";

import Header from "../organisms/Header";
import { useState } from "react";
import { useEffect } from "react";
import { getUnverifiedUsers, postVerifyUser } from "../../api/request";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #e7e6f5; // css variable로 변경
	box-sizing: border-box;
	padding: 40px 55px 55px 55px;
	overflow-y: scroll;
`;

const DNATypo = styled.div`
	width: 917px;
	display: flex;
	color: #024298;
	font-size: 30px;
	font-weight: 700;
`;

const SignUpRequestContainer = styled.div`
	width: 862px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border: solid 1px #ddd;
`;

const SignUpRequestDivider = styled.div`
	width: 100%;
	height: 1px;
	background: #ddd;
`;

const StyledSignUpRequest = styled.div`
	width: 100%;
	height: 158px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	background: #fff;
	box-sizing: border-box;
	padding: 13px;
`;

const SignUpRequestInfoContainer = styled.div`
	width: 408px;
	display: flex;
	box-sizing: border-box;
	margin: 9px 0;
`;

const SignUpRequestInfo = styled.div`
	width: 204px;
	height: 58px;
	font-weight: 700;
`;

const SignUpRequest = ({ req, remove }) => {
	return (
		<StyledSignUpRequest>
			<div>
				<SignUpRequestInfoContainer>
					<SignUpRequestInfo>
						이메일
						<br />
						{req.email}
					</SignUpRequestInfo>
					<SignUpRequestInfo></SignUpRequestInfo>
				</SignUpRequestInfoContainer>
				<SignUpRequestInfoContainer>
					<SignUpRequestInfo>
						학번
						<br />
						{req.studentId}
					</SignUpRequestInfo>
					<SignUpRequestInfo>
						닉네임
						<br />
						{req.username}
					</SignUpRequestInfo>
				</SignUpRequestInfoContainer>
			</div>
			<AdminButtonContainer>
				<AdminButton
					color="#024298"
					typo="확인"
					onClick={() => {
						postVerifyUser(req.userId);
						remove(req.userId);
					}}
				/>
				<AdminButton
					color="#b5b5b5"
					typo="거절"
					onClick={() => remove(req.userId)}
				/>
			</AdminButtonContainer>
		</StyledSignUpRequest>
	);
};

const AdminButtonContainer = styled.div`
	display: flex;
`;

const StyledAdminButton = styled.div`
	width: 62px;
	height: 29px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	box-sizing: border-box;
	margin: 0 3.5px;
	color: #fff;
	cursor: pointer;
`;

const AdminButton = ({ typo, color, onClick }) => {
	return (
		<StyledAdminButton onClick={onClick} style={{ background: color }}>
			{typo}
		</StyledAdminButton>
	);
};

const Admin = () => {
	const [request, setRequest] = useState([]);
	const handleRequest = (data) => {
		setRequest(data);
	};
	const removeRequest = (userId) => {
		setRequest(request.filter((e) => e.userId != userId));
	};
	useEffect(() => {
		getUnverifiedUsers(handleRequest);
	}, []);
	return (
		<>
			<Header />
			<Container>
				<DNATypo>
					DNA &nbsp; <div style={{ color: "#000" }}>Admin</div>
				</DNATypo>
				<SignUpRequestContainer>
					<SignUpRequestDivider />
					{request.map((req) => (
						<>
							<SignUpRequest req={req} remove={removeRequest} />
							<SignUpRequestDivider />
						</>
					))}
				</SignUpRequestContainer>
			</Container>
		</>
	);
};

export default Admin;
