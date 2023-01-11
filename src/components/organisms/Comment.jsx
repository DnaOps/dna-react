import { useState } from "react";

import styled from "styled-components";

import Reply from "./Reply";
import RecommendComment from "../molecules/RecommendComment";
import ReplyDropDown from "../molecules/ReplyDropDown";
import CommentInfo from "../molecules/CommentInfo";

const ReplyContainer = styled.div`
  width: 100%;
`;

const StyledComment = styled.div``;

const Comment = () => {
  const [replyClicked, setReplyClicked] = useState(false);
  const replyOnClick = () => {
    setReplyClicked((prev) => !prev);
  };
  const recommendComment = {
    key1: "추천",
    val1: 37,
    key2: "",
    val2: null,
    isReply: true,
  };

  const commentInfo = {
    level: 17,
    author: "jaypyon",
    modifiedAt: "6시간 전 | 2022. 11. 07",
    content: "앞으로 열심히 활동하도록 하겠습니다 ^-^",
  };

  return (
    <StyledComment>
      <CommentInfo commentInfo={commentInfo} />

      <RecommendComment
        recommendComment={recommendComment}
        onClick={replyOnClick}
      />
      {replyClicked ? <ReplyDropDown /> : null}

      <ReplyContainer>
        <Reply />
      </ReplyContainer>
    </StyledComment>
  );
};

export default Comment;
