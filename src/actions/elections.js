import {createAction} from 'redux-actions';

export const load = createAction('ELECTIONS_LOAD');
export const success = createAction('ELECTIONS_SUCCESS');
export const failure = createAction('ELECTIONS_FAILURE');
