import React, { useEffect, useState, createContext, useRef } from 'react';
import axios from 'axios';
import { useTimeout } from 'helpers';
import { message } from 'antd';
import type { BookData } from './types';

type BooksContextType = {
  loading: boolean;
  bookList: BookData[];
  total: number;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  // Ref
  // eslint-disable-next-line no-undef
  searchBarRef: React.MutableRefObject<HTMLDivElement>;
};

const BooksContext = createContext<BooksContextType>(null);

export const BooksContextProvider: React.FC = ({ children }) => {
  // Status Updates
  const [loading, setLoading] = useState(true);

  // States
  const [bookList, setBookList] = useState<BookData[]>([]);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);

  // hooks
  const debouncedText = useTimeout(searchText, 800);

  // Refs
  // eslint-disable-next-line no-undef
  const searchBarRef = useRef<HTMLDivElement>();

  // Functions

  // # Region Private

  // # Region Public

  // Effects
  useEffect(() => {
    setPage(1);
  }, [debouncedText]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchBooks = async () => {
      try {
        setLoading(true);
        const {
          data: { books, totalCount },
        } = await axios.get<{ books: BookData[]; totalCount: number }>(
          '/api/books',
          {
            params: {
              text: debouncedText,
              page: page - 1,
            },
            cancelToken: source.token,
          },
        );
        setBookList(books);
        setTotal(totalCount);
        setLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          message.error('Error loading books');
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      source.cancel('Cancelled due to stale request');
    };
  }, [debouncedText, page]);

  return (
    <BooksContext.Provider
      value={{
        // Status Updates
        loading,
        // States
        bookList,
        total,
        searchText,
        setSearchText,
        page,
        setPage,
        // Functions
        // Ref
        searchBarRef,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContext;
