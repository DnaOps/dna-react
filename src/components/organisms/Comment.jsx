import { useState } from "react";

import styled from "styled-components";

import Reply from "./Reply";
import RecommendComment from "../molecules/RecommendComment";
import ReplyDropDown from "../molecules/ReplyDropDown";
import CommentInfo from "../molecules/CommentInfo";
import { postNotifyComment } from "../../api/request";

const ReplyContainer = styled.div`
	width: 100%;
`;

const StyledComment = styled.div`
	margin-top: 25px;
`;

const Comment = ({ commentInfo, type, id, callback }) => {
	const [replyClicked, setReplyClicked] = useState(false);
	const replyOnClick = () => {
		setReplyClicked((prev) => !prev);
	};
	const [recommendComment, setRecommentComment] = useState({
		key1: "추천",
		val1: -1,
		key2: "답글",
		val2: -1,
		isReply: true,
	});

	const childrenComments = commentInfo.childrenComments;

	const [reply, setReply] = useState("");
	const handleReplyChange = (e) => {
		setReply(e.target.value);
	};
	const handleReply = () => {
		const postReplyDTO = {
			content: reply,
			commentGroupId: commentInfo.commentGroupId,
			parentCommentId: commentInfo.commentId,
		};
		postNotifyComment(type, id, postReplyDTO, () => callback(type, id));
	};

	return (
		<StyledComment>
			<CommentInfo commentInfo={commentInfo} />

			<RecommendComment
				recommendComment={{ ...recommendComment, val1: commentInfo.likeCount }}
				onClick={replyOnClick}
			/>
			{replyClicked ? (
				<ReplyDropDown onChange={handleReplyChange} onClick={handleReply} />
			) : null}

			<ReplyContainer>
				{childrenComments?.map((reply) => (
					<Reply
						replyInfo={reply}
						type={type}
						id={id}
						onClick={handleReply}
						onChange={handleReplyChange}
						callback={callback}
					/>
				))}
			</ReplyContainer>
		</StyledComment>
	);
};

export default Comment;
