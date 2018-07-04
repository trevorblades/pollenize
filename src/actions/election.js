import {createAction} from 'redux-actions';

export const load = createAction('ELECTION_LOAD');
export const success = createAction('ELECTION_SUCCESS');
export const failure = createAction('ELECTION_FAILURE');
export const reset = createAction('ELECTION_RESET');
