import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import UserHeader from '../components/UserHeader';
import Calender from '../components/Calender';
import AddEmployeeForm from '../components/AddEmployeeForm';
import styled from "styled-components";

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media(min-width: 800px) {
    grid-template-columns: 250px auto; 
    grid-template-rows: 1fr;
  }
`;

const MainContent = styled.main`
  padding: 0 3rem;

  @media (min-width: 800px) {
    grid-column: 2;
  }
`;

const AddEmployeePage = () => {
  const [activeComponent, setActiveComponent] = useState('AddEmployee');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'schedule':
        return <Calender />;
      case 'AddEmployee':
        return <AddEmployeeForm />;
      case 'employees':
        return <AddEmployeeForm />;
      default:
        return <AddEmployeeForm />;
    }
  };

  return (
    <DashboardGrid>
      <AdminNavbar onSelect={setActiveComponent} />
      <MainContent>
        <UserHeader />
        {renderComponent()}
      </MainContent>
    </DashboardGrid>
  );
}


export default AddEmployeePage;
