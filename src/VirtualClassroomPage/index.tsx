import React from 'react';
import styled from 'styled-components';
import TitleBackground from '../common/TitleBackground';
import { StyledContainer } from '../common/StyledComponents';
import googleClassIcons from '../img/googleClassIcons.png';
import ClassDescriptions from './ClassDescriptions';
import ClassPrep from './ClassPrep';
import ClassWork from './ClassWork';

const VirtualClassroomPage: React.FC = () => (
  <>
    <TitleBackground title="Virtual Classroom" whiteText />
    <StyledContainer>
      <StyledGoogleImg src={googleClassIcons} alt="googleUtils" />
      <ClassDescriptions />
      <ClassPrep />
      <ClassWork />
    </StyledContainer>
  </>
);

export default VirtualClassroomPage;

const StyledGoogleImg = styled.img`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 70px;
`;
