import styled from "styled-components";

const StyledErrorMessage = styled.div`
  margin-top: 3.5px;
  color: #a10c0c;
  font-size: 10px;
`;

const ErrorMessage = ({ valid, msg }) => {
  return (
    <StyledErrorMessage>{valid ? <div>{msg}</div> : null}</StyledErrorMessage>
  );
};

export default ErrorMessage;
