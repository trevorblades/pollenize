import {createAction} from 'redux-actions';

export const save = createAction('CANDIDATE_SAVE');
export const success = createAction('CANDIDATE_SUCCESS');
export const remove = createAction('CANDIDATE_REMOVE');
export const removed = createAction('CANDIDATE_REMOVED');
export const failure = createAction('CANDIDATE_FAILURE');
export const reset = createAction('CANDIDATE_RESET');
