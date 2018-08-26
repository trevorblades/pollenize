import {createAction} from 'redux-actions';

export const logIn = createAction('USER_LOG_IN');
export const logOut = createAction('USER_LOG_OUT');
export const renew = createAction('USER_RENEW');
export const create = createAction('USER_CREATE');
export const success = createAction('USER_SUCCESS');
export const failure = createAction('USER_FAILURE');
