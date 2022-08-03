import React, { useContext } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import BooksContext from './BooksContext';

const BookSearch: React.FC = () => {
  const { searchText, setSearchText, searchBarRef } = useContext(BooksContext);
  return (
    <>
      <div ref={searchBarRef} />
      <StyledInputContainer>
        <Input
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
          size="large"
          placeholder="Search by Book Name"
          prefix={<SearchOutlined />}
        />
      </StyledInputContainer>
    </>
  );
};

export default BookSearch;

const StyledInputContainer = styled.div`
  margin: 40px 10vw;
`;
