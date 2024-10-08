import React from "react";
import styled from "styled-components";


const Wrapper = styled.div`
  overflow-y: auto; 
  margin-bottom: 1rem; 
  flex-grow: 1; 
`;

const Question = styled.div`
  background-color: #eceff1;
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem;
  align-self: flex-start;
  max-width: 50%;
`;

const Response = styled.div`
  background-color: #006C68;
  color: white;
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem;
  align-self: flex-start;
  max-width: 50%;
  margin-left: 100px;
`;

const MessagesWrapper = ({ responses, questions, currentQuestion }) => {
  return (
    <Wrapper>
      {responses.map((item, index) => (
        <div key={index}>
          <Question>{item.question}</Question>
          <Response>{item.response}</Response>
        </div>
      ))}
      
      {currentQuestion < questions.length && (
        <Question>{questions[currentQuestion]?.text}</Question>
      )}
    </Wrapper>
  );
};

export default MessagesWrapper;
