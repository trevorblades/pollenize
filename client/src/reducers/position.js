import api from '../api';
import {
  save,
  success,
  remove,
  removed,
  failure,
  reset
} from '../actions/position';
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

async function deletePosition(id) {
  const response = await api.del(`/positions/${id}`);
  if (response.err) {
    throw response.body;
  }
  return response.body;
}

const defaultState = {
  loading: false,
  error: null,
  success: false,
  data: null
};

export default handleActions(
  {
    [save]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true,
          success: false
        },
        Cmd.run(payload.id ? updatePosition : createPosition, {
          successActionCreator: success,
          failActionCreator: failure,
          args: [payload]
        })
      ),
    [remove]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true,
          success: false
        },
        Cmd.run(deletePosition, {
          successActionCreator: removed,
          failActionCreator: failure,
          args: [payload]
        })
      ),
    [success]: (state, {payload}) => ({
      ...state,
      loading: false,
      success: true,
      data: payload
    }),
    [removed]: state => ({
      ...state,
      loading: false,
      success: true
    }),
    [failure]: (state, {payload}) => ({
      ...state,
      loading: false,
      error: payload
    }),
    [reset]: () => defaultState
  },
  defaultState
);
