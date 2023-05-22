import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilHome, cilSpeedometer } from '@coreui/icons';
import { CNavItem } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Genel Bakış',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
];

export default _nav;
