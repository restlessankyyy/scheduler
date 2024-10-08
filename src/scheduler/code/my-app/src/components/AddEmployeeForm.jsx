import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, gql } from '@apollo/client';
import styled from "styled-components";
import defaultPersonIcon from "../assets/profile.png";

const AddEmployeeFormContainer = styled.section`
  width: 513px;
`;

const ImageInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
  position: relative;
  border-radius: 50%;
  overflow: hidden;

  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InputField = styled.input`
  width: 513px;
  height: 64px;
  background-color: #f2f2f2;
  border-radius: 10px;
  border: none;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  display: block;
  width: 158px;
  height: 42px;
  margin: 1rem 0 0 auto;
  padding: 10px;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #8819c3;
  }
`;

const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CreateEmployee(
    $name: String!
    $email: String!
    $needsChildCare: Boolean
    $prefersOvertime: Boolean
    $role: String
    $department: String
    $availability: [String!]!
    $overtimePreferences: [String!]!
  ) {
    createEmployee(
      name: $name
      email: $email
      needsChildCare: $needsChildCare
      prefersOvertime: $prefersOvertime
      role: $role
      department: $department
      availability: $availability
      overtimePreferences: $overtimePreferences
    ) {
      id
      name
      email
    }
  }
`;

const AddEmployeeForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [profileImage, setProfileImage] = useState(null);

  const [createEmployee, { loading, error }] = useMutation(CREATE_EMPLOYEE_MUTATION, {
    onCompleted: () => {
      console.log('Employee added successfully!');
      alert('Employee added successfully!');
      reset();
      setProfileImage(null);
    },
    onError: (error) => {
      console.error('There was an error adding the employee:', error);
    }
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Spara bildens base64-data
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const variables = {
      ...data,
      availability: data.availability ? data.availability.split(',') : [],
      overtimePreferences: data.overtimePreferences ? data.overtimePreferences.split(',') : [],
      needsChildCare: data.needsChildCare === 'true',
      prefersOvertime: data.prefersOvertime === 'true'
    };

    createEmployee({ variables });
  };

  return (
    <AddEmployeeFormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageInputContainer>
          <img src={profileImage || defaultPersonIcon} alt="Profile" />
          <input type="file" onChange={handleImageChange} />
        </ImageInputContainer>

        <InputField {...register('name')} placeholder="Name" isNameField />
        <InputField {...register('email')} placeholder="Email" />
        <InputField {...register('role')} placeholder="Role" />
        <InputField {...register('department')} placeholder="Department" />
        <InputField {...register('availability')} placeholder="Availability (comma-separated)" />
        <InputField {...register('overtimePreferences')} placeholder="Overtime Preferences (comma-separated)" />

        <Button type="submit" disabled={loading}>Add Employee</Button>
        {/* {error && <p>Error: {error.message}</p>} */}
      </form>
    </AddEmployeeFormContainer>
  );
};

export default AddEmployeeForm;

