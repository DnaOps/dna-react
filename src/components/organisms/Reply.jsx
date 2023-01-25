import { useState } from "react";

import styled from "styled-components";

import RecommendComment from "../molecules/RecommendComment";
import ReplyDropDown from "../molecules/ReplyDropDown";
import CommentInfo from "../molecules/CommentInfo";

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

const Reply = ({ replyInfo }) => {
  const [replyClicked, setReplyClicked] = useState(false);
  const replyOnClick = () => {
    setReplyClicked((prev) => !prev);
  };
  const recommendComment = {
    key1: "추천",
    val1: 7,
    key2: "",
    val2: null,
    isReply: true,
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
        {replyClicked ? <ReplyDropDown /> : null}
      </ReplySubWrapper>
    </StyledReply>
  );
};

export default Reply;
