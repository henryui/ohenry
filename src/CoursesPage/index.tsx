import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography, message, Spin, Button } from 'antd';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TitleBackground from '../common/TitleBackground';
import { StyledContainer } from '../common/StyledComponents';
import { CourseInfo } from './types';
import CourseBooks from './CourseBooks';
import CourseDescription from './CourseDescription';
import CourseRating from './CourseRating';
import WeeklyCalendar from './WeeklyCalendar';

const { Text } = Typography;

const TEMP: CourseInfo = {
  newCollection: true,
  name: 'Get Ready High School',
  notice: 'Senior Class Only (grade 8+)',
  description:
    'It is here! The course that will prepare students to think on a high school level. \nThe selected books for this course contain mature themes and intended for advanced readers. It is recommended for students grade 8 and up. This course will cover analysis, epic poetry, and Shakespeare. \nIf this is your first time in EverOak, please consult via email if you wish to enroll in this one.',
  rating: {
    grade: 'Senior High',
  },
  classTimes: [
    {
      MON: ['10:00', '11:15'],
      WED: ['10:00', '11:15'],
      FRI: ['10:00', '11:15'],
    },
    {
      MON: ['17:45', '19:00'],
      WED: ['17:45', '19:00'],
      FRI: ['17:45', '19:00'],
    },
  ],
  bookList: [
    {
      bookShelfName: 'Senior High Course (grade 8+)',
    },
  ],
  enrollName: 'Senior High',
};

const CoursesPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState<CourseInfo>();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<CourseInfo>(
          `/api/classroom/${courseId}`,
        );
        setCourseInfo(data);
      } catch {
        message.error('Error fetching course data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  return loading || !courseInfo ? (
    <Spin size="large" />
  ) : (
    <>
      <TitleBackground
        topSubTitle={courseInfo.newCollection ? 'New Collection' : undefined}
        title={courseInfo.name}
        whiteText
      />
      <StyledNotice>
        <StyledNoticeText>
          *Registered students do not have to buy any books for themselves. Upon
          Enrollment, EverOak Education will send books prior to beginning of
          classes.
        </StyledNoticeText>
      </StyledNotice>
      <StyledContainer>
        <CourseDescription courseInfo={courseInfo} />
        <CourseRating courseInfo={courseInfo} />
        <StyledEnroll size="large" onClick={() => navigate('/registration')}>
          Enroll in {courseInfo.enrollName} Classes
        </StyledEnroll>
        <WeeklyCalendar courseInfo={courseInfo} />
        <CourseBooks courseInfo={courseInfo} />
      </StyledContainer>
    </>
  );
};

export default CoursesPage;

const StyledEnroll = styled(Button)`
  font-size: 16px;
`;

const StyledNotice = styled.div`
  padding: 30px 10vw;
  width: 100%;
  background-color: #eee;
`;

const StyledNoticeText = styled(Text)`
  font-size: 16px;
`;
