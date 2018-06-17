import api from '../api';
import {save, success, failure} from '../actions/position';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';

async function createPosition(body) {
  const response = await api.post('/positions', {body});
  if (response.err) {
    throw response.body;
  }
  return response.body;
}

async function updatePosition(body) {
  const response = await api.put(`/positions/${body.id}`, {body});
  if (response.err) {
    throw response.body;
  }
  return response.body;
}

const defaultState = {
  loading: false,
  error: null,
  data: null
};

export default handleActions(
  {
    [save]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true
        },
        Cmd.run(payload.id ? updatePosition : createPosition, {
          successActionCreator: success,
          failActionCreator: failure,
          args: [payload]
        })
      ),
    [success]: (state, {payload}) => ({
      ...state,
      loading: false,
      data: payload
    }),
    [failure]: (state, {payload}) => ({
      ...state,
      loading: false,
      error: payload
    })
  },
  defaultState
);
