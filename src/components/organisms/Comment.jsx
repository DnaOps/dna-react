import { useState } from "react";

import styled from "styled-components";

import Reply from "./Reply";
import RecommendComment from "../molecules/RecommendComment";
import ReplyDropDown from "../molecules/ReplyDropDown";
import CommentInfo from "../molecules/CommentInfo";
import {
  deleteNofityComment,
  postNotifyComment,
  putNotifyComment,
  getSpecificNotify,
} from "../../api/request";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import UserInfoState from "../../state/UserInfoState";

const ReplyContainer = styled.div`
  width: 100%;
`;

const StyledComment = styled.div`
  margin-top: 25px;
`;

const StyledEditDeleteButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 0 20px;
  margin: 10px 0;
`;

const SmallTypo = styled.div`
  font-size: 10px;
  color: #828282;
  cursor: pointer;
`;

const CommentContainer = styled.div`
  width: 717px;
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

const Comment = ({ commentInfo, type, id, callback }) => {
  const [isEditing, setIsEditing] = useState(false);
  const editOnClick = () => {
    setIsEditing((prev) => !prev);
  };

  const navigate = useNavigate();

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

  const [commentContent, setCommentContent] = useState("");
  const handleCommentWrite = (event) => {
    setCommentContent(event.target.value);
  };

  const handleCommentUpdate = () => {
    const updatedComment = {
      ...commentInfo,
      content: editedCommentContent,
    };

    // 댓글을 업데이트하는 API 호출 수행
    // updateComment(updatedComment);
    putNotifyComment(type, id, commentInfo.commentId, updatedComment, () =>
      callback(type, id)
    )
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });

    setIsEditing(false);
  };

  const childrenComments = commentInfo.childrenComments;
  const { state } = useLocation();

  // const { id } = useParams();
  const userId = useRecoilValue(UserInfoState).userId;

  const [reply, setReply] = useState("");
  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };
  const handleReply = () => {
    const postReplyDTO = {
      content: reply,
      commentGroupId: commentInfo.commentGroupId
        ? commentInfo.commentGroupId
        : commentInfo.commentId,
      parentCommentId: commentInfo.commentId,
      content: reply,
    };

    postNotifyComment(type, id, postReplyDTO, () => {
      setReplyClicked(false);
      setReply("");
      callback(type, id);
    });
  };

  const postReplyDTO = {
    content: reply,
    commentGroupId: commentInfo.commentGroupId
      ? commentInfo.commentGroupId
      : commentInfo.commentId,
    parentCommentId: commentInfo.commentId,
    content: reply,
  };

  const deleteOnClick = (type, id, commentId) => {
    deleteNofityComment(type, id, commentId, postReplyDTO, () =>
      callback(type, id)
    );
    navigate(`/${type}/${id}`);
  };

  const commentCallback = (type, id) => {
    getSpecificNotify(type, id, 0, handleNotifyInfo, handleComment);
  };

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

  const [editedCommentContent, setEditedCommentContent] = useState(
    commentInfo.content
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedCommentContent(commentInfo.content);
  };

  const [isReplyEditing, setIsReplyEditing] = useState(false);
  const replyEditOnClick = () => {
    setIsReplyEditing((prev) => !prev);
  };

  return (
    <StyledComment>
      <CommentInfo commentInfo={commentInfo} isEditing={isEditing} />
      {isEditing && (
        <CommentContainer>
          <CommentWrite>
            <CommentWriteInput
              onChange={(event) => setEditedCommentContent(event.target.value)}
              value={editedCommentContent}
            />
            <NoticeButtonContainer>
              <ModifyButton onClick={handleCommentUpdate} name="수정" />
              <ModifyButton
                onClick={handleCancelEdit}
                name="취소"
                color="#828282"
              />
            </NoticeButtonContainer>
          </CommentWrite>
        </CommentContainer>
      )}

      {userId == commentInfo.authorId ? (
        <EditDeleteButton
          deleteOnClick={() =>
            deleteOnClick(type, id, commentInfo.commentId, postReplyDTO, () =>
              callback(type, id)
            )
          }
          editOnClick={handleEditClick}
          isEditing={isEditing}
        />
      ) : null}

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
