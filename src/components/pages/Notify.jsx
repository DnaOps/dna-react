import styled from "styled-components";

import Header from "../organisms/Header";
import Comment from "../organisms/Comment";
import RecommendComment from "../molecules/RecommendComment";
import ApplyButton from "../atoms/ApplyButton";

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

const EditDeleteButton = () => {
  return (
    <StyledEditDeleteButton>
      <SmallTypo>수정</SmallTypo>
      <SmallTypo>&nbsp;|&nbsp;</SmallTypo>
      <SmallTypo>삭제</SmallTypo>
    </StyledEditDeleteButton>
  );
};

const RecommendCommentWrapper = styled.div`
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

const NoticeButton = ({ typo, background }) => {
  return <StyledNoticeButton style={background}>{typo}</StyledNoticeButton>;
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

const Notify = () => {
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

  const recommendComment = {
    key1: "추천",
    val1: 37,
    key2: "댓글",
    val2: 12,
    isReply: false,
  };

  return (
    <>
      <Header />
      <Container>
        <NoticeTypo>공지사항</NoticeTypo>
        <Notice>
          <NoticeTitle>안녕하세요.</NoticeTitle>

          <AuthorInfo>
            <AuthorLevel>21</AuthorLevel>
            <AuthorTypo>senuej37</AuthorTypo>
            <AuthorTypo>&nbsp;|&nbsp;</AuthorTypo>
            <AuthorTypo>2022.11.07</AuthorTypo>
          </AuthorInfo>

          <NoticeDivider />

          <NoticeContent>DNA입니다. 환영합니다!</NoticeContent>
          <EditDeleteButton />

          <NoticeDivider />

          <RecommendCommentWrapper>
            <RecommendComment recommendComment={recommendComment} />
          </RecommendCommentWrapper>

          <NoticeButtonContainer>
            {buttonInfo.map((info) => (
              <NoticeButton
                key={info.typo}
                typo={info.typo}
                background={info.background}
              />
            ))}
          </NoticeButtonContainer>

          <CommentWrite>
            <CommentWriteTypo>댓글쓰기</CommentWriteTypo>
            <CommentWriteInput />
            <ApplyButton />
          </CommentWrite>

          <CommentContainer>
            <Comment />
          </CommentContainer>
        </Notice>
      </Container>
    </>
  );
};

export default Notify;
