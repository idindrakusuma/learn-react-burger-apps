import React, { Component } from 'react';
/* own component */
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideBar from '../Navigation/SideDrawer/SideDrawer';
/* style css */
import classes from './Layout.css'

class Layout extends Component {
  state = {
    showSideDrawer: false,
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  /* make function syncronous */
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !this.state.showSideDrawer }
    })
  }

  render () {
    return (
      <Aux>
        <Toolbar toggleMenuClicked={this.sideDrawerToggleHandler} />
        <SideBar show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          { this.props.children }
        </main>
      </Aux>
    );
  }
};

export default Layout;