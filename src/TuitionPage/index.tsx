import React from 'react';
import TitleBackground from '../common/TitleBackground';
import TuitionInfo from './TuitionInfo';
import TeachersBio from './TeachersBio';

const TuitionPage: React.FC = () => (
  <>
    <TitleBackground title="Tuition" whiteText />
    <TuitionInfo />
    <TeachersBio />
  </>
);

export default TuitionPage;
