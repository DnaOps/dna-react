import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

import searchSelectboxArrow from "../../assets/images/selectbox_arrow.png";
import loading from "../../assets/images/loading.png";
import noticeLikedIcon from "../../assets/images/notice_liked_icon.png";
import Header from "../organisms/Header";

import styled from "styled-components";
import { useEffect, useState } from "react";
import { getNotices } from "../../api/request";

const StyledWritePostButton = styled.div`
	width: 56px;
	height: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #024298;
	box-sizing: border-box;
	font-size: 12px;
	color: #fff;
	cursor: pointer;
`;

const WritePostButton = ({ type }) => {
	const navigate = useNavigate();
	const writePostOnClick = () => {
		navigate(`/${type}_post/write`);
	};
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "flex-end",
			}}
		>
			<StyledWritePostButton onClick={writePostOnClick}>
				글쓰기
			</StyledWritePostButton>
		</div>
	);
};

const Background = styled.div`
	width: 100%;
	height: 100vh;
	background: #e7e6f5;
	position: fixed;
	z-index: -1;
`;

const Container = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	padding: 73px 0;
	margin: 0 auto;
	overflow-y: scroll;
`;

const NoticeContainer = styled.div`
	width: 917px;
	min-height: 164px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	margin-bottom: 40px;
`;

const NoticeBlock = styled.div`
	min-width: 207px;
	height: 100%;
	display: flex;
	flex-direction: column;
	background: #024298;
	border: solid 3px #000;
	border-radius: 10px;
	box-sizing: border-box;
	padding: 7.5px 31px;
	margin: 0 30px 0 0;
	font-family: var(--jua-font);
	font-size: 25px;
	color: #fff;
	box-shadow: var(--box-shadow-deeper);
`;

const NoticeHeader = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
	background: #fff;
	box-sizing: border-box;
	padding: 33px 33px 20px 33px;
	box-shadow: var(--box-shadow);
`;

const NoticeHeaderTitle = styled.div`
	font-size: 40px;
	color: #024298;
	font-weight: 400;
`;

const NoticeHeaderTypo = styled.div`
	font-family: Noto Sans;
	font-size: 15px;
	color: #626262;
	font-weight: 400;
	text-align: right;
`;

const SearchBarContainer = styled.div`
	min-width: 500px;
	height: 34px;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	margin: 0 30px 30px;
`;

const SearchSelectBoxWrapper = styled.div`
	height: 34px;
	box-shadow: var(--box-shadow);
	overflow: hidden;
	transition: all ease-in-out 0.3s;
`;

const SearchSelectBox = styled.div`
	width: 155px;
	height: 34px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #f8f8ff;
	box-sizing: border-box;
	padding: 11px 11px 11px 18px;
	font-size: 15px;
	color: #828282;
	position: relative;
	cursor: pointer;
`;

const SearchSelectBoxDropDown = ({ onClick, selected }) => {
	const typos = ["제목", "내용", "작성자"];

	return (
		<>
			{typos.map((typo) => {
				return typo !== selected ? (
					<SearchSelectBox onClick={() => onClick(typo)}>
						{typo}
					</SearchSelectBox>
				) : null;
			})}
		</>
	);
};

const SearchSelectBoxArrow = styled.img`
	width: 13px;
	height: 8px;
`;

const SearchBar = styled.div`
	width: 330px;
	height: 100%;
	display: flex;
	box-shadow: var(--box-shadow);
`;

const SearchField = styled.input`
	width: 275px;
	height: 100%;
	border: none;
`;

const StyledSearchButton = styled.div`
	width: 55px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #024298;
	border: solid 1px #024298;
	font-size: 15px;
	color: #fff;
	cursor: pointer;
`;

const SearchButton = () => {
	return <StyledSearchButton>검색</StyledSearchButton>;
};

const NoticeList = styled.div`
	width: 917px;
	display: flex;
	flex-direction: column;
	border-top: 2.5px solid #024298;
	box-shadow: var(--box-shadow);
`;

const StyledNotice = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	background: #fff;
	border-bottom: solid 0.5px #c5c5c5;
	box-sizing: border-box;
	padding: 22px;
`;

const NoticeTitleContainer = styled.div`
	width: 492px;
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const NoticeTitle = styled.div`
	margin-right: 2px;
`;

const NoticeView = styled.div`
	color: #024298;
	font-weight: 700;
`;

const NoticeAuthorLevel = styled.div`
	border: solid 1px #024298;
	box-sizing: border-box;
	padding: 2px;
	margin-right: 8px;
	color: #024298;
	font-weight: 500;
`;

const NoticeAuthor = styled.div`
	width: 145px;
	cursor: pointer;
`;

const NoticeCreatedDate = styled.div`
	margin-right: 40px;
`;

const NoticeLiked = styled.div`
	color: #024298;
	font-weight: 700;
	margin-left: 6px;
`;

const Album = ({ noticeInfo, onClick }) => {
	console.log("notice info", noticeInfo);
	return (
		<StyledNotice onClick={() => onClick(noticeInfo.albumPostId)}>
			<NoticeTitleContainer>
				<NoticeTitle>{noticeInfo.title}</NoticeTitle>
				<NoticeView>{noticeInfo.commentCount}</NoticeView>
			</NoticeTitleContainer>
			<NoticeAuthorLevel>{noticeInfo.level}</NoticeAuthorLevel>
			<NoticeAuthor>{noticeInfo.author}</NoticeAuthor>
			<NoticeCreatedDate>{noticeInfo.modifiedAt}</NoticeCreatedDate>
			<img src={noticeLikedIcon} />
			<NoticeLiked>{noticeInfo.likeCount}</NoticeLiked>
		</StyledNotice>
	);
};

const StyledLoading = styled.div`
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
`;

const Loading = ({ inViewed, cnt }) => {
	const [ref, inView] = useInView();

	if (inView) {
		// console.log("refresh inviewed");
		// getNotices(noticeInfo, inViewed);
		// inViewed();
	}

	return (
		<StyledLoading ref={ref}>
			<img src={loading} />
		</StyledLoading>
	);
};

const AlbumList = ({ type }) => {
	const navigate = useNavigate();
	const noticeOnClick = (id) => {
		navigate(`/${type}/${id}`);
	};

	const [selected, setSelected] = useState("제목");
	const handleSelected = (typo) => {
		setSelected(typo);
		setSearchSelectboxClicked(false);
	};
	const [searchSelectboxClicked, setSearchSelectboxClicked] = useState(false);
	const searchSelectboxOnClick = () => {
		setSearchSelectboxClicked((prev) => !prev);
	};

	const [notices, setNotices] = useState([]);
	const handleNotices = (noticeList) => {
		setNotices(noticeList);
	};
	const [refreshCnt, setRefrshCnt] = useState(0);
	const handleRefreshInview = (noticeList) => {
		setRefrshCnt(refreshCnt + 1);
		setNotices([...notices, ...noticeList]);
	};

	useEffect(() => {
		// request first 13 notices
		// setNotices(res....);

		const token = localStorage.getItem("Authorization");
		if (!token) {
			alert("로그인이 필요합니다.");
			navigate("/login");
		}

		const initialNoticeInfo = {
			type: type,
			start: "",
			title: "",
			author: "",
			content: "",
		};

		getNotices(initialNoticeInfo, handleNotices);
	}, []);

	const selectBoxOpenedAnimation = {
		height: "102px",
	};

	const selectBoxClosedAnimation = {
		height: "34px",
	};

	return (
		<>
			<Background />
			<Header />
			<Container>
				<NoticeContainer>
					<NoticeBlock>앨범 게시판</NoticeBlock>
					<NoticeHeader>
						<NoticeHeaderTitle>앨범 게시판</NoticeHeaderTitle>
						<NoticeHeaderTypo>
							DNA 사진을 볼 수 있는 앨범입니다.
							<br />
							<br />
						</NoticeHeaderTypo>
					</NoticeHeader>
				</NoticeContainer>
				<div
					style={{
						display: "flex",
						alignItem: "center",
					}}
				>
					<SearchBarContainer>
						<SearchSelectBoxWrapper
							style={
								searchSelectboxClicked
									? selectBoxOpenedAnimation
									: selectBoxClosedAnimation
							}
						>
							<SearchSelectBox onClick={searchSelectboxOnClick}>
								{selected}
								<SearchSelectBoxArrow
									src={searchSelectboxArrow}
									style={{
										transform: searchSelectboxClicked ? "rotate(180deg)" : "",
									}}
								/>
							</SearchSelectBox>

							<SearchSelectBoxDropDown
								onClick={handleSelected}
								selected={selected}
							/>
						</SearchSelectBoxWrapper>
						<SearchBar>
							<SearchField />
							<SearchButton />
						</SearchBar>
					</SearchBarContainer>
					<WritePostButton type={type} />
				</div>
				<NoticeList>
					{notices.map((notice) => {
						notice.modifiedAt = notice.modifiedAt
							.substring(0, 10)
							.replaceAll("-", ".");
						return <Album noticeInfo={notice} onClick={noticeOnClick} />;
					})}
					<Loading inViewed={handleRefreshInview} cnt={refreshCnt} />
				</NoticeList>
			</Container>
		</>
	);
};

export default AlbumList;
