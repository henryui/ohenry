import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { CourseInfo } from './types';

const { Title } = Typography;

interface CourseBooksProps {
  courseInfo: CourseInfo;
}

const CourseBooks: React.FC<CourseBooksProps> = ({ courseInfo }) => (
  <StyledDescription>
    {courseInfo.bookList.map(book => (
      <Fragment key={`course-book-${book.bookShelfName}`}>
        <Title level={2}>{book.bookShelfName}</Title>
        <StyledBooksImg src={book.booksImg} alt="books" />
      </Fragment>
    ))}
  </StyledDescription>
);

export default CourseBooks;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledBooksImg = styled.img`
  width: 100%;
  height: 400px;
  border: 1px solid black;
  margin-top: 50px;
  margin-bottom: 80px;
`;
