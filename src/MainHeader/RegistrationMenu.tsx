import React from 'react';
import HeaderDropdown, { HeaderItem } from './HeaderDropdown';

const items: HeaderItem[] = [
  {
    key: 'summer2022',
    label: 'Summer 2022',
    link: '/summer-2022',
  },
  {
    key: 'spring2022',
    label: 'Spring 2022',
    link: '/spring-2022',
  },
  {
    key: 'winter2022',
    label: 'Winter 2022',
    link: '/winter-2022',
  },
];

const RegistrationMenu: React.FC = () => (
  <HeaderDropdown
    items={items.map(item => ({
      ...item,
      link: `/registration${item.link}`,
    }))}
    labelName="Registration"
  />
);

export default RegistrationMenu;
