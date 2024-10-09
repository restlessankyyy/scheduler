import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultPersonIcon from '../assets/profile.png';

import 'react-circular-progressbar/dist/styles.css';

const Container = styled.section`
  padding: 2rem;
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


const ScheduleTable = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(7, 1fr);
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
  background-color: ${({ type }) => {
    switch (type) {
      case 'Available Shift 1':
        return '#d8ebff';
      case 'Available Shift 2':
        return '#fff8dc';
      case 'Available All Day':
        return '#f0e68c';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${({ type }) => (type === 'Unavailable' ? 'gray' : 'black')};
`;


const ProfileContainer = styled.div`
  width: 80%;
  height: 200px;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 2rem;
`;

const InfoSection = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #45a049;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-start;
  
  &:hover {
    background-color: #367d3c;
  }
`;



const StatusBox = styled.div`
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${({ type }) => 
    type === 'Available (Shift 1)' ? '#d8f3dc' :
    type === 'Available (Shift 2)' ? '#ffe4e1' :
    type === 'Available (All day)' ? '#f0f8ff' :
    '#f5f5f5'};
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border-radius: 20px;
  border: 1px solid #ddd;
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



const EmployeeProfile = ({ employee }) => {
  if (!employee) return null;
  const [shiftData, setShiftData] = useState(
    Array(4).fill().map(() => Array(7).fill('Unavailable'))
  );

  const handleShiftChange = (rowIndex, dayIndex) => {
    setShiftData((prevShiftData) => {
      const newShiftData = prevShiftData.map((row, rIdx) =>
        row.map((shift, dIdx) => {
          if (rIdx === rowIndex && dIdx === dayIndex) {
            // Cykla mellan 'Available (Shift 1)', 'Available (Shift 2)', 'Available (All day)' och 'Unavailable'
            if (shift === 'Unavailable') return 'Available (Shift 1)';
            if (shift === 'Available (Shift 1)') return 'Available (Shift 2)';
            if (shift === 'Available (Shift 2)') return 'Available (All day)';
            return 'Unavailable';
          }
          return shift;
        })
      );
      return newShiftData;
    });
  };

  const dateHeaders = ['Mon 7', 'Tue 8', 'Wed 9', 'Thu 10', 'Fri 11', 'Sat', 'Sun'];




  return (
    <>
      <ProfileContainer>
        <ProfileImage src={defaultPersonIcon} alt={`${employee.name}`} />
        <InfoSection>
          <InfoItem>
            <span>Name:</span>
            <span>{employee.name}</span>
          </InfoItem>
          <InfoItem>
            <span>Email:</span>
            <span>{employee.email}</span>
          </InfoItem>
          <InfoItem>
            <span>Department:</span>
            <span>{employee.department}</span>
          </InfoItem>
          <InfoItem>
            <span>Role:</span>
            <span>{employee.role}</span>
          </InfoItem>
          <InfoItem>
            <span>Needs Child Care:</span>
            <span>{employee.needsChildCare ? 'Yes' : 'No'}</span>
          </InfoItem>
          <InfoItem>
            <span>Prefers Overtime:</span>
            <span>{employee.prefersOvertime ? 'Yes' : 'No'}</span>
          </InfoItem>
        </InfoSection>
        <EditButton>Edit</EditButton>
      </ProfileContainer>
      <ScheduleTable>
        {/* Överskrifter */}
        <TableHeader>Week</TableHeader>
        {dateHeaders.map((date) => (
          <TableHeader key={date}>{date}</TableHeader>
        ))}

        {/* Rader för veckor */}
        {Array.from({ length: 4 }, (_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <TableCell>
              Week {rowIndex + 41} {/* Veckonummer */}
            </TableCell>
            {dateHeaders.map((_, dayIndex) => {
              const shiftType = shiftData[rowIndex][dayIndex];
              return (
                <TableCell key={`${rowIndex}-${dayIndex}`} onClick={() => handleShiftChange(rowIndex, dayIndex)}>
                  <StatusBox type={shiftType}>{shiftType}</StatusBox>
                </TableCell>
              );
            })}
          </React.Fragment>
        ))}
      </ScheduleTable>
      <Footer>
            <Input placeholder="Send a message..." />
            <SendButton>➔</SendButton>
          </Footer>
      

    </>
  );
};

export default EmployeeProfile;
