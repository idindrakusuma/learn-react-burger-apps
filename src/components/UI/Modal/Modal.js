import React, { Component } from 'react';

import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  
  /* make sure show is changed before you re-render modal */
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.show !== nextProps.show || nextProps.children !== this.props.children;
  }

  componentDidUpdate () {
    console.log('[Modal.js] componentDidUpdate');
  }

  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div 
          className={classes.Modal} 
          style={{ 
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
            }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;