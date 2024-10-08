import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const NavbarContainer = styled.nav`
    background-color: var(--primary-bg);
    padding: 1rem;
    display: flex;
    justify-content: space-between; 

    @media (min-width: 800px) {
    grid-row: 1 / span 2;
    grid-column: 1;   
    justify-content: flex-start;
    flex-direction: column; 
    gap: 2rem;
  }
`;

const AdminNavbar = ({ onSelect, navigateTo }) => {
  const navigate = useNavigate();

  const handleSelect = (component) => {
    if (navigateTo) {
      navigate(navigateTo[component]); // Använd navigateTo-objekt för att bestämma rutt
    }
    if (onSelect) {
      onSelect(component);
    }
  };
  return (
    <NavbarContainer>
      <button onClick={() => handleSelect('schedule')}>Schedule</button>
      <button onClick={() => handleSelect('employees')}>Employees</button>
    </NavbarContainer>
  );
};

export default AdminNavbar;
