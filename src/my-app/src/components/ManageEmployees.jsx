import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

const SortOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SortItem = styled.div`
  cursor: pointer;
  color: gray;
  &:hover {
    color: black;
  }
`;

const EmployeeList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const EmployeeCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: #f2f2f2;
  border-radius: 10px;
`;

const EmployeeImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const EmployeeInfo = styled.div`
  flex: 1;
`;

const EmployeeName = styled.h3`
  margin: 0;
`;

const EmployeeDetails = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: gray;
`;

const ProfileButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #45a049;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #367d3c;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
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

const ManageEmployees = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES_QUERY);
  const [employees, setEmployees] = useState([]);
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
          <Title>Manage your employees</Title>
          <Subtitle>Let me know if you need any help.</Subtitle>
        </div>
        <AddEmployeeButton onClick={() => navigate('/add-employee')}>Add employee</AddEmployeeButton>
      </HeaderSection>

      <SortOptions>
        <SortItem>Name ▼</SortItem>
        <SortItem>Location ▼</SortItem>
        <SortItem>Role ▼</SortItem>
        <SortItem>Availability ▼</SortItem>
        <SortItem>{employees.length} / 23 employees</SortItem>
      </SortOptions>

      <EmployeeList>
        {employees.map((employee) => (
          <EmployeeCard key={employee.id}>
            <EmployeeImage src={defaultPersonIcon} alt={`${employee.name}`} />
            <EmployeeInfo>
              <EmployeeName>{employee.name}</EmployeeName>
              <EmployeeDetails>{employee.department}</EmployeeDetails>
              <EmployeeDetails>{employee.city}, Sverige</EmployeeDetails>
            </EmployeeInfo>
            <ProfileButton>Profile</ProfileButton>
          </EmployeeCard>
        ))}
      </EmployeeList>

      <Footer>
        <Input placeholder="Send a message..." />
        <SendButton>➔</SendButton>
      </Footer>
    </Container>
  );
};

export default ManageEmployees;
