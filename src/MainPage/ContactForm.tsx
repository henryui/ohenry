import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Text, Title } = Typography;

const ContactForm: React.FC = () => (
  <StyledForm>
    <Title level={3}>Questions?</Title>
    <StyledText>
      Contact bookclub@everoakeducation.com to get more information.
    </StyledText>
  </StyledForm>
);

export default ContactForm;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledDescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledDescriptionImg = styled.img`
  width: 30%;
`;

const StyledTextContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;

const StyledText = styled(Text)`
  font-size: 16px;
  margin-bottom: 10px;
`;
