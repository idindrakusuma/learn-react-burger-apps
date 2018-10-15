import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

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

export const auth = (email, password, isSigup) => {
  return dispatch => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    /* what the method? */
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?';
    if (!isSigup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?'
    }
    axios.post(`${url}key=${API_KEY}`, authData)
      .then(res => {
        console.log(res.data);
        dispatch(authSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFailed(err));
      })
  }
}