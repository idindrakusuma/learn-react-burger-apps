import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          toggleMenuClicked={this.sideDrawerToggleHandler} />
        <SideBar
          isAuth={this.props.isAuthenticated}
          show={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          { this.props.children }
        </main>
      </Aux>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps) (Layout);