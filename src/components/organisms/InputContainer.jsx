import { useState } from "react";
import styled from "styled-components";

const InputSubWrapper = styled.div`
  display: flex;
  align-items: center;
  border-left: solid 1px #b5b5b5;
  border-right: solid 1px #b5b5b5;
  box-sizing: border-box;
  padding: 0 12px;
`;

const InputDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #b5b5b5;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 12px;
`;

const InputContainer = ({ inputInfo }) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const inputOnFocus = (index) => {
    setFocusedIndex(index);
  };
  const inputOnBlur = () => {
    setFocusedIndex(-1);
  };

  return (
    <div>
      {inputInfo.map((item, index) => {
        const inputLength = inputInfo.length;
        const isFirst = index === 0;
        const isLast = index === inputLength - 1;
        return (
          <div key={index}>
            <InputSubWrapper
              style={{
                borderTop: isFirst ? "solid 1px #b5b5b5" : "",
                borderBottom: isLast ? "solid 1px #b5b5b5" : "",
                borderColor: index === focusedIndex ? "#024298" : "#b5b5b5",
                borderRadius:
                  index === 0
                    ? "8px 8px 0 0"
                    : index === inputLength - 1
                    ? "0 0 8px 8px"
                    : "",
              }}
            >
              <Icon
                src={
                  index === focusedIndex
                    ? item.src.activated
                    : item.src.non_activated
                }
              />
              <input
                className="input"
                type={item.type}
                placeholder={item.placeholder}
                onChange={item.handle}
                onFocus={() => inputOnFocus(index)}
                onBlur={() => inputOnBlur(index)}
              />
            </InputSubWrapper>
            {!isLast ? (
              <InputDivider
                style={{
                  background:
                    index === focusedIndex || index === focusedIndex - 1
                      ? "#024298"
                      : "#b5b5b5",
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default InputContainer;
