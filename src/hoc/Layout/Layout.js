import React, { Component } from 'react';
/* own component */
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideBar from '../../components/Navigation/SideDrawer/SideDrawer';
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