import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import styled from 'styled-components';
import mainLogo from '../img/logo.png';

const { Text } = Typography;

const PageTitle: React.FC = () => (
  <StyledLink to="/main">
    <StyledTitleContainer>
      <StyledLogo src={mainLogo} alt="mainLogo" />
      <StyledText>EverOak Education</StyledText>
    </StyledTitleContainer>
  </StyledLink>
);

export default PageTitle;

const StyledLink = styled(Link)`
  margin-right: auto;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLogo = styled.img`
  width: 40px;
  margin-right: 16px;
`;

const StyledText = styled(Text)`
  font-size: 20px;
`;
