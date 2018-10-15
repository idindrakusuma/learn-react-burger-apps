import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';
require('dotenv').config();

const API_KEY = 'AIzaSyCKl3ULtVkcPpZMwuRBdrfYM_6edVbf4dw';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  }
}

export const auth = (email, password) => {
  return dispatch => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    console.log(authData);
    axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`, authData)
      .then(res => {
        dispatch(authSuccess(res.data));
      })
      .catch(err => {
        dispatch(authFailed(err));
      })
  }
}