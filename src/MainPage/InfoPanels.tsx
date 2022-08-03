import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { useResize } from 'helpers';
import mainClassroom from '../img/mainClassroom.png';
import mainPen from '../img/mainPen.png';
import mainBulb from '../img/mainBulb.png';
import mainHearts from '../img/mainHearts.png';

const { Text, Title } = Typography;

const information = [
  {
    src: mainClassroom,
    title: 'Small, Interactive Classrooms',
    description:
      "Small, live interactive classes caters toward students level as education is discovered together amongst peers. A teacher will facilitate discussions and teach themes and concepts to further enhance a student's discovery and learning. The small classroom also provides accountability to encourage one another.",
  },
  {
    src: mainPen,
    title: 'Increase Language Proficiency',
    description:
      'Studies show that when students read more, they acquire the skills to focus their attention on the meaning of the text. Students will expand on vocabulary by continuous exposure to unfamiliar words and phrases in a variety of contexts. They will gain writing proficiency as well as both listening and speaking abilities too.',
  },
  {
    src: mainBulb,
    title: 'Autonomous Learning',
    description:
      'Autonomous learners show reading awareness and motivation. Students become autonomous learners as they read more extensively. They can improve their reading comprehension when they learn to select reading topics and level of reading on their own.',
  },
  {
    src: mainHearts,
    title: 'Develop Empathy',
    description:
      'Studies show extensive readers are subject to develop more empathy. Books that display unique lives and backgrounds of diverse protagonists allows the student to connect deeper with others and the world.',
  },
];

const InfoPanels: React.FC = () => {
  const { md } = useResize();

  return (
    <StyledPanelGrid $md={md}>
      {information.map((info, index) => (
        <StyledPanel key={`main-info-${index}`}>
          <StyledImg src={info.src} alt={`mainInfo${index}`} />
          <StyledInfo>
            <Title level={3}>{info.title}</Title>
            <StyledDescription>{info.description}</StyledDescription>
          </StyledInfo>
        </StyledPanel>
      ))}
    </StyledPanelGrid>
  );
};

export default InfoPanels;

const StyledPanelGrid = styled.div<{ $md?: boolean }>`
  padding: 40px 10vw;
  display: grid;
  grid-template-columns: ${({ $md }) => ($md ? '1fr 1fr' : '1fr')};
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const StyledPanel = styled.div<{ $md?: boolean }>`
  width: ${({ $md }) => ($md ? 'calc(50% - 10px)' : '100%')};
  display: flex;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 35%;
`;

const StyledInfo = styled.div`
  width: 65%;
`;

const StyledDescription = styled(Text)`
  margin-top: 25px;
`;
