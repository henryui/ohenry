import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Text } = Typography;

const ImportantNote: React.FC = () => (
  <StyledDescription>
    *Please note that times may be subject to change depending on the number of
    students per class. Scheduling will be first come, first served basis until
    proof of payment and each student is only allowed to register for one class.
    Spots are limited, and the maximum for each class is 5 students. Spots will
    be saved for one week until payment is received. Otherwise, spots may go to
    other students who submitted payment. We will do our best to accommodate
    with flexibility and permission from other students. Newcomers are
    recommended to do the Modern classes.
  </StyledDescription>
);

export default ImportantNote;

const StyledDescription = styled(Text)`
  font-size: 14px;
`;
