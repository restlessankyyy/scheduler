import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: inline-flex; 
  width: 90%; 
  margin: 0 auto;
  margin-top: 1rem; 
  margin-bottom: 2rem;
`;

const InputField = styled.input`
  flex: 1;
  padding: 0.5rem 1.5rem;
  border: 1px solid #ccc;
  border-radius: 40px;
  background-color: #eceff1;

  &:disabled {
    background-color: #f0f0f0;
  }
`;

const SendButton = styled.button`
  color: black; 
  border: none;
  border-radius: 50%; 
  padding: 10px; 
  background-color: transparent;
  cursor: pointer;
  margin-left: -40px;
  position: relative;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    cursor: not-allowed;
    // background-color: #cccccc;
  }
`;

const InputComponent = ({ input, setInput, inputRef, currentQuestion, handleSend, questions }) => {
    return (
        <InputContainer>
            <InputField
                type="text"
                value={input}
                ref={inputRef}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSend(e.target.value);
                    }
                }}
                placeholder="Ditt svar..."
                disabled={currentQuestion >= questions.length} 
            />
            <SendButton
                onClick={() => handleSend(input)}
                disabled={currentQuestion >= questions.length} 
            >
                ➔
            </SendButton>
        </InputContainer>
    );
};

export default InputComponent;
