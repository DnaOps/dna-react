import { useState } from "react";

import styled from "styled-components";

import RecommendComment from "../molecules/RecommendComment";
import ReplyDropDown from "../molecules/ReplyDropDown";
import CommentInfo from "../molecules/CommentInfo";

import { postNotifyComment } from "../../api/request";

const StyledReply = styled.div`
	width: 100%;
	display: flex;
	box-sizing: border-box;
	margin: 15px 0;
`;

const ReplyBranch = styled.div`
	box-sizing: border-box;
	margin: -3px 10px;
	color: #828282;
`;

const ReplySubWrapper = styled.div`
	width: 100%;
`;

const ReplyContainer = styled.div`
	width: 100%;
`;

const Reply = ({ replyInfo, type, id, callback }) => {
	const [replyClicked, setReplyClicked] = useState(false);
	const replyOnClick = () => {
		setReplyClicked((prev) => !prev);
	};

	const recommendComment = {
		key1: "추천",
		val1: replyInfo.likeCount,
		key2: "",
		val2: null,
		isReply: true,
	};

	const childrenComments = replyInfo.childrenComments;

	const [reply, setReply] = useState("");
	const handleReplyChange = (e) => {
		setReply(e.target.value);
	};
	const handleReply = () => {
		const postReplyDTO = {
			content: reply,
			commentGroupId: replyInfo.commentGroupId
				? replyInfo.commentGroupId
				: replyInfo.commentId,
			parentCommentId: replyInfo.commentId,
		};
		postNotifyComment(type, id, postReplyDTO, () => callback(type, id));
	};

	return (
		<StyledReply>
			<ReplyBranch>┗</ReplyBranch>
			<ReplySubWrapper>
				<CommentInfo commentInfo={replyInfo} />

				<RecommendComment
					recommendComment={recommendComment}
					onClick={replyOnClick}
				/>
				{replyClicked ? (
					<ReplyDropDown onClick={handleReply} onChange={handleReplyChange} />
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
			</ReplySubWrapper>
		</StyledReply>
	);
};

export default Reply;
