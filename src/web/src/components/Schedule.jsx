import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import sv from 'date-fns/locale/sv';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
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

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  // margin-top: 2rem;
  // margin-bottom: 2rem;
  width: 70%;
  margin: 2rem auto;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-grow: 1;
`;

const ChartTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const SmallCircularProgressbar = styled(CircularProgressbar)`
  width: 60%; // Reducerar storleken till 60% av standardstorleken
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


const ScheduleTable = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(7, 1fr); /* Dubbelt så bred första kolumn */
  gap: 1px;
  background-color: #ddd;
  margin-top: 1rem;
`;

const TableHeader = styled.div`
  background-color: #f0f0f0;
  font-weight: bold;
  padding: 0.5rem;
  text-align: center;
`;

const TableCell = styled.div`
  background-color: white;
  padding: 0.5rem;
  text-align: left;
  cursor: pointer;
`;

const ShiftBox = styled.div`
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${({ type }) =>
    type === 'Shift 1' ? '#fff8dc' :
    type === 'Shift 2' ? '#d8ebff' :
    '#f5f5f5'};
  color: ${({ type }) => (type === 'Unavailable' ? 'gray' : 'black')};
`;

const EmployeeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EmployeeImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const EmployeeName = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;


const Schedule = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES_QUERY);
  const [employees, setEmployees] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(41);
  const navigate = useNavigate(); // Använd useNavigate
  
  const [shiftData, setShiftData] = useState(
    Array(6).fill().map(() => Array(7).fill('Unavailable'))
  );

  const [progressData, setProgressData] = useState({
    completed: 80,
    backup: 70,
    preferences: 90,
  });

  useEffect(() => {
    if (data) {
      setEmployees(data.employees);
    }
  }, [data]);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>Error loading employees!</p>;

  const getColor = (percentage) => {
    if (percentage < 50) return '#ff4e42'; // Red
    if (percentage < 90) return '#ffa400'; // Yellow
    return '#0cce6b'; // Green
  };

  const handleShiftChange = (rowIndex, dayIndex) => {
    setShiftData((prevShiftData) => {
      const newShiftData = prevShiftData.map((row, rIdx) =>
        row.map((shift, dIdx) => {
          if (rIdx === rowIndex && dIdx === dayIndex) {
            // Cykla mellan 'Shift 1', 'Shift 2', och 'Unavailable'
            if (shift === 'Unavailable') return 'Shift 1';
            if (shift === 'Shift 1') return 'Shift 2';
            return 'Unavailable';
          }
          return shift;
        })
      );
      return newShiftData;
    });
  };
  

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
      <ScheduleTable>
  {/* Kolumnrubriker */}
  <TableHeader>Week {selectedWeek}</TableHeader>
  {['Mon 7', 'Tue 8', 'Wed 9', 'Thu 10', 'Fri 11', 'Sat 12', 'Sun 13'].map((day) => (
    <TableHeader key={day}>{day}</TableHeader>
  ))}

  {/* Rader för anställda */}
  {employees.slice(0, 6).map((employee, rowIndex) => (
    <React.Fragment key={employee.id}>
      {/* Första kolumnen: anställds info */}
      <TableCell key={`employee-${employee.id}`}>
        <EmployeeInfo>
          <EmployeeImage src={defaultPersonIcon} alt={employee.name} />
          <EmployeeName>{employee.name}</EmployeeName>
        </EmployeeInfo>
      </TableCell>

      {/* Skiftceller */}
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => {
        // Använd shiftData för att avgöra skifttyp och tid
        const shiftType = shiftData[rowIndex][dayIndex];
        const shiftTime = shiftType === 'Shift 1' ? '10:00 - 16:00' : 
                          shiftType === 'Shift 2' ? '16:00 - 21:00' : 
                          'All day';

        return (
          <TableCell key={`shift-${rowIndex}-${dayIndex}`} onClick={() => handleShiftChange(rowIndex, dayIndex)}>
            <ShiftBox type={shiftType}>
              <div>{shiftType}</div>
              <div>{shiftTime}</div>
            </ShiftBox>
          </TableCell>
        );
      })}
    </React.Fragment>
  ))}
</ScheduleTable>


      {/* <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week']}
      /> */}
<ChartContainer>
      <ChartWrapper>
        <ChartTitle>Schemafyllnad</ChartTitle>
        <SmallCircularProgressbar
          value={progressData.completed}
          text={`${progressData.completed}%`}
          styles={buildStyles({
            textColor: getColor(progressData.completed),
            pathColor: getColor(progressData.completed),
          })}
        />
      </ChartWrapper>
      <ChartWrapper>
        <ChartTitle>Reservtillgänglighet</ChartTitle>
        <SmallCircularProgressbar
          value={progressData.backup}
          text={`${progressData.backup}%`}
          styles={buildStyles({
            textColor: getColor(progressData.backup),
            pathColor: getColor(progressData.backup),
          })}
        />
      </ChartWrapper>
      <ChartWrapper>
        <ChartTitle>Matchning av preferenser</ChartTitle>
        <SmallCircularProgressbar
          value={progressData.preferences}
          text={`${progressData.preferences}%`}
          styles={buildStyles({
            textColor: getColor(progressData.preferences),
            pathColor: getColor(progressData.preferences),
          })}
        />
      </ChartWrapper>
    </ChartContainer>

      <Footer>
        <Input placeholder="Search for or ask me to do anything" />
        <SendButton>➔</SendButton>
      </Footer>

    </Container>

  );
};



export default Schedule;


// {/* <ScheduleTable>
// {/* Kolumnrubriker */}
// <TableHeader>Week {selectedWeek}</TableHeader>
// {['Mon 7', 'Tue 8', 'Wed 9', 'Thu 10', 'Fri 11', 'Sat 12', 'Sun 13'].map((day) => (
//   <TableHeader key={day}>{day}</TableHeader>
// ))}

// {/* Rader för anställda */}
// {employees.slice(0, 6).map((employee, rowIndex) => (
//   <>
//     {/* Första kolumnen: anställds info */}
//     <TableCell key={`employee-${employee.id}`}>
//       <EmployeeInfo>
//         <EmployeeImage src={defaultPersonIcon} alt={employee.name} />
//         <EmployeeName>{employee.name}</EmployeeName>
//       </EmployeeInfo>
//     </TableCell>

//     {/* Skiftceller */}
//     {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => {
//       // Generera skiftdata baserat på rad och kolumnindex
//       let shiftType = 'Unavailable';
//       let shiftTime = 'All day';
      
//       if (rowIndex === 0 && dayIndex < 5) {
//         shiftType = 'Shift 1';
//         shiftTime = '10:00 - 16:00';
//       } else if (rowIndex === 1 && dayIndex % 2 === 0 && dayIndex < 6) {
//         shiftType = 'Shift 2';
//         shiftTime = '16:00 - 21:00';
//       } else if (rowIndex > 1 && rowIndex < 5) {
//         if (dayIndex % 3 === 0) {
//           shiftType = 'Shift 1';
//           shiftTime = '10:00 - 16:00';
//         } else if (dayIndex % 3 === 1) {
//           shiftType = 'Shift 2';
//           shiftTime = '16:00 - 21:00';
//         }
//       } else if (rowIndex === 5 && dayIndex === 2) {
//         shiftType = 'Shift 1';
//         shiftTime = '10:00 - 16:00';
//       }

//       return (
//         <TableCell key={`shift-${rowIndex}-${dayIndex}`} onClick={() => handleShiftChange(rowIndex, dayIndex)}>
//           <ShiftBox type={shiftType}>
//             <div>{shiftType}</div>
//             <div>{shiftTime}</div>
//           </ShiftBox>
//         </TableCell>
//       );
//     })}
//   </>
// ))}
// </ScheduleTable> */}