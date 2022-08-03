import React from 'react';
import styled from 'styled-components';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { MAIN_HEADER_HEIGHT } from '@constants';
import { LayoutContextProvider } from './LayoutContext';
import PageRedirect from './PageRedirect';
import MainPage from './MainPage';
import BooksPage from './BooksPage';
import RegistrationPage from './RegistrationPage';
import MainHeader from './MainHeader';
import TuitionPage from './TuitionPage';
import FAQPage from './FAQPage';
import VirtualClassroomPage from './VirtualClassroomPage';
import CoursesPage from './CoursesPage';

const Router: React.FC = () => (
  <>
    <HashRouter>
      <LayoutContextProvider>
        <PageRedirect />
        <MainHeader />
        <StyledMainContainer>
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/book-list" element={<BooksPage />} />
            <Route path="/tuition" element={<TuitionPage />} />
            <Route path="/questions" element={<FAQPage />} />
            <Route path="/courses/:courseId" element={<CoursesPage />} />
            <Route
              path="/virtual-classroom"
              element={<VirtualClassroomPage />}
            />
            <Route
              path="/registration/summer-2022"
              element={<RegistrationPage />}
            />
          </Routes>
        </StyledMainContainer>
      </LayoutContextProvider>
    </HashRouter>
  </>
);

export default Router;

const StyledMainContainer = styled.div`
  margin-top: ${MAIN_HEADER_HEIGHT}px;
`;
