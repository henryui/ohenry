import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { MAIN_HEADER_HEIGHT } from '@constants';

const { Text } = Typography;

export type HeaderItem = {
  key: string;
  label: string;
  link?: string;
  onClick?: () => Promise<void> | void;
  disabled?: boolean;
};

interface HeaderDropdownProps {
  items: HeaderItem[];
  labelName: string;
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  items,
  labelName,
}) => {
  const anchorRef = useRef(null);
  const [visible, setVisible] = useState(false);
  return (
    <StyledDropdown>
      <Dropdown
        overlay={
          <Menu>
            {items.map(item => (
              <StyledMenuItem key={item.key} $isDisabled={item.disabled}>
                {item.onClick ? (
                  <StyledMenuLabel
                    onClick={item.onClick}
                    $isDisabled={item.disabled}
                  >
                    {item.label}
                  </StyledMenuLabel>
                ) : (
                  <Link to={item.link}>
                    <StyledMenuLabel $isDisabled={item.disabled}>
                      {item.label}
                    </StyledMenuLabel>
                  </Link>
                )}
              </StyledMenuItem>
            ))}
          </Menu>
        }
        visible={visible}
        onVisibleChange={vis => setVisible(vis)}
        trigger={['hover']}
        placement="bottomLeft"
        getPopupContainer={() => anchorRef?.current}
      >
        <StyledLabelContainer>
          <StyledButtonLabel>{labelName}</StyledButtonLabel>
          <DownOutlined />
        </StyledLabelContainer>
      </Dropdown>
      <div ref={anchorRef} />
    </StyledDropdown>
  );
};

export default HeaderDropdown;

const StyledDropdown = styled.div`
  margin-right: 24px;
`;

const StyledButtonLabel = styled(Text)`
  font-size: 16px;
  margin-right: 5px;
`;

const StyledMenuItem = styled(Menu.Item)<{ $isDisabled?: boolean }>`
  ${({ $isDisabled }) => $isDisabled && 'background-color: #eee;'}
`;

const StyledMenuLabel = styled(Text)<{ $isDisabled?: boolean }>`
  font-size: 16px;
  padding: 0 15px;
  line-height: 1.8;
  ${({ $isDisabled }) => $isDisabled && 'color: #888;'}
`;

const StyledLabelContainer = styled.div`
  && {
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    height: ${MAIN_HEADER_HEIGHT}px;
  }
`;
