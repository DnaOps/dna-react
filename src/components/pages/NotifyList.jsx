import sortboxArrow from "../../assets/images/sortbox_arrow.png";
import loading from "../../assets/images/loading.png";
import noticeLikedIcon from "../../assets/images/notice_liked_icon.png";

import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background: #e7e6f5;
  position: fixed;
  z-index: -1;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 73px 0;
  margin: 0 auto;
  overflow-y: scroll;
`;

const NoticeContainer = styled.div`
  width: 917px;
  min-height: 164px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 40px;
`;

const NoticeBlock = styled.div`
  min-width: 207px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #024298;
  border: solid 3px #000;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 7.5px 31px;
  margin: 0 30px 0 0;
  font-family: jua;
  font-size: 25px;
  color: #fff;
`;

const NoticeHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  background: #fff;
  box-sizing: border-box;
  padding: 33px 33px 20px 33px;
`;

const NoticeHeaderTitle = styled.div`
  font-size: 40px;
  color: #024298;
  font-weight: 400;
`;

const NoticeHeaderTypo = styled.div`
  font-family: Noto Sans;
  font-size: 15px;
  color: #626262;
  font-weight: 400;
  text-align: right;
`;

const SearchBarContainer = styled.div`
  width: 500px;
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 30px;
`;

const StyledSortBox = styled.div`
  width: 155px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f8ff;
  box-sizing: border-box;
  padding: 11px 11px 11px 18px;
  font-size: 15px;
  color: #828282;
  cursor: pointer;
`;

const SortBoxArrow = styled.img`
  width: 13px;
  height: 8px;
`;

const SortBox = ({ typo }) => {
  return (
    <StyledSortBox>
      <div>{typo}</div>
      <SortBoxArrow src={sortboxArrow} />
    </StyledSortBox>
  );
};

const SearchBar = styled.div`
  width: 330px;
  height: 100%;
  display: flex;
`;

const SearchField = styled.input`
  width: 275px;
  height: 100%;
  border: none;
`;

const StyledSearchButton = styled.div`
  width: 55px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #024298;
  border: solid 1px #024298;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
`;

const SearchButton = () => {
  return <StyledSearchButton>검색</StyledSearchButton>;
};

const NoticeList = styled.div`
  width: 917px;
  display: flex;
  flex-direction: column;
  border-top: 2.5px solid #024298;
`;

const StyledNotice = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: solid 0.5px #c5c5c5;
  box-sizing: border-box;
  padding: 22px;
`;

const NoticeTitleContainer = styled.div`
  width: 492px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NoticeTitle = styled.div`
  margin-right: 2px;
`;

const NoticeView = styled.div`
  color: #024298;
  font-weight: 700;
`;

const NoticeAuthorLevel = styled.div`
  border: solid 1px #024298;
  box-sizing: border-box;
  padding: 2px;
  margin-right: 8px;
  color: #024298;
  font-weight: 500;
`;

const NoticeAuthor = styled.div`
  width: 145px;
  cursor: pointer;
`;

const NoticeCreatedDate = styled.div`
  margin-right: 40px;
`;

const NoticeLiked = styled.div`
  color: #024298;
  font-weight: 700;
  margin-left: 6px;
`;

const Notice = ({ noticeInfo }) => {
  return (
    <StyledNotice>
      <NoticeTitleContainer>
        <NoticeTitle>{noticeInfo.title}</NoticeTitle>
        <NoticeView>{noticeInfo.view}</NoticeView>
      </NoticeTitleContainer>
      <NoticeAuthorLevel>{noticeInfo.authorLevel}</NoticeAuthorLevel>
      <NoticeAuthor>{noticeInfo.author}</NoticeAuthor>
      <NoticeCreatedDate>{noticeInfo.date}</NoticeCreatedDate>
      <img src={noticeLikedIcon} />
      <NoticeLiked>{noticeInfo.liked}</NoticeLiked>
    </StyledNotice>
  );
};

const Loading = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

const NotifyList = () => {
  const noticeInfo = {
    title: "안녕하세요",
    view: 22,
    authorLevel: 21,
    author: "장은세",
    date: "2021. 11. 07",
    liked: 22,
  };

  return (
    <>
      <Background />
      <Container>
        <NoticeContainer>
          <NoticeBlock>공지사항</NoticeBlock>
          <NoticeHeader>
            <NoticeHeaderTitle>공지사항</NoticeHeaderTitle>
            <NoticeHeaderTypo>
              DNA 동아리의 다양한 소식을 전해드립니다.
              <br />
              동아리 회원분들은 꼭 공지사항을 확인해주세요!
            </NoticeHeaderTypo>
          </NoticeHeader>
        </NoticeContainer>

        <SearchBarContainer>
          <SortBox typo="제목" />
          <SearchBar>
            <SearchField />
            <SearchButton />
          </SearchBar>
        </SearchBarContainer>

        <NoticeList>
          {[...Array(13)].map((_) => (
            <Notice noticeInfo={noticeInfo} />
          ))}
          <Loading>
            <img src={loading} />
          </Loading>
        </NoticeList>
      </Container>
    </>
  );
};

export default NotifyList;
