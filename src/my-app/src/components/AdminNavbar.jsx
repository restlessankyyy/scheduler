import React from 'react';
import styled from 'styled-components';

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

const AdminNavbar = ({ onSelect }) => {
  return (
    <NavbarContainer>
      <button onClick={() => onSelect('schedule')}>Schedule</button>
      <button onClick={() => onSelect('employees')}>Employees</button>
    </NavbarContainer>
  );
};

export default AdminNavbar;
