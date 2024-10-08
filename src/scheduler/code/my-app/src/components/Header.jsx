import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext'; 

const HeaderContainer = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;

const Header = () => {
  const { user } = useContext(UserContext); 

  return (
    <HeaderContainer>
      {user ? `Welcome ${user.username}` : "Welcome"} 
      {user?.role === "admin" ? " (Admin)" : ""}
    </HeaderContainer>
  );
};

export default Header;

