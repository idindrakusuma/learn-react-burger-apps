import React from 'react';
/* own component */
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideBar from '../Navigation/SideDrawer/SideDrawer';
/* style css */
import classes from './Layout.css'

const layout = (props) => (
  <Aux>
    <Toolbar />
    <SideBar />
    <main className={classes.Content}>
      { props.children }
    </main>
  </Aux>
) 

export default layout;