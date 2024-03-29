import styled from "styled-components";

import ApplyButton from "../atoms/ApplyButton";

const ReplyWrite = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 15px 0 5px 0;
`;

const ReplyWriteTypo = styled.div`
  box-sizing: border-box;
  margin: 10px 0;
  font-size: 12px;
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

const ReplyDropDown = ({ onClick, onChange }) => {
  return (
    <ReplyWrite>
      <ReplyWriteTypo>답글쓰기</ReplyWriteTypo>
      <CommentWriteInput onChange={onChange} />
      <ApplyButton onClick={onClick} />
    </ReplyWrite>
  );
};

export default ReplyDropDown;
