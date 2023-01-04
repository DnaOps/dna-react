import { useState } from "react";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #dcdaf9;
  box-sizing: border-box;
  padding: 75px 55px 0 55px;
`;

const NoticeContainer = styled.div`
  width: 100%;
  height: 164px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 40px;
`;

const NoticeBlock = styled.div``;

const NotifyList = () => {
  return (
    <Container>
      <NoticeContainer></NoticeContainer>
    </Container>
  );
};

export default NotifyList;
