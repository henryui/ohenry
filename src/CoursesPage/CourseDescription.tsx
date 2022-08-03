import React from 'react';
import styled from 'styled-components';
import { Typography, Divider } from 'antd';
import { CourseInfo } from './types';

const { Text, Title } = Typography;

interface CourseDescripionProps {
  courseInfo: CourseInfo;
}

const CourseDescripion: React.FC<CourseDescripionProps> = ({ courseInfo }) => (
  <>
    <StyledDescription>
      <Title level={2}>
        Course Description {courseInfo.notice ? `*${courseInfo.notice}` : ''}
      </Title>
      {courseInfo.description.split('\n').map((text, textIndex) => (
        <StyledText key={`course-description-${textIndex}`}>{text}</StyledText>
      ))}
    </StyledDescription>
    <StyledDivider />
  </>
);

export default CourseDescripion;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledText = styled(Text)`
  font-size: 16px;
  margin-bottom: 10px;
`;

const StyledDivider = styled(Divider)`
  border-width: 3px;
  margin-top: 30px;
  margin-bottom: 80px;
`;
