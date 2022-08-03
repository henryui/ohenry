import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Text, Title } = Typography;

const ClassDescriptions: React.FC = () => (
  <StyledClassContainer>
    <Title level={3}>What are classes like?</Title>
    <StyledDescriptionContainer>
      {/* TODO: add image */}
      <StyledDescriptionImg alt="classroom1" src="" />
      <StyledTextContainer>
        <StyledText>
          Classes are comprised of 3-5 students with live discussion lead by a
          qualified teacher. 75 minutes for each class where students will be
          invited to discuss, engage and write analysis as teachers instruct
          them to think critically while reflecting upon personal experiences.
        </StyledText>
        <StyledText>
          Through the power of Google Classroom, students will be able to share
          their work which will inspire a sense of community and understanding.
          For the best participation, we encourage our students to login 5
          minutes before class starts with their cameras and mics turned on and
          their faces in the camera in all class sessions.
        </StyledText>
        <StyledText>
          Videos, team building exercises, and digital interactions via Jam
          board, live notetaking and games are used for the betterment of the
          education.
        </StyledText>
      </StyledTextContainer>
    </StyledDescriptionContainer>
  </StyledClassContainer>
);

export default ClassDescriptions;

const StyledClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledDescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledDescriptionImg = styled.img`
  width: 30%;
`;

const StyledTextContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;

const StyledText = styled(Text)`
  font-size: 16px;
  margin-bottom: 10px;
`;
