import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import defaultProfileImage from "../assets/profile.png"; 


const UserHeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
`;

const UserImage = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const UserHeader = () => {
  const { user } = useContext(UserContext);

  return (
    <UserHeaderContainer>
      <UserImage src={user.profilePicture || defaultProfileImage} alt="User profile" />
      <span>{user.username}</span>
    </UserHeaderContainer>
  );
}

export default UserHeader; 

