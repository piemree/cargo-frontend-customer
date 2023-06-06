import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilHome, cilPlus, cilSpeedometer, cilUser } from '@coreui/icons';
import { CNavItem } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Genel Bakış',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Profil',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Destek',
    to: '/support',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
];

export default _nav;
