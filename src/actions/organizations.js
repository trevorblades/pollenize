import {createAction} from 'redux-actions';

export const load = createAction('ORGANIZATIONS_LOAD');
export const success = createAction('ORGANIZATIONS_SUCCESS');
export const failure = createAction('ORGANIZATIONS_FAILURE');
