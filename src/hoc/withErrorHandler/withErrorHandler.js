import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHanlder = (WrapComponent, axios) => {
  return class extends Component {
    
    state = {
      error: null
    }

    componentWillMount () {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      })
      this.resInterceptors = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error })
      })
    }

    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    modalHandler = () => {
      this.setState({ error: null })
    }

    render () {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.modalHandler}>
            {this.state.error ? this.state.error.message : null } 
          </Modal>
          <WrapComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHanlder;