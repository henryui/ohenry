import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Text, Title } = Typography;

const ClassWork: React.FC = () => (
  <StyledClassContainer>
    <Title level={3}>Classwork</Title>
    <StyledWorkContainer>
      {/* TODO: add image and map items */}
      <StyledWork>
        <StyledDescriptionImg alt="class-work1" src="" />
        <StyledText>
          Number the Stars: Chapter summaries written together by students
        </StyledText>
      </StyledWork>
      <StyledWork>
        <StyledDescriptionImg alt="class-work2" src="" />
        <StyledText>
          The Band of Merry Kids: History and context of the book explained
        </StyledText>
      </StyledWork>
    </StyledWorkContainer>
  </StyledClassContainer>
);

export default ClassWork;

const StyledClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledWorkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

const StyledWork = styled.div`
  width: 47%;
  display: flex;
  flex-direction: column;
`;

const StyledDescriptionImg = styled.img`
  width: 100%;
`;

const StyledText = styled(Text)`
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 30px;
`;
