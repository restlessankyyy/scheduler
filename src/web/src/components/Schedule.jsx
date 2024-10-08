import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import sv from 'date-fns/locale/sv';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Importera useNavigate
import defaultPersonIcon from '../assets/profile.png';

const GET_EMPLOYEES_QUERY = gql`
  query GetEmployees {
    employees {
      id
      name
      email
      needsChildCare
      prefersOvertime
      role
      department
      availability
      overtimePreferences
    }
  }
`;

const Container = styled.section`
  padding: 2rem;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: gray;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem; // Justerat avstånd mellan knapparna
`;

const AddEmployeeButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #45a049;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #367d3c;
  }
`;

const ExportButton = styled.button`
  padding: 0.5rem 1rem;
  color: #45a049;
  border: 1px solid #45a049;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; // Justera mellanrummet mellan week-selector och nav-knapparna
`;

const SortOptions = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  justify-content: space-between; // Skapa utrymme mellan vänster och höger del
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem; // Större mellanrum mellan Filter och October 2024
`;

const SortItem = styled.div`
  cursor: pointer;
  color: gray;
  &:hover {
    color: black;
  }
`;


const WeekSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Week = styled.div`
  cursor: pointer;
  padding-bottom: 0.2rem;
  border-bottom: ${({ isSelected }) => (isSelected ? '2px solid pink' : 'none')};
  color: ${({ isSelected }) => (isSelected ? 'black' : 'gray')};

  &:hover {
    color: black;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: gray;

  &:hover {
    color: black;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 1rem 0;
`;


const Footer = styled.div`
  display: flex;
  align-items: center;
   margin-top: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.7rem;
  border-radius: 20px;
  border: 1px solid #ddd;
  backround-color: #45a049;
`;
const SendButton = styled.button`
  color: black; 
  border: none;
  border-radius: 50%; 
  padding: 10px; 
  background-color: transparent;
  cursor: pointer;
  margin-left: -40px;
  position: relative;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const locales = { sv };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales, defaultLocale: 'sv' });

const events = [
  {
    title: 'Morning Shift',
    start: new Date(2024, 9, 1, 8, 0),
    end: new Date(2024, 9, 1, 16, 0),
  },
  {
    title: 'Evening Shift',
    start: new Date(2024, 9, 2, 16, 0),
    end: new Date(2024, 9, 2, 22, 0),
  },
];

const Schedule = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES_QUERY);
  const [employees, setEmployees] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(41);
  const navigate = useNavigate(); // Använd useNavigate

  useEffect(() => {
    if (data) {
      setEmployees(data.employees);
    }
  }, [data]);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>Error loading employees!</p>;

  return (
    <Container>
      <HeaderSection>
        <div>
          <Title>Manage your schedules</Title>
          <Subtitle>How would you like to schedule</Subtitle>
        </div>
        <ButtonContainer>
          <AddEmployeeButton onClick={() => navigate('/add-employee')}>Add employee</AddEmployeeButton>
          <ExportButton>Export Schedule</ExportButton>
        </ButtonContainer>
      </HeaderSection>

      <SortOptions>
        <LeftSection>
          <SortItem>Filter ▼</SortItem>
          <SortItem>October 2024▼</SortItem>
        </LeftSection>
        <NavContainer>
          <WeekSelector>
            {[41, 42, 43, 44].map((week) => (
              <Week key={week} isSelected={selectedWeek === week} onClick={() => setSelectedWeek(week)}>
                Week {week}
              </Week>
            ))}
          </WeekSelector>
          <NavButton onClick={() => setSelectedWeek(selectedWeek - 1)}>&lt;</NavButton>
          <NavButton onClick={() => setSelectedWeek(selectedWeek + 1)}>&gt;</NavButton>
        </NavContainer>
      </SortOptions>
      <Divider />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week']}
      />
      <Footer>
        <Input placeholder="Search for or ask me to do anything" />
        <SendButton>➔</SendButton>
      </Footer>

    </Container>

  );
};



export default Schedule;
