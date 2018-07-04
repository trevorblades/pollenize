import api from '../api';
import cookies from 'browser-cookies';
import {createAction} from 'redux-actions';

export const logIn = createAction('USER_LOG_IN');
export const logOut = createAction('USER_LOG_OUT', () => {
  api.jwt(null);
  cookies.erase('token');
});

export const success = createAction('USER_SUCCESS');
export const failure = createAction('USER_FAILURE');
