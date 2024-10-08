import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import Header from '../components/Header';
import Calender from '../components/Calender';
import Chat from '../components/Chat';
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
      case 'employees':
        return <Chat />;
      default:
        return <Calender />;
    }
  };

  return (
    <DashboardGrid>
      <AdminNavbar onSelect={setActiveComponent} />
      <MainContent>
        <Header/>
        {renderComponent()}
      </MainContent>
    </DashboardGrid>
  );
}


export default AdminDashboard;
