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
    idToken: authData.idToken,
    userId: authData.localId,
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTime = (expiredIn) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout())
    }, expiredIn * 1000);
  }
}

export const auth = (email, password, isSigup) => {
  return dispatch => {
    dispatch(authStart());
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
        dispatch(checkAuthTime(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFailed(err.response.data.error));
      })
  }
}