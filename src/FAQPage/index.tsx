import React, { useRef } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import TitleBackground from '../common/TitleBackground';
import { StyledContainer } from '../common/StyledComponents';

const { Text } = Typography;

// TODO: make this qna collection
const qna = [
  {
    question: 'What is the age group for the classes?',
    answers: [
      'We have two age groups: Junior Class (grade 4-6) and Senior Class (grade 7-8). We heavily encourage students to keep to their grade levels even if the student or the parents believe otherwise. If there are serious concerns, we suggest students to take an aptitude test. Send us an email to receive the test at bookclub@everoakeducation.com.',
    ],
  },
  {
    question: 'My child does not read often. Will they be able to keep up?',
    answers: [
      'We do synopsis each class to make sure every student is on the same page. As long as they do the reading, they can ask questions in class to keep up with what is going on in the book. EverOak is a community that encourages one another to keep up with the reading.',
    ],
  },
  {
    question: 'My child is ESL. Will they be able to keep up with the reading?',
    answers: [
      'We have an aptitude test for English language learners. Please email us at bookclub@everoakeducation.com to receive the aptitude test.',
      'If your child is in grades 7-8, they can join our English Learner Class. (Senior ELC)',
    ],
  },
  {
    question:
      'If my child is going to be in grade 7 in September and it is a Summer Term, do I enroll in Junior or Senior?',
    answers: [
      'If they are going to be in grade 7 in September, they can enroll in Senior. This also applies for grade 3 students going into grade 4 in the Summer who want to be enrolled in Junior Class.',
    ],
  },
  {
    question: 'How does the schedule differ from Summer to School term?',
    answers: [
      'Summer Classes happen 3 times a week during the day while during Fall, Winter and Spring terms, classes are after school hours, twice a week to accommodate with other school work.',
    ],
  },
  {
    question: 'Are there Holidays and breaks?',
    answers: ['No Classes on Aug 1 (Civic Holiday).'],
  },
  {
    question: 'How many terms does EverOak Book Club have?',
    answers: [
      'EverOak Book Club consists of 4 terms per year: Summer Term in July-August, Fall Term in September to early December and winter Term from January to March and Spring Term from April to June. The rest of the time is offered for 1-on-1 tutoring for specific developments and improvement for more focused help. Feel free to contact us for any specific needs.',
    ],
  },
  {
    question: 'Do you do 1-on-1 tutoring?',
    answers: [
      'Some time is offered for 1-on-1 tutoring for specific developments and improvement for more focused help.',
      'Our teachers provide 1-on-1 tutoring at a rate of $60/hour and minimum of 5 hour commitment.',
      'Feel free to contact us for any specific needs. Email us at bookclub@everoakeducation.com.',
    ],
  },
];

const TuitionPage: React.FC = () => {
  // eslint-disable-next-line no-undef
  const containerRefs = useRef<HTMLSpanElement[]>([]);

  return (
    <>
      <TitleBackground title="FAQs" whiteText />
      <StyledContainer>
        <StyledLinkContainer>
          {qna.map(({ question }, index) => (
            <StyledQuestionLink
              key={`question-link-${index}`}
              onClick={() => {
                containerRefs.current?.[index]?.scrollIntoView({
                  block: 'center',
                  behavior: 'smooth',
                });
              }}
            >
              {question}
            </StyledQuestionLink>
          ))}
        </StyledLinkContainer>
        <div>
          {qna.map(({ question, answers }, index) => (
            <StyledQNAContainer key={`question-${index}`}>
              <StyledQuestion
                ref={ref => {
                  containerRefs.current[index] = ref;
                }}
              >
                {question}
              </StyledQuestion>
              {answers.map((answer, aIndex) => (
                <StyledAnswer key={`answer-${index}-${aIndex}`}>
                  {answer}
                </StyledAnswer>
              ))}
            </StyledQNAContainer>
          ))}
        </div>
      </StyledContainer>
    </>
  );
};

export default TuitionPage;

const StyledLinkContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

const StyledQuestionLink = styled.a`
  font-size: 16px;
  margin-bottom: 10px;
`;

const StyledQNAContainer = styled.div`
  margin-bottom: 45px;
  display: flex;
  flex-direction: column;
`;

const StyledQuestion = styled(Text)`
  font-size: 20px;
  margin-bottom: 10px;
`;

const StyledAnswer = styled(Text)`
  font-size: 16px;
  margin-bottom: 10px;
`;
