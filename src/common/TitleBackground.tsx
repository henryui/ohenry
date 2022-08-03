import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface TitleBackgroundProps {
  titleLogo?: string;
  title: string;
  subTitle?: string;
  description?: string;
  background?: string;
  opacity?: string;
  whiteText?: boolean;
  topSubTitle?: string;
}

const TitleBackground: React.FC<TitleBackgroundProps> = ({
  titleLogo,
  title,
  subTitle,
  description,
  background,
  opacity,
  whiteText,
  topSubTitle,
}) => {
  const [pageOffset, setPageOffset] = useState(0);
  const onScroll = () => {
    const { pageYOffset } = window;
    setPageOffset(pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <StyledBackgroundContainer>
      {topSubTitle && (
        <StyledSubTitle $whiteText={whiteText}>{topSubTitle}</StyledSubTitle>
      )}
      <StyledTitleContainer>
        {titleLogo && <StyledLogo src={titleLogo} alt="mainBanner" />}
        <StyledTitle $whiteText={whiteText}>{title}</StyledTitle>
      </StyledTitleContainer>
      {subTitle && (
        <StyledSubTitle $whiteText={whiteText}>{subTitle}</StyledSubTitle>
      )}
      {description && (
        <StyledDescription $whiteText={whiteText}>
          {description}
        </StyledDescription>
      )}
      <StyledBackground
        $pageOffset={pageOffset}
        $background={background}
        $opacity={opacity}
      />
    </StyledBackgroundContainer>
  );
};

export default TitleBackground;

const StyledBackgroundContainer = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
  position: relative;
  background-color: #212121;
  z-index: -2;
`;

const StyledBackground = styled.div<{
  $pageOffset: number;
  $background?: string;
  $opacity?: string;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  display: table-cell;
  top: 0;
  left: 0;
  position: absolute;
  z-index: -1;
  background-size: cover;
  background-position: center center;
  ${({ $background }) =>
    $background && `background-image: url(${$background});`}
  transform: translate3d(0px, ${({ $pageOffset }) => $pageOffset * 0.5}px, 0px);
  opacity: ${({ $opacity }) => $opacity || '1'};
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: no-wrap;
  padding-top: 20px;
`;

const StyledTitle = styled.div<{ $whiteText?: boolean }>`
  font-family: 'Signika Negative', sans-serif;
  font-size: 100px;
  color: ${({ $whiteText }) => ($whiteText ? 'white' : '#444')};
  margin-right: auto;
`;

const StyledSubTitle = styled.div<{ $whiteText?: boolean }>`
  font-family: 'Amatic SC', cursive;
  font-size: 40px;
  color: ${({ $whiteText }) => ($whiteText ? 'white' : '#444')};
`;

const StyledDescription = styled.div<{ $whiteText?: boolean }>`
  font-size: 16px;
  color: ${({ $whiteText }) => ($whiteText ? 'white' : '#444')};
`;

const StyledLogo = styled.img`
  width: 58px;
  margin-left: auto;
  margin-right: 40px;
`;
