import React from 'react';
import HeaderDropdown, { HeaderItem } from './HeaderDropdown';

const loginGoogle = () => {
  window.open('/auth/google', '_self');
};

const items: HeaderItem[] = [
  {
    key: 'tuition',
    label: "Tuition & Teacher's Bio",
    link: '/tuition',
  },
  {
    key: 'questions',
    label: 'FAQs',
    link: '/questions',
  },
  {
    key: 'login',
    label: 'LogIn with Google',
    onClick: loginGoogle,
  },
];

const MoreInfoMenu: React.FC = () => (
  <HeaderDropdown items={items} labelName="More" />
);

export default MoreInfoMenu;
