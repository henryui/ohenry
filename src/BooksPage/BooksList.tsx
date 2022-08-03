import React, { useContext } from 'react';
import styled from 'styled-components';
import { Divider, Pagination, Spin, Typography } from 'antd';
import addisonCooke from '../img/addisoncooke.jpeg';
import animalFarm from '../img/animalfarm.jpeg';
import BooksContext from './BooksContext';

const { Title, Text } = Typography;

// Find a File Store on server side
const BOOK_NAME_IMG: Record<string, string> = {
  'Addison Cooke and the Treasure of the Incas': addisonCooke,
  'Animal Farm': animalFarm,
};

const BooksList: React.FC = () => {
  const { loading, bookList, total, page, setPage, searchBarRef } =
    useContext(BooksContext);
  return (
    <StyledListContainer>
      {loading ? (
        <Spin size="large" />
      ) : (
        bookList.map(book => (
          <StyledBook key={book.name}>
            <StyledBookImg src={BOOK_NAME_IMG[book.name]} alt={book.name} />
            <StyledInfoContainer>
              <StyledTitle level={4}>{book.name}</StyledTitle>
              <StyledTextContainer>
                {Boolean(book.authors.length) && (
                  <>
                    <StyledText>{book.authors.join(', ')}</StyledText>
                    <StyledDivider type="vertical" />
                  </>
                )}
                <StyledText>{book.year}</StyledText>
                <StyledDivider type="vertical" />
                <StyledText>{book.themes.join(', ')}</StyledText>
                <StyledDivider type="vertical" />
                <StyledText>{book.pages} pages</StyledText>
                <StyledDivider type="vertical" />
                {Boolean(book.classrooms.length) && (
                  <StyledText>{book.classrooms.join(', ')}</StyledText>
                )}
              </StyledTextContainer>
              {book.description && <StyledText>{book.description}</StyledText>}
            </StyledInfoContainer>
          </StyledBook>
        ))
      )}
      <Pagination
        current={page}
        defaultPageSize={20}
        showSizeChanger={false}
        showQuickJumper={false}
        onChange={newPage => {
          searchBarRef?.current.scrollIntoView();
          setPage(newPage);
        }}
        total={total}
      />
    </StyledListContainer>
  );
};

export default BooksList;

const StyledListContainer = styled.div`
  margin: 30px 10vw;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
`;

const StyledBook = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

const StyledBookImg = styled.img`
  width: 15%;
  margin-right: 20px;
`;

const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const StyledDivider = styled(Divider)`
  && {
    background-color: #ccc;
    height: 1.3em;
  }
`;

const StyledTitle = styled(Title)`
  font-size: 20px;
`;

const StyledTextContainer = styled.div`
  margin-bottom: 15px;
  margin-top: 20px;
`;

const StyledText = styled(Text)`
  font-size: 16px;
`;
