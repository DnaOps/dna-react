import styled from "styled-components";

import Header from "../organisms/Header";
import Comment from "../organisms/Comment";
import RecommendComment from "../molecules/RecommendComment";
import ApplyButton from "../atoms/ApplyButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import likeButton from "../../assets/images/like_button.png";
import likeButtonActivated from "../../assets/images/like_activated_button.png";

import {
	getSpecificNotify,
	deleteNotify,
	postNotifyComment,
	postLike,
} from "../../api/request";
import { useRecoilValue, useSetRecoilState } from "recoil";
import UserInfoState from "../../state/UserInfoState";

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

const NoticeTitle = styled.div`
	font-size: 40px;
`;

const AuthorInfo = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	box-sizing: border-box;
	margin: 0 0 15px 0;
	padding: 0 20px;
`;

const AuthorLevel = styled.div`
	width: 20px;
	height: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1.5px solid #024298;
	border-radius: 2px;
	box-sizing: border-box;
	margin: 0 5px 0 0;
	font-size: 10px;
	color: #1e56a3;
	font-weight: 700;
`;

const AuthorTypo = styled.div`
	box-sizing: border-box;
	margin: -1px 0 0 0;
	font-size: 12px;
	color: #828282;
`;

const NoticeDivider = styled.div`
	width: 100%;
	height: 1px;
	background: #b5b5b5;
`;

const NoticeContent = styled.div`
	max-width: 917px;
	min-height: 230px;
	box-sizing: border-box;
	padding: 30px 20px;
`;

const SmallTypo = styled.div`
	font-size: 10px;
	color: #828282;
	cursor: pointer;
`;

const StyledEditDeleteButton = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	box-sizing: border-box;
	padding: 0 20px;
	margin: 10px 0;
`;

const EditDeleteButton = ({ editOnClick, deleteOnClick }) => {
	return (
		<StyledEditDeleteButton>
			<SmallTypo onClick={editOnClick}>수정</SmallTypo>
			<SmallTypo>&nbsp;|&nbsp;</SmallTypo>
			<SmallTypo onClick={deleteOnClick}>삭제</SmallTypo>
		</StyledEditDeleteButton>
	);
};

const RecommendCommentWrapper = styled.div`
	display: flex;
	box-sizing: border-box;
	margin: 0 0 0 20px;
`;

const NoticeButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	box-sizing: border-box;
	padding: 0 12px;
	margin: 0 0 35px 0;
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
		<StyledNoticeButton style={background} onClick={onClick}>
			{typo}
		</StyledNoticeButton>
	);
};

const CommentWrite = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding: 0 25px;
	margin: 0 0 10px 0;
`;

const CommentWriteTypo = styled.div`
	box-sizing: border-box;
	margin: 0 0 10px 0;
	font-size: 15px;
	font-weight: 700;
`;

const CommentWriteInput = styled.textarea`
	width: 100%;
	height: 72px;
	border: 0.5px solid #b5b5b5;
	box-sizing: border-box;
	padding: 10px;
	resize: none;
`;

const CommentContainer = styled.div`
	width: 717px;
	box-sizing: border-box;
	margin: 30px auto 0 auto;
`;

const StyledLikeButton = styled.img`
	width: 15px;
	height: 15px;
	box-sizing: border-box;
	margin: 10px 8px 0 -8px;
	cursor: pointer;
	filter: invert(12%) sepia(100%) saturate(4290%) hue-rotate(203deg)
		brightness(87%) contrast(111%);
`;

const LikeButton = ({ type, liked, id }) => {
	const [mouseOver, setMouseOver] = useState(false);
	const likeButtonOnClick = () => {
		postLike(type, id);
	};

	return (
		<StyledLikeButton
			src={liked || mouseOver ? likeButtonActivated : likeButton}
			onMouseOver={() => setMouseOver(true)}
			onMouseOut={() => setMouseOver(false)}
			onClick={likeButtonOnClick}
		/>
	);
};

const Notify = ({ type }) => {
	const navigate = useNavigate();
	const setRecoilUserInfo = useSetRecoilState(UserInfoState);
	const [userInfo, setUserInfo] = useState(useRecoilValue(UserInfoState));
	// const [currentType, setCurrentType] = useState(type);

	const grayButton = {
		background: "#828282",
	};

	const navyButton = {
		background: "#024298",
	};

	const listOnClick = () => {
		navigate(`/${type}_list`);
	};
	const writeOnClick = () => {
		navigate(`/${type}_post/write`);
	};
	const buttonInfo = [
		// onClick 추가
		{ typo: "목록", background: grayButton, onClick: listOnClick },
		{ typo: "글쓰기", background: navyButton, onClick: writeOnClick },
	];

	const [recommendComment, setRecommentComment] = useState({
		key1: "추천",
		val1: -1,
		key2: "댓글",
		val2: -1,
		isReply: false,
	});

	const [notifyInfo, setNotifyInfo] = useState({
		title: "",
		author: "",
		authorId: -1,
		commentCount: -1,
		likeCount: -1,
		level: -1,
		modifiedAt: "",
		content: "",
		isLikedByUser: false,
	});

	const handleNotifyInfo = (notifyInfo) => {
		const info = notifyInfo;
		setNotifyInfo(info);
		setRecommentComment({
			...recommendComment,
			val1: info.likeCount,
			val2: info.commentCount,
		});
	};

	const [comments, setComments] = useState([]);
	const handleComment = (commentList) => {
		setComments(commentList);
	};

	const deleteOnClick = (type, id) => {
		deleteNotify(type, id);
		navigate(`/${type}_list`);
	};

	const editOnClick = (path, param) => {
		navigate(path, { state: param });
	};

	const [commentContent, setCommentContent] = useState("");

	const handleCommentWrite = (event) => {
		setCommentContent(event.target.value);
	};

	const commentCallback = (type, id) => {
		getSpecificNotify(type, id, 0, handleNotifyInfo, handleComment);
	};

	const applyOnClick = (parentId) => {
		const commentData = {
			// noticeId: notifyInfo.noticeId,
			// parentCommentId: parentId,
			content: commentContent,
		};
		postNotifyComment(type, id, commentData, () => commentCallback(type, id));

		setCommentContent("");
	};

	const { id } = useParams();

	const userId = useRecoilValue(UserInfoState).userId;

	useEffect(() => {
		getSpecificNotify(type, id, 0, handleNotifyInfo, handleComment);
		if (!userInfo.username) {
			const recoveredInfo = JSON.parse(localStorage.getItem("userInfo"));
			setRecoilUserInfo(recoveredInfo);
			setUserInfo(recoveredInfo);
		}
	}, []);

	const typo = {
		notice: "공지사항",
		study: "스터디 게시판",
		board: "자유 게시판",
	};
	console.log(notifyInfo);

	return (
		<>
			<Header />
			<Container>
				<NoticeTypo>{typo[type]}</NoticeTypo>
				<Notice>
					<NoticeTitle>{notifyInfo?.title}</NoticeTitle>

					<AuthorInfo>
						<AuthorLevel>{notifyInfo?.level}</AuthorLevel>
						<AuthorTypo>{notifyInfo?.author}</AuthorTypo>
						<AuthorTypo>&nbsp;|&nbsp;</AuthorTypo>
						<AuthorTypo>
							{notifyInfo?.modifiedAt.substring(0, 10).replaceAll("-", ".")}
						</AuthorTypo>
					</AuthorInfo>

					<NoticeDivider />
					{type == "album" ? (
						<NoticeContent
							dangerouslySetInnerHTML={{ __html: notifyInfo?.content }}
						></NoticeContent>
					) : (
						<NoticeContent>{notifyInfo?.content}</NoticeContent>
					)}

					{userId == notifyInfo.authorId ? (
						<EditDeleteButton
							deleteOnClick={() => deleteOnClick(type, notifyInfo[`${type}Id`])}
							editOnClick={() => editOnClick(`/${type}_post/write`, notifyInfo)}
						/>
					) : null}

					<NoticeDivider />
					<RecommendCommentWrapper>
						<LikeButton type={type} liked={notifyInfo?.isLikedByUser} id={id} />
						<RecommendComment recommendComment={recommendComment} />
					</RecommendCommentWrapper>

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

					<CommentWrite>
						<CommentWriteTypo>댓글쓰기</CommentWriteTypo>
						<CommentWriteInput
							onChange={handleCommentWrite}
							value={commentContent}
						/>
						<ApplyButton onClick={applyOnClick} parentId={null} />
					</CommentWrite>

					<CommentContainer>
						{comments.map((commentInfo) => {
							return (
								<Comment
									commentInfo={commentInfo}
									type={type}
									id={id}
									tain
									callback={commentCallback}
								/>
							);
						})}
					</CommentContainer>
				</Notice>
			</Container>
		</>
	);
};

export default Notify;
