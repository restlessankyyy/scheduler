import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import UserHeader from '../components/UserHeader';
import Schedule from '../components/Schedule';
import AddEmployeeForm from '../components/AddEmployeeForm';
import ManageEmployees from '../components/ManageEmployees';
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
    const navigateTo = {
      schedule: '/admin-dashboard',  // Ändra till den rutt där Schedule visas
      employees: '/admin-dashboard' // Ändra till den rutt där ManageEmployees visas
    };
  // const [activeComponent, setActiveComponent] = useState('AddEmployee');

  // const renderComponent = () => {
  //   switch (activeComponent) {
  //     case 'schedule':
  //       return <Schedule />;
  //     case 'AddEmployee':
  //       return <AddEmployeeForm />;
  //     case 'employees':
  //       return <ManageEmployees />;
  //     default:
  //       return <AddEmployeeForm />;
  //   }
  // };

  return (
    <DashboardGrid>
      <AdminNavbar navigateTo={navigateTo} />
      <MainContent>
        <UserHeader />
        <AddEmployeeForm />
        {/* {renderComponent()} */}
      </MainContent>
    </DashboardGrid>
  );
}


export default AddEmployeePage;
