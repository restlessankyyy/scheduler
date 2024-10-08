import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import Header from '../components/Header';
import Schedule from '../components/Schedule';
import ManageEmployees from '../components/ManageEmployees';
import styled from "styled-components";
import UserHeader from '../components/UserHeader';

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

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('schedule');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'schedule':
        return <Schedule />;
      case 'employees':
        return <ManageEmployees />;
      default:
        return <Schedule />;
    }
  };

  return (
    <DashboardGrid>
      <AdminNavbar onSelect={setActiveComponent} />
      <MainContent>
      <UserHeader />
        <Header />
        {renderComponent()}
      </MainContent>
    </DashboardGrid>
  );
}


export default AdminDashboard;
