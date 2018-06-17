import {createAction} from 'redux-actions';

export const create = createAction('POSITION_CREATE');
export const update = createAction('POSITION_UPDATE');
export const success = createAction('POSITION_SUCCESS');
export const failure = createAction('POSITION_FAILURE');
