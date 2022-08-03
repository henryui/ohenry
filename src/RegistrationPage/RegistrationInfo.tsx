import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Text, Title } = Typography;

const RegistrationInfo: React.FC = () => (
  <StyledContainer>
    <Title level={2}>EverOak Registration Summer 2022</Title>
    <StyledDescription>
      Please fill in all the questions below. If you are registering more than
      one student, please register individually for each student.
    </StyledDescription>
    <StyledDescription>
      *Once you have registered, please send an e-transfer to{' '}
      <a href="mailto:everoak.bookclub@gmail.com">everoak.bookclub@gmail.com</a>
    </StyledDescription>
    <StyledDescription>
      Price:
      <br />
      $385 - Early bird (ends on June 6)
      <br />
      $435 (closes on July 1)
      <br />
    </StyledDescription>
  </StyledContainer>
);

export default RegistrationInfo;

const StyledContainer = styled.div`
  margin-top: 40px;
  border-radius: 10px;
  border: 1px solid #ddd;
  border-top: none;
  padding: 20px 25px;
  width: 100%;
  box-shadow: rgb(209, 202, 90) 0px 10px 0px inset;
`;

const StyledDescription = styled(Text)`
  font-size: 14px;
  display: block;
  margin-bottom: 20px;
`;
