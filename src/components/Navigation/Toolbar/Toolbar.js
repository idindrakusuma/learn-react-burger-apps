import React from 'react';

import clasess from './Toolbar.css';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
  <header className={clasess.Toolbar}>
    <DrawerToggle clicked={props.toggleMenuClicked}/>
    <div className={clasess.Logo}>
      <Logo />
    </div>
    <nav className={clasess.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
);

export default toolbar;