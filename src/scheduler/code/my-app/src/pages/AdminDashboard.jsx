import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Calender from '../components/Calender';
import LeaveRequest from '../components/LeaveRequest';
import Chat from '../components/Chat';
import EmployeePreferenceForm from '../components/EmployeePreferenceForm';
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
  padding: 3rem;

  @media (min-width: 800px) {
    grid-column: 2;
  }
`;

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('schedule');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'schedule':
        return <Calender />;
      // case 'leaveRequest':
      //   return <LeaveRequest />;
      // case 'preferences':
      //   return <EmployeePreferenceForm />;
      case 'chat':
        return <Chat />;
      default:
        return <Calender />;
    }
  };

  return (
    <DashboardGrid>
      <Navbar onSelect={setActiveComponent} />
      <MainContent>
        <Header/>
        {renderComponent()}
      </MainContent>
    </DashboardGrid>
  );
}


export default AdminDashboard;
