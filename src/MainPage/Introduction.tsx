import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const Introduction: React.FC = () => (
  <StyledIntroContainer>
    <StyledIframeContainer>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/HPNlOD5FXAo`}
        frameBorder="0"
        allowFullScreen
        title="Embedded youtube"
      />
    </StyledIframeContainer>
    <Title level={3}>EverOak's Mission</Title>
    <StyledDescription>
      Students today are expected to engage in both online and offline learning
      with social interactions. However, many pre-teens and teens struggle to
      find authentic connection and communities. EverOak proposes a fun and
      encouraging environment for kids to discover adventure through reading,
      learn different history and culture while building community at the same
      time. We believe books open up a vast world that fosters empathy and
      resilience.
    </StyledDescription>
  </StyledIntroContainer>
);

export default Introduction;

const StyledIntroContainer = styled.div`
  background-color: #ededed;
  padding: 40px 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledIframeContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 40px;
`;

const StyledDescription = styled(Text)`
  font-size: 16px;
`;
