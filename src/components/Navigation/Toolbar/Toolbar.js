import React from 'react';

import clasess from './Toolbar.css';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
  <header className={clasess.Toolbar}>
    <div> MENU </div>
    <Logo />
    <nav>
      <NavigationItems/>
    </nav>
  </header>
);

export default toolbar;