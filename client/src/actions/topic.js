import {createAction} from 'redux-actions';

export const save = createAction('TOPIC_SAVE');
export const success = createAction('TOPIC_SUCCESS');
export const remove = createAction('TOPIC_REMOVE');
export const removed = createAction('TOPIC_REMOVED');
export const failure = createAction('TOPIC_FAILURE');
export const reset = createAction('TOPIC_RESET');
