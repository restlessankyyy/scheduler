import Onboarding from "./Onboarding"; 
import UserHeader from "../components/UserHeader"; 
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const OnboardingHeader = styled.h1`
  justify-self: center;
`
const Employer = () => {
  const navigate = useNavigate();

  const handleFinishOnboarding = () => {
    navigate("/add-employer");
  };

  return (
    <Container>
      <UserHeader />
      <Onboarding onFinish={handleFinishOnboarding} />
    </Container>
  );
}

export default Employer;


