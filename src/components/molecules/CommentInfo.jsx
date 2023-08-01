import styled from "styled-components";

const StyledCommentInfo = styled.div`
  display: flex;
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

const CommentWriter = styled.div`
  box-sizing: border-box;
  margin: -1px 8px 0 5px;
  font-size: 13px;
  font-weight: 700;
`;

const CommentWriteDate = styled.div`
  display: flex;
  box-sizing: border-box;
  margin: 4px 0 0 2px;
`;

const CommentContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0 0;
  font-size: 13px;
`;

const SmallTypo = styled.div`
  font-size: 10px;
  color: #828282;
  cursor: pointer;
`;

const CommentInfo = ({ commentInfo, isEditing }) => {
  const {
    author,
    authorId,
    level,
    childrenComments,
    commentId,
    content,
    modifiedAt,
    parentId,
  } = commentInfo;

  return (
    <>
      <StyledCommentInfo>
        <AuthorLevel>{level}</AuthorLevel>

        <CommentWriter>{author}</CommentWriter>

        <CommentWriteDate>
          <SmallTypo>{modifiedAt}</SmallTypo>
        </CommentWriteDate>
      </StyledCommentInfo>
      {isEditing ? null : (
        <CommentContent>{commentInfo.content}</CommentContent>
      )}
    </>
  );
};

export default CommentInfo;
