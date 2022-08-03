import React from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import mainEnrol from '../../img/mainEnrol.png';
import descriptionImg from '../../img/description1.jpeg';
import BannerCarousel from './BannerCarousel';

const ImagesContainer: React.FC = () => (
  <StyledImagesContainer>
    <StyledEnrolImg src={mainEnrol} alt="mainEnrol" />
    <StyledDescriptionImg src={descriptionImg} alt="descriptionImg" />
    <Divider style={{ borderWidth: '2px' }} />
    <BannerCarousel />
  </StyledImagesContainer>
);

export default ImagesContainer;

const StyledImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10vw;
`;

const StyledEnrolImg = styled.img`
  width: 100%;
  margin-bottom: 40px;
`;

const StyledDescriptionImg = styled.img`
  width: 80%;
  margin-bottom: 40px;
`;
