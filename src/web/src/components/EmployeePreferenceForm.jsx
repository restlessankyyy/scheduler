import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const PreferenceFormContainer = styled.section`
  background-color: #f9e5e5;
  padding: 1rem;
  border-radius: 8px;
`;

const EmployeePreferenceForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Preference Form Data:', data);
  };

  return (
    <PreferenceFormContainer>
      <h2>Employee Preferences</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Preferred Shift Time:</label>
          <input {...register('preferredShift')} placeholder="Example: 08.00 - 16.00" />
        </div>
        <div>
          <label>Unavailable Times:</label>
          <input {...register('unavailableTimes')} placeholder="Example: After 15.00 on Fridays" />
        </div>
        <input type="submit" value="Submit Preferences" />
      </form>
    </PreferenceFormContainer>
  );
};

export default EmployeePreferenceForm;
