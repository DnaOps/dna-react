import { useState } from "react";

import styled from "styled-components";

import RecommendComment from "../molecules/RecommendComment";
import ReplyDropDown from "../molecules/ReplyDropDown";
import CommentInfo from "../molecules/CommentInfo";
import { useRecoilValue } from "recoil";
import UserInfoState from "../../state/UserInfoState";
import { useNavigate } from "react-router-dom";

import {
  postNotifyComment,
  putNotifyComment,
  deleteNofityComment,
} from "../../api/request";

const StyledReply = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  margin: 15px 0;
`;

const CommentContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 12px 0 0 0;
`;

const CommentWrite = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 5px 0;
`;

const CommentWriteInput = styled.textarea`
  width: 100%;
  height: 72px;
  border: 0.5px solid #b5b5b5;
  box-sizing: border-box;
  padding: 10px;
  resize: none;
`;

const NoticeButtonContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 0 12px;
  margin-left: auto;
`;

const SmallTypo = styled.div`
  font-size: 10px;
  color: #828282;
  cursor: pointer;
`;

const StyledApplyButton = styled.div`
  width: 47px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.color || "#024298"};
  box-sizing: border-box;
  margin: 5px 0;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
`;

const ModifyButton = ({ onClick, name, color }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <StyledApplyButton onClick={() => onClick()} color={color}>
        {name}
      </StyledApplyButton>
    </div>
  );
};

const StyledEditDeleteButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 0 20px;
  margin: 10px 0;
`;

const EditDeleteButton = ({ editOnClick, deleteOnClick, isEditing }) => {
  return (
    <>
      {isEditing ? null : (
        <StyledEditDeleteButton>
          <SmallTypo onClick={editOnClick}>수정</SmallTypo>
          <SmallTypo>&nbsp;|&nbsp;</SmallTypo>
          <SmallTypo onClick={deleteOnClick}>삭제</SmallTypo>
        </StyledEditDeleteButton>
      )}
    </>
  );
};

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
  const [isReplyEditing, setIsReplyEditing] = useState(false);
  const [editedReplyContent, setEditedReplyContent] = useState(
    replyInfo.content
  );
  const replyOnClick = () => {
    setReplyClicked((prev) => !prev);
  };

  const replyEditOnClick = () => {
    setIsReplyEditing((prev) => !prev);
  };
  const handleCancelEdit = () => {
    setIsReplyEditing(false);
    setEditedReplyContent(replyInfo.content);
  };
  const handleReplyUpdate = () => {
    const updatedReply = {
      ...replyInfo,
      content: editedReplyContent,
    };

    // 댓글을 업데이트하는 API 호출 수행
    // updateReply(updatedReply);
    putNotifyComment(type, id, replyInfo.commentId, updatedReply, () =>
      callback(type, id)
    )
      .then(() => {
        setIsReplyEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navigate = useNavigate();
  const userId = useRecoilValue(UserInfoState).userId;

  const deleteOnClick = (type, id, commentId) => {
    deleteNofityComment(type, id, commentId, postReplyDTO, () =>
      callback(type, id)
    );
    navigate(`/${type}/${id}`);
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
      commentGroupId:
        replyInfo.commentGroupId != null
          ? replyInfo.commentGroupId
          : replyInfo.commentId,
      parentCommentId: replyInfo.commentId,
    };
    postNotifyComment(type, id, postReplyDTO, () => {
      setReplyClicked(false);
      setReply("");
      callback(type, id);
    });
  };

  const postReplyDTO = {
    content: reply,
    commentGroupId:
      replyInfo.commentGroupId != null
        ? replyInfo.commentGroupId
        : replyInfo.commentId,
    parentCommentId: replyInfo.commentId,
  };

  return (
    <StyledReply>
      <ReplyBranch>┗</ReplyBranch>
      <ReplySubWrapper>
        <CommentInfo commentInfo={replyInfo} isEditing={isReplyEditing} />

        {isReplyEditing ? (
          <CommentContainer>
            <CommentWrite>
              <CommentWriteInput
                onChange={(event) => setEditedReplyContent(event.target.value)}
                value={editedReplyContent}
              />
              <NoticeButtonContainer>
                <ModifyButton onClick={handleReplyUpdate} name="수정" />
                <ModifyButton
                  onClick={handleCancelEdit}
                  name="취소"
                  color="#828282"
                />
              </NoticeButtonContainer>
            </CommentWrite>
          </CommentContainer>
        ) : (
          <>
            {replyClicked ? (
              <ReplyDropDown
                onClick={handleReply}
                onChange={handleReplyChange}
              />
            ) : null}
          </>
        )}
        <RecommendComment
          recommendComment={recommendComment}
          onClick={replyOnClick}
        />
        {userId === replyInfo.authorId ? (
          <EditDeleteButton
            deleteOnClick={() =>
              deleteOnClick(type, id, replyInfo.commentId, postReplyDTO, () =>
                callback(type, id)
              )
            }
            editOnClick={replyEditOnClick}
            isEditing={isReplyEditing}
          />
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
