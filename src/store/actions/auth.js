import * as actionTypes from "./actionTypes"
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  }
  return (dispatch) => {
    dispatch(authStart())
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCqV1sNWJdKO93Trl5pJloxpNNRKM5-LE', authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data))
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error))
      })
  }
}