import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoginForm from "../components/LoginForm";
import { handleLogin } from "../services/LoginService";
import styled from "styled-components";

const LoginGrid = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  padding: 20px;
`;

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e, username, password) => {
    e.preventDefault();
    handleLogin(username, password, setUser, setError, navigate);
  };

  return (
    <LoginGrid>
      <h2>Logga in</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <LoginForm handleSubmit={handleSubmit} />
    </LoginGrid>
  );
}

export default Login;
