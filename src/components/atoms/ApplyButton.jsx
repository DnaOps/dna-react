import styled from "styled-components";

const StyledApplyButton = styled.div`
  width: 47px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #024298;
  box-sizing: border-box;
  margin: 5px 0;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
`;

const ApplyButton = ({ onClick, parentId }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <StyledApplyButton onClick={() => onClick(parentId)}>
        등록
      </StyledApplyButton>
    </div>
  );
};

export default ApplyButton;
