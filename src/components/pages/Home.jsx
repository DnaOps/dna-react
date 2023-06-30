import React from "react";
import Header from "../organisms/Header";
import styled from "styled-components";
import homeLogo from "../../assets/images/home_logo.png";
import boardNotifyIcon from "../../assets/images/board_notify_icon.png";
import boardForumIcon from "../../assets/images/board_forum_icon.png";
import boardStudyIcon from "../../assets/images/board_study_icon.png";
import boardAlbumIcon from "../../assets/images/board_album_icon.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #e7e6f5; // css variable로 변경
	box-sizing: border-box;
	padding: 60px 55px 360px 55px;
	overflow-y: scroll;
`;

const HomeTypo = styled.div`
	width: 70%;
	display: flex;
	box-sizing: border-box;
	padding: 0 5px;
	margin: 0 0 35px;
	font-size: 30px;
	font-weight: 700;
	color: #000000;
`;

const HomeLogoContainer = styled.div`
	width: auto;
	height: auto;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin: 50px;
`;

const HomeLogo = styled.img`
	margin: 10px 0 10px 0;
`;

const AboutDnaTypoContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

// justify-content: flex-end;
const AboutDnaTypoWrapper = styled.div`
	min-width: 230px;
	display: flex;
`;

const AboutDnaTypo = styled.div`
	font-family: "Noto Sans";
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
`;

const HomeListContainer = styled.div`
	width: auto;
	height: auto;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 50px;
`;

const BoardIcon = styled.img`
	margin: 10px;
	cursor: pointer;
`;

const Home = () => {
	const navigate = useNavigate();

	return (
		<>
			<Header />
			<Container>
				<HomeTypo>
					About <HomeTypo style={{ color: "#024298" }}>DNA</HomeTypo>
				</HomeTypo>
				<HomeLogoContainer>
					<AboutDnaTypoContainer>
						<AboutDnaTypoWrapper style={{ justifyContent: "flex-end" }}>
							<AboutDnaTypo>
								<b>1998년</b>
								<br /> 동국대학교 네트워크 사용자 모임(DNA) 결성
							</AboutDnaTypo>
						</AboutDnaTypoWrapper>

						<AboutDnaTypoWrapper style={{ justifyContent: "flex-end" }}>
							<AboutDnaTypo>
								<b>스터디</b>
								<br />
								컴퓨터공학 전공과 관련 여러 스터디를 매년 개최
							</AboutDnaTypo>
						</AboutDnaTypoWrapper>
					</AboutDnaTypoContainer>

					<HomeLogo src={homeLogo} />

					<AboutDnaTypoContainer>
						<AboutDnaTypoWrapper>
							<AboutDnaTypo>
								<b>대학 연합동아리 ULUG 참가</b>
								<br /> 고려대, 경희대, 단국대, 동국대, 서강대, 서울여대
								<br />
								숙명여대, 숭실대, 한국외대, 한양대가 참가하는
								<br />
								연합 동아리 소속
							</AboutDnaTypo>
						</AboutDnaTypoWrapper>
						<AboutDnaTypoWrapper>
							<AboutDnaTypo>
								<b>프로젝트</b>
								<br />
								프로젝트 개최를 위한 전폭적인 지원.
								<br />
								매년 동아리 창립제에 프로젝트 전시 및 사회에 나간
								<br />
								선배들과 교류
							</AboutDnaTypo>
						</AboutDnaTypoWrapper>
					</AboutDnaTypoContainer>
				</HomeLogoContainer>
				<HomeTypo style={{ marginTop: "80px" }}>게시판 목록</HomeTypo>
				<HomeListContainer>
					<BoardIcon
						onClick={() => {
							navigate("/notice_list");
						}}
						src={boardNotifyIcon}
					/>
					<BoardIcon
						onClick={() => {
							navigate("/forum_list");
						}}
						src={boardForumIcon}
					/>
					<BoardIcon
						onClick={() => {
							navigate("/study_list");
						}}
						src={boardStudyIcon}
					/>
					<BoardIcon
						onClick={() => {
							navigate("/album_list");
						}}
						src={boardAlbumIcon}
					/>
				</HomeListContainer>
			</Container>
		</>
	);
};

export default Home;
