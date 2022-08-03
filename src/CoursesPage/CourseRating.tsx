import React from 'react';
import styled from 'styled-components';
import { Typography, Divider } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { CourseInfo } from './types';

const { Text, Title } = Typography;

interface CourseRatingProps {
  courseInfo: CourseInfo;
}

const CourseRating: React.FC<CourseRatingProps> = ({ courseInfo }) => (
  <>
    <StyledDescription>
      <StyledRatingContainer>
        <StyledCourseBubble alt="courseIcon" />
        <div>
          <StyledTitle>{courseInfo.rating.grade}</StyledTitle>
          <StyledFlex>
            <StyledRating>
              <StyledRatingDescription>
                <StyledText>Difficulty*:</StyledText>
              </StyledRatingDescription>
              <StyledRatingDescription>
                <StyledText>Educational:</StyledText>
              </StyledRatingDescription>
              <StyledRatingDescription>
                <StyledText>Fun:</StyledText>
              </StyledRatingDescription>
            </StyledRating>
            <StyledRating>
              <StyledRatingDescription>
                {Array(5)
                  .fill(1)
                  .map((_val, index) =>
                    index < (courseInfo.rating.difficulty || 0) ? (
                      <StyledStarFilled key={`difficulty-${index}`} />
                    ) : (
                      <StyledStarOutlined key={`difficulty-${index}`} />
                    ),
                  )}
              </StyledRatingDescription>
              <StyledRatingDescription>
                {Array(5)
                  .fill(1)
                  .map((_val, index) =>
                    index < (courseInfo.rating.educational || 0) ? (
                      <StyledStarFilled key={`educational-${index}`} />
                    ) : (
                      <StyledStarOutlined key={`educational-${index}`} />
                    ),
                  )}
              </StyledRatingDescription>
              <StyledRatingDescription>
                {Array(5)
                  .fill(1)
                  .map((_val, index) =>
                    index < (courseInfo.rating.fun || 0) ? (
                      <StyledStarFilled key={`fun-${index}`} />
                    ) : (
                      <StyledStarOutlined key={`fun-${index}`} />
                    ),
                  )}
              </StyledRatingDescription>
            </StyledRating>
          </StyledFlex>
        </div>
      </StyledRatingContainer>
      <StyledRatingExplanation>
        *More stars is more difficult
      </StyledRatingExplanation>
    </StyledDescription>
    <StyledDivider />
  </>
);

export default CourseRating;

const StyledDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledTitle = styled(Text)`
  font-size: 26px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const StyledRatingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledCourseBubble = styled.img`
  width: 15%;
  min-width: 100px;
  border: 1px solid black;
  margin-right: 30px;
`;

const StyledFlex = styled.div`
  display: flex;
`;

const StyledRating = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-right: 20px;
`;

const StyledRatingExplanation = styled(Text)`
  font-size: 10pt;
  margin-bottom: 10px;
`;

const StyledRatingDescription = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
  align-items: center;
`;

const StyledDivider = styled(Divider)`
  border-width: 3px;
  margin-top: 30px;
  margin-bottom: 40px;
`;

const StyledText = styled(Text)`
  font-size: 20px;
`;

const StyledStarFilled = styled(StarFilled)`
  width: 20px;
  height: 20px;
  color: #f7cc57;
  font-size: 25px;
  margin-bottom: 13px;
`;

const StyledStarOutlined = styled(StarOutlined)`
  width: 20px;
  height: 20px;
  color: #f7cc57;
  font-size: 25px;
  margin-bottom: 13px;
`;
