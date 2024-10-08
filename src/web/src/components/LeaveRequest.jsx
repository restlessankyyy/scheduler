import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const LeaveRequestContainer = styled.section`
  background-color: #f9e5e5;
  padding: 1rem;
  border-radius: 8px;
`;

const LeaveRequest = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Leave Request Data:', data);
  };

  return (
    <LeaveRequestContainer>
      <h2>Leave Request</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Reason for Leave:</label>
          <input {...register('leaveReason')} placeholder="Sick leave, personal, etc." />
        </div>
        <div>
          <label>Leave Dates:</label>
          <input type="date" {...register('leaveStart')} />
          <input type="date" {...register('leaveEnd')} />
        </div>
        <div>
          <label>Status:</label>
          <select {...register('leaveStatus')}>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
          </select>
        </div>
        <input type="submit" value="Submit Leave Request" />
      </form>
    </LeaveRequestContainer>
  );
};

export default LeaveRequest;
