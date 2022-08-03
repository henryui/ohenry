import React from 'react';
import bookPage from '../img/bookPage.png';
import TitleBackground from '../common/TitleBackground';
import { BooksContextProvider } from './BooksContext';
import BooksList from './BooksList';
import BookSearch from './BookSearch';

const description =
  '*Registered students do not have to buy any books for themselves, they will be delivered prior to beginning of classes.';

const BooksPage: React.FC = () => (
  <BooksContextProvider>
    <TitleBackground
      title="List of Books"
      description={description}
      background={bookPage}
      opacity="0.5"
      whiteText
    />
    <BookSearch />
    <BooksList />
  </BooksContextProvider>
);

export default BooksPage;
