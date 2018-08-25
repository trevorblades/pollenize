import {createAction} from 'redux-actions';

export const create = createAction('INVITATION_CREATE');
export const success = createAction('INVITATION_SUCCESS');
export const failure = createAction('INVITATION_FAILURE');
export const reset = createAction('INVITATION_RESET');
