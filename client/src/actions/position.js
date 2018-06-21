import {createAction} from 'redux-actions';

export const save = createAction('POSITION_SAVE');
export const success = createAction('POSITION_SUCCESS');
export const remove = createAction('POSITION_REMOVE');
export const removed = createAction('POSITION_REMOVED');
export const failure = createAction('POSITION_FAILURE');
export const reset = createAction('POSITION_RESET');
