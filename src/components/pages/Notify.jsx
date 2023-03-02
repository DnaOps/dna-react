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
  getIfLiked,
} from "../../api/request";

import UserInfoState from "../../state/UserInfoState";
import { useRecoilValue, useSetRecoilState } from "recoil";

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

const NoticeButton = ({ typo, background, type }) => {
  const navigate = useNavigate();
  const navURL = {
    목록: `/${type}_list`,
    답변: "",
    글쓰기: "",
  };
  return (
    <StyledNoticeButton
      style={background}
      onClick={() => navigate(navURL[typo])}
    >
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

const LikeButton = ({ liked, handleLike, id }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const likeButtonOnClick = () => {
    postLike(id, handleLike);
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

  const grayButton = {
    background: "#828282",
  };

  const navyButton = {
    background: "#024298",
  };

  const buttonInfo = [
    // onClick 추가
    { typo: "목록", background: grayButton },
    { typo: "답변", background: grayButton },
    { typo: "글쓰기", background: navyButton },
  ];

  const [recommendComment, setRecommentComment] = useState({
    key1: "추천",
    val1: -1,
    key2: "댓글",
    val2: -1,
    isReply: false,
  });

  const [notifyInfo, setNotifyInfo] = useState({
    author: "",
    authorId: -1,
    commentCount: -1,
    content: "",
    level: -1,
    likeCount: -1,
    modifiedAt: "",
    noticeId: -1,
    title: "",
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
    setComments([...commentList]);
  };

  const deleteOnClick = (id) => {
    deleteNotify(id);
    navigate("/notify_list");
  };

  const [commentContent, setCommentContent] = useState("");

  const handleCommentWrite = (event) => {
    setCommentContent(event.target.value);
  };

  const userInfo = useRecoilValue(UserInfoState);
  const setUserInfo = useSetRecoilState(UserInfoState);

  const applyOnClick = (parentId) => {
    const commentData = {
      noticeId: notifyInfo.noticeId,
      parentCommentId: parentId,
      content: commentContent,
    };
    postNotifyComment(commentData, () => {
      setUserInfo({ ...userInfo, commentCount: userInfo.commentCount + 1 });
      getSpecificNotify(id, handleNotifyInfo, handleComment);
    });

    setCommentContent("");
  };

  const { id } = useParams();

  const [liked, setLiked] = useState(false);
  const handleLike = (added) => {
    setLiked((prev) => !prev);
    switch (added) {
      case "added":
        handleNotifyInfo({
          ...notifyInfo,
          likeCount: notifyInfo.likeCount + 1,
        });
        break;
      case "deleted":
        handleNotifyInfo({
          ...notifyInfo,
          likeCount: notifyInfo.likeCount - 1,
        });
        break;
      default:
        console.log("like event did not applied");
    }
  };

  useEffect(() => {
    getSpecificNotify(id, handleNotifyInfo, handleComment);
    // getNofityComments(id, handleComment);
    getIfLiked(id, setLiked);
  }, []);

  const typo = {
    notify: "공지사항",
    study: "스터디 게시판",
    board: "자유 게시판",
  };

  return (
    <>
      <Header />
      <Container>
        <NoticeTypo>{typo[type]}</NoticeTypo>
        <Notice>
          <NoticeTitle>{notifyInfo.title}</NoticeTitle>

          <AuthorInfo>
            <AuthorLevel>{notifyInfo.level}</AuthorLevel>
            <AuthorTypo>{notifyInfo.author}</AuthorTypo>
            <AuthorTypo>&nbsp;|&nbsp;</AuthorTypo>
            <AuthorTypo>
              {notifyInfo.modifiedAt.substring(0, 10).replaceAll("-", ".")}
            </AuthorTypo>
          </AuthorInfo>

          <NoticeDivider />

          <NoticeContent>{notifyInfo.content}</NoticeContent>
          <EditDeleteButton
            deleteOnClick={() => deleteOnClick(notifyInfo.noticeId)}
          />

          <NoticeDivider />

          <RecommendCommentWrapper>
            <LikeButton liked={liked} handleLike={handleLike} id={id} />
            <RecommendComment recommendComment={recommendComment} />
          </RecommendCommentWrapper>

          <NoticeButtonContainer>
            {buttonInfo.map((info) => (
              <NoticeButton
                key={info.typo}
                typo={info.typo}
                type={type}
                background={info.background}
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
              return <Comment commentInfo={commentInfo} />;
            })}
          </CommentContainer>
        </Notice>
      </Container>
    </>
  );
};

export default Notify;
