import React from 'react';
import styled from 'styled-components';

const ChatContainer = styled.section`
  background-color: #f9e5e5;
  padding: 1rem;
  border-radius: 8px;
`;

const Chat = () => {
  return (
    <ChatContainer>
      <h2>Chat with Employer</h2>
      <div className="chat-box">
        <p>Here I can chat with my boss...</p>
        <input type="text" placeholder="Type your message..." />
        <button type="button">Send</button>
      </div>
    </ChatContainer>
  );
};

export default Chat;
