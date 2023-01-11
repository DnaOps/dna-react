import styled from "styled-components";

const RecommendCommentContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  margin: 10px 0 0 0;
`;

const RecommendCommentValue = styled.div`
  box-sizing: border-box;
  margin: 0 3px;
  font-size: 10px;
  color: #024298;
  font-weight: 700;
`;

const SmallTypo = styled.div`
  font-size: 10px;
  color: #828282;
  cursor: pointer;
`;

const ReplyButton = ({ onClick }) => {
  return <SmallTypo onClick={onClick}>답글</SmallTypo>;
};

const RecommendComment = ({ recommendComment, onClick }) => {
  const { key1, key2, val1, val2, isReply } = recommendComment;
  return (
    <RecommendCommentContainer>
      <SmallTypo>{key1}</SmallTypo>
      <RecommendCommentValue>{val1}</RecommendCommentValue>
      <SmallTypo>&nbsp;|&nbsp;</SmallTypo>
      {isReply ? (
        <ReplyButton onClick={onClick} />
      ) : (
        <>
          <SmallTypo>{key2}</SmallTypo>
          <RecommendCommentValue>{val2}</RecommendCommentValue>
        </>
      )}
    </RecommendCommentContainer>
  );
};

export default RecommendComment;
