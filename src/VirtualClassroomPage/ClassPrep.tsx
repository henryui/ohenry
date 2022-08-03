import React from 'react';
import styled from 'styled-components';
import { Timeline, Typography } from 'antd';

const { Text, Title } = Typography;

const { Item: TimelineItem } = Timeline;

const ClassPrep: React.FC = () => (
  <StyledClassContainer>
    <Title level={3}>Checklist before the first class:</Title>
    <StyledDescriptionContainer>
      {/* TODO: add image */}
      <StyledDescriptionImg alt="classroom2" src="" />
      <StyledPointsContainer>
        <Timeline>
          <TimelineItem>
            <StyledText>Have a Gmail account</StyledText>
          </TimelineItem>
          <TimelineItem>
            <StyledText>
              Make sure you have a working camera, earbuds, and a mic for the
              computer / tablet
            </StyledText>
          </TimelineItem>
          <TimelineItem>
            <StyledText>Paper and pencil for note taking</StyledText>
          </TimelineItem>
          <TimelineItem>
            <StyledText>
              Double check the Meeting Link (find it under classwork, titled
              Meet Link) & time
            </StyledText>
          </TimelineItem>
          <TimelineItem>
            <StyledText>Comment on the latest post</StyledText>
          </TimelineItem>
        </Timeline>
      </StyledPointsContainer>
    </StyledDescriptionContainer>
  </StyledClassContainer>
);

export default ClassPrep;

const StyledClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`;

const StyledDescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

const StyledDescriptionImg = styled.img`
  width: 30%;
`;

const StyledPointsContainer = styled.div`
  width: 65%;
`;

const StyledText = styled(Text)`
  font-size: 16px;
`;
