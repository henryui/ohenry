import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { StyledContainer } from '../common/StyledComponents';
import estherPicture from '../img/esther.jpeg';
import juliePicture from '../img/julie.jpeg';
import willyPicture from '../img/willy.jpeg';

const { Text, Title } = Typography;

// TODO: make this teacher collection
const teachers = [
  {
    name: 'Esther Koh',
    pictureSrc: estherPicture,
    pictureAlt: 'esther',
    description:
      'University of Toronto graduate majoring in Human Bio and double Minoring in Spanish and Sociology. TESL certified, fluent in English, Korean and Spanish. 14 years experience in 1-1 Tutoring. She loves teaching pre-teens and being able to engage in deep conversations with her students. She loves mystery books and every night she reads to keep adding to her collection.',
    favBook: 'Crime and Punishment',
  },
  {
    name: 'Julie Lee',
    pictureSrc: juliePicture,
    pictureAlt: 'julie',
    description:
      'McMaster University graduate majoring in Psychology. Completed Teacher certification and is a member of OCT. Currently working as Primary/Junior/Intermediate certified teacher at TDSB and has 1-1 tutoring experience in multiple subject areas. Fluent in English and Korean. Loves connecting with students of all backgrounds and enjoys providing fun and engaging programs.',
    favBook: 'The Hobbit',
  },
  {
    name: 'Willy Yang',
    pictureSrc: willyPicture,
    pictureAlt: 'willy',
    description:
      'University of Toronto graduate double majoring in Economics and Geography. Specializes in social sciences, history and literally analysis and years of experience engaging students up to high school with studies and preparation. His forte is in captivating students with live discussions and meaningful conversation. Communicates in English and Mandarin. During free time, he loves to strum on a guitar and teach new friends how to play board games.',
    favBook: 'Hamlet',
  },
];

const TeachersBio: React.FC = () => (
  <>
    <StyledTitleBg>
      <StyledSubHeader level={1}>Teacher's Bio</StyledSubHeader>
    </StyledTitleBg>
    <StyledContainer>
      <StyledIntroContainer>
        {teachers.map(teacher => (
          <StyledProfile key={`teacher-${teacher.pictureAlt}`}>
            <StyledProfilePicture
              src={teacher.pictureSrc}
              alt={teacher.pictureAlt}
            />
            <StyledName>{teacher.name}</StyledName>
            <StyledText>{teacher.description}</StyledText>
            <StyledText>Favourite book:</StyledText>
            <StyledText>{teacher.favBook}</StyledText>
          </StyledProfile>
        ))}
      </StyledIntroContainer>
    </StyledContainer>
  </>
);

export default TeachersBio;

const StyledTitleBg = styled.div`
  height: 160px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #555;
`;

const StyledSubHeader = styled(Title)`
  && {
    color: white;
    font-size: 50px;
    margin-bottom: 0;
  }
`;

const StyledIntroContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 30%;
  min-width: 220px;
`;

const StyledProfilePicture = styled.img`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledName = styled(Text)`
  font-size: 22px;
  margin-bottom: 20px;
`;

const StyledText = styled(Text)`
  font-size: 16px;
  margin-bottom: 10px;
`;
