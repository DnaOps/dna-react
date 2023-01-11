import styled from "styled-components";

const StyledComminityButton = styled.button`
  width: 100%;
  height: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  border-radius: 8px;
  box-sizing: border-box;
  margin: 4px 0;
`;

<<<<<<< HEAD
const CommunityButton = ({ typo, activated }) => {
  return (
    <StyledComminityButton
=======
const CommunityButton = ({ typo, activated, onClick }) => {
  return (
    <StyledComminityButton
      onClick={onClick}
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
      style={{
        background: activated ? "#024298" : "#b5b5b5",
        border: activated ? "1px solid #024298" : "1px solid #b5b5b5",
        cursor: activated ? "pointer" : "",
      }}
    >
      {typo}
    </StyledComminityButton>
  );
};

<<<<<<< HEAD
export default CommunityButton;
=======
export default CommunityButton;
>>>>>>> d96484410d36b12c5656616da0d7006b503f8564
