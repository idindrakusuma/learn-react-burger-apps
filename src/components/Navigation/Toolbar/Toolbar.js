import React from 'react';

import clasess from './Toolbar.css';

import Logo from '../../Logo/Logo'

const toolbar = (props) => (
  <header className={clasess.Toolbar}>
    <div> MENU </div>
    <Logo />
    <nav>
      ...
    </nav>
  </header>
);

export default toolbar;