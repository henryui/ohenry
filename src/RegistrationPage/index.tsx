import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';
import summerPage from '../img/summer2022.jpeg';
import TitleBackground from '../common/TitleBackground';
import LayoutContext from '../LayoutContext';
import { FormContextProvider } from './FormContext';
import ImportantNote from './ImportantNote';
import RegistrationInfo from './RegistrationInfo';
import StudentForm from './StudentForm';

const RegistrationPage: React.FC = () => {
  const { currentUser } = useContext(LayoutContext);
  if (!currentUser) {
    message.error('Please SignUp / LogIn in order to register.');
    return <Navigate replace to="/main" />;
  }
  return (
    <FormContextProvider>
      <TitleBackground
        title="Registration Summer 2022"
        background={summerPage}
        opacity="0.8"
        whiteText
      />
      <StyledContainer>
        <ImportantNote />
        <RegistrationInfo />
        <StudentForm />
      </StyledContainer>
    </FormContextProvider>
  );
};

export default RegistrationPage;

const StyledContainer = styled.div`
  padding: 40px 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
