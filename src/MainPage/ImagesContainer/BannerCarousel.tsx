import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import banner1 from '../../img/banner1.png';
import banner2 from '../../img/banner2.png';
import banner3 from '../../img/banner3.png';
import banner4 from '../../img/banner4.jpeg';
import banner5 from '../../img/banner5.png';
import banner6 from '../../img/banner6.png';
import banner7 from '../../img/banner7.png';
import banner8 from '../../img/banner8.jpeg';
import banner9 from '../../img/banner9.png';
import banner10 from '../../img/banner10.jpeg';

const carouselImages = [
  {
    src: banner1,
    link: '/get-ready',
  },
  {
    src: banner2,
    link: '/canadian-modern',
  },
  {
    src: banner3,
    link: '/english-learners',
  },
  {
    src: banner4,
    link: '/around-the-world',
  },
  {
    src: banner5,
    link: '/kings',
  },
  {
    src: banner6,
    link: '/metamorphosis',
  },
  {
    src: banner7,
    link: '/classic-readings',
  },
  {
    src: banner8,
    link: '/the-road',
  },
  {
    src: banner9,
    link: '/newbery-medal',
  },
  {
    src: banner10,
  },
];

const BannerCarousel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledCarouselContainer>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        centerMode
        centerSlidePercentage={20}
        infiniteLoop
        interval={5000}
        transitionTime={1500}
        onClickItem={index => {
          if (carouselImages[index].link) {
            navigate(carouselImages[index].link);
          }
        }}
      >
        {carouselImages.map((image, index) => (
          <StyledBanner
            key={`main-banner-${index}`}
            src={image.src}
            alt={`banner${index}`}
            $clickable={Boolean(carouselImages[index].link)}
          />
        ))}
      </Carousel>
    </StyledCarouselContainer>
  );
};

export default BannerCarousel;

const StyledBanner = styled.img<{ $clickable?: boolean }>`
  margin-bottom: 40px;
  ${({ $clickable }) => $clickable && 'cursor: pointer;'}
`;

const StyledCarouselContainer = styled.div`
  margin: 40px 0;
  && {
    .carousel img {
      pointer-events: auto;
      width: 90%;
    }
  }
`;
