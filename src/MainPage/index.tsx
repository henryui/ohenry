import React from 'react';
import styled from 'styled-components';
import background from '../img/pastel.png';
import mainBanner from '../img/mainBanner.png';
import TitleBackground from '../common/TitleBackground';
import ImagesContainer from './ImagesContainer';
import Introduction from './Introduction';
import InfoPanels from './InfoPanels';

const MainPage: React.FC = () => (
  <>
    <TitleBackground
      titleLogo={mainBanner}
      title="EverOak Book Club"
      subTitle="Building Communities Through Reading"
      background={background}
    />
    <ImagesContainer />
    <Introduction />
    <InfoPanels />
    <StyledTest>test</StyledTest>
  </>
);

export default MainPage;

const StyledTest = styled.div`
  margin: 100px;
`;
