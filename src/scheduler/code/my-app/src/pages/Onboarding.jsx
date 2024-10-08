import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MessagesWrapper from "../components/MessagesWrapper";
import InputComponent from "../components/InputComponent"; 

const ChatContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto; 
  height: 100vh;
  padding: 2rem;
  overflow: hidden; 
`;

const Title = styled.h1`
  color: black; 
  margin: 0; 
  padding-left: 1rem;
`;

const DeleteButton = styled.button`
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-top: 1rem; 
  
  &:hover {
    background-color: #e53935;
  }
`;

const Button = styled.button`
  display: block; 
  width: 200px; 
  margin: 1rem auto; 
  padding: 10px; 
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  width: 200px;  
  margin-bottom: 1rem; 
  
  &:hover {
    background-color: #45a049;
  }
`;

const Onboarding = ({ onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [input, setInput] = useState(""); 
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get("http://localhost:3001/questions");
      setQuestions(response.data);
    };
    fetchQuestions();
  }, []);

  const handleSend = async (response) => {
    if (response.trim()) {
      await axios.post("http://localhost:3001/responses", {
        questionId: questions[currentQuestion].id,
        text: response,
      });

      setResponses((prevResponses) => [
        ...prevResponses,
        { question: questions[currentQuestion].text, response },
      ]);

      setInput("");

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        console.log("All questions answered.");
        setCurrentQuestion(questions.length); 
      }
    }
  };

  const handleClearResponses = async () => {
    await axios.delete("http://localhost:3001/responses");
    setResponses([]);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion]);

  return (
    <ChatContainer>
      <Title>Onboarding</Title>
      <MessagesWrapper responses={responses} questions={questions} currentQuestion={currentQuestion} />
      <Button
        style={{ display: currentQuestion >= questions.length ? 'block' : 'none' }}
        onClick={onFinish}
      >
        Add employees
      </Button>

      <InputComponent
        input={input}
        setInput={setInput}
        inputRef={inputRef}
        currentQuestion={currentQuestion}
        handleSend={handleSend}
        questions={questions}
      />


      {/* <DeleteButton onClick={handleClearResponses}>
        Delete responses from db.json
      </DeleteButton> */}

    </ChatContainer>
  );
};

export default Onboarding;
