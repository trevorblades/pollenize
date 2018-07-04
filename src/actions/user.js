import api from '../api';
import cookies from 'browser-cookies';
import {createAction} from 'redux-actions';
import {userFromToken} from '../util';

export const logIn = createAction('USER_LOG_IN');
export const logOut = createAction('USER_LOG_OUT', () => {
  api.jwt(null);
  cookies.erase('token');
});

export const renewToken = createAction('USER_RENEW_TOKEN');
export const success = createAction('USER_SUCCESS', token => {
  api.jwt(token);
  cookies.set('token', token);
  return userFromToken(token);
});

export const failure = createAction('USER_FAILURE');
