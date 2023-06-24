import Header from "../organisms/Header";

import styled from "styled-components";

import photoUploadImg from "../../assets/images/photo_upload.png";

import { postNotify } from "../../api/request";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #e7e6f5; // css variable로 변경
	box-sizing: border-box;
	padding: 40px 55px 360px 55px;
	overflow-y: scroll;
`;

const NoticeTypo = styled.div`
	width: 917px;
	display: flex;
	box-sizing: border-box;
	padding: 0 5px;
	font-size: 28px;
	color: #024298;
`;

const Notice = styled.div`
	width: 917px;
	background: #f8f8ff;
	border-top: solid 2.5px #024298;
	box-sizing: border-box;
	margin: 10px 0 0 0;
	padding: 100px 55px 60px 85px;
`;

const NoticeButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	box-sizing: border-box;
`;

const StyledNoticeButton = styled.div`
	width: 55px;
	height: 27px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	margin: 0 3.5px;
	font-size: 12px;
	color: #f8f8ff;
	cursor: pointer;
`;

const NoticeButton = ({ typo, background, onClick }) => {
	return (
		<StyledNoticeButton style={{ background: background }} onClick={onClick}>
			{typo}
		</StyledNoticeButton>
	);
};

const UpperContainer = styled.div`
	width: 917px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

const TitleInput = styled.input.attrs({
	placeholder: "제목",
	placeholderTextColor: "#B5B5B5",
})`
	width: 100%;
	background: transparent;
	border: none;
	border-bottom: solid 1px #b5b5b5;
	box-sizing: border-box;
	padding: 22px;
	margin: 0 0 20px 0;
	font-size: 32px;
`;

const ContentInput = styled.textarea.attrs({
	placeholder: "본문에 내용을 작성해주세요.",
	placeholderTextColor: "#B5B5B5",
})`
	width: 100%;
	height: 600px;
	background: transparent;
	border: none;
	outline: none;
	box-sizing: border-box;
	padding: 22px;
	resize: none;
	font-size: 16px;
`;

const FooterContainer = styled.div`
	border-top: solid 1px #b5b5b5;
`;

const StyledFooter = styled.div`
	width: 100%;
	font-size: 12px;
	color: #b5b5b5;
	font-weight: 600;
`;

const Footer = () => {
	return (
		<FooterContainer>
			<StyledFooter>위치 : 학생회관 2층 가장 안쪽</StyledFooter>
			<StyledFooter>
				저작자 : DNAOps - Dongguk Univ. Network User's Association, DevOps Silo
			</StyledFooter>
			<StyledFooter>Github : https://github.com/DnaOps</StyledFooter>
			<StyledFooter>Contact DNA for more information.</StyledFooter>
			<StyledFooter>ⓒ 2023. DNAOps all rights reserved.</StyledFooter>
		</FooterContainer>
	);
};

const PhotoUpload = styled.div`
	max-width: 200px;
	display: flex;
`;

const WritePost = ({ type }) => {
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};
	const handleContentChange = (e) => {
		setContent(e.target.value);
	};

	const applyOnClick = () => {
		postNotify(
			{
				title: title,
				content: content,
			},
			navigate(`/${type}_list`)
		);
	};
	const cancelOnclick = () => {
		navigate(`/${type}_list`);
	};

	const buttonInfo = [
		{ typo: "등록", background: "#024298", onClick: applyOnClick },
		{ typo: "취소", background: "#828282", onClick: cancelOnclick },
	];
	return (
		<>
			<Header />
			<Container>
				<UpperContainer>
					<PhotoUpload>
						<NoticeTypo>
							{type == "album" ? "사진 업로드" : "글쓰기"}
						</NoticeTypo>
						{type == "album" ? <img src={photoUploadImg} /> : null}
					</PhotoUpload>
					<NoticeButtonContainer>
						{buttonInfo.map((info) => (
							<NoticeButton
								key={info.typo}
								typo={info.typo}
								background={info.background}
								onClick={info.onClick}
							/>
						))}
					</NoticeButtonContainer>
				</UpperContainer>
				<Notice>
					<TitleInput onChange={handleTitleChange} />
					<ContentInput onChange={handleContentChange}></ContentInput>
					<Footer />
				</Notice>
			</Container>
		</>
	);
};

export default WritePost;
