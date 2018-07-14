import api from '../api';
import store from 'store';
import {TOKEN_KEY} from '../constants';
import {createAction} from 'redux-actions';
import {userFromToken} from '../util';

export const logIn = createAction('USER_LOG_IN');
export const logOut = createAction('USER_LOG_OUT', () => {
  api.jwt(null);
  store.remove(TOKEN_KEY);
});

export const renewToken = createAction('USER_RENEW_TOKEN');
export const success = createAction('USER_SUCCESS', token => {
  api.jwt(token);
  store.set(TOKEN_KEY, token);
  return userFromToken(token);
});

export const failure = createAction('USER_FAILURE');
