import React from 'react';

import classes from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';


const sideDrawer = (props) => {
  let attachedClass = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClass = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed}/>
      <div className={attachedClass.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;