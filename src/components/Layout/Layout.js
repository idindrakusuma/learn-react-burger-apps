import React from 'react';
/* own component */
import Aux from '../../hoc/Aux';
/* style css */
import classes from './Layout.css'

const layout = (props) => (
  <Aux>
    <div> Toolbar, SideDrawer, Backdrop </div>
    <main className={classes.Content}>
      { props.children }
    </main>
  </Aux>
) 

export default layout;