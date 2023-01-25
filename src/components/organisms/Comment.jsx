import { useState } from "react";

import styled from "styled-components";

import Reply from "./Reply";
import RecommendComment from "../molecules/RecommendComment";
import ReplyDropDown from "../molecules/ReplyDropDown";
import CommentInfo from "../molecules/CommentInfo";

const ReplyContainer = styled.div`
  width: 100%;
`;

const StyledComment = styled.div`
  margin-top: 25px;
`;

const Comment = ({ commentInfo }) => {
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

  const childrenComments =
    commentInfo.childrenComments !== null
      ? commentInfo.childrenComments.list
      : [];

  return (
    <StyledComment>
      <CommentInfo commentInfo={commentInfo} />

      <RecommendComment
        recommendComment={recommendComment}
        onClick={replyOnClick}
      />
      {replyClicked ? <ReplyDropDown /> : null}

      <ReplyContainer>
        {childrenComments.map((reply) => (
          <Reply replyInfo={reply} />
        ))}
      </ReplyContainer>
    </StyledComment>
  );
};

export default Comment;
