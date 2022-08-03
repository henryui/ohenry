import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { StyledContainer } from '../common/StyledComponents';

const { Text, Title } = Typography;

const TuitionInfo: React.FC = () => (
  <StyledContainer>
    <StyledSubHeader level={4}>
      Early Bird Book Club Enrolment $385 CAD
    </StyledSubHeader>
    <StyledDescription>Please register online by June 6th.</StyledDescription>
    <StyledSubHeader level={4}>
      Late Registration Book Club Enrolment $435 CAD
    </StyledSubHeader>
    <StyledDescription>Must register online by July 1st.</StyledDescription>
    <StyledSubHeader level={5}>+ 4 Hard-Copy Books</StyledSubHeader>
    <StyledDescription $indent={20}>
      Tailored collection of hard-copy books curated for the student's reading
      level. EverOak believes in contributing to meaningful authors by reading
      their books and supporting them financially. We believe this will
      encourage more authors to write amazing books for the next generation to
      come.
    </StyledDescription>
    <StyledSubHeader level={5}>+24 Online Sessions</StyledSubHeader>
    <StyledDescription $indent={20}>
      Small classes with frequent meetings encourage students to engage with
      each other and the teacher. We want to maximize modern resources as
      teaching evolves into the digital age.
    </StyledDescription>
    <StyledSubHeader level={5}>+Professional Teachers</StyledSubHeader>
    <StyledDescription $indent={20}>
      Experienced professionals that have a passion for teaching pre-teens and
      teens that will conduct virtual classrooms and educate students. They will
      be teaching students how to extract the main idea, think critically and
      read efficiently.
    </StyledDescription>
    <StyledSubHeader level={5}>+EverOak Bookmarks</StyledSubHeader>
    <StyledDescription $indent={20}>
      Stylized book marks for your adventure into reading.
    </StyledDescription>
    <StyledSubHeader level={5}>
      +$50** or $25* Indigo/Barnes and Noble Gift Card
    </StyledSubHeader>
    <StyledDescription $indent={20}>
      *Students qualify by finishing all the books and assignments by the
      expected deadlines.
    </StyledDescription>
    <StyledDescription $indent={20}>
      **Entire class qualify together if everyone finished the books and
      assignments by expected deadlines.
    </StyledDescription>
  </StyledContainer>
);

export default TuitionInfo;

const StyledSubHeader = styled(Title)`
  width: 100%;
`;

const StyledDescription = styled(Text)<{ $indent?: number }>`
  font-size: 16px;
  display: block;
  margin-bottom: 20px;
  width: 100%;

  && {
    ${({ $indent }) => $indent && `${$indent}px;`}
  }
`;
