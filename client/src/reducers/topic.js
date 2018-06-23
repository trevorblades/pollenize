import api from '../api';
import {save, success, remove, removed, failure, reset} from '../actions/topic';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';

async function createTopic(body) {
  const response = await api.post('/topics', {body});
  if (response.err) {
    throw response.body;
  }
  return response.body;
}

async function updateTopic(body) {
  const response = await api.put(`/topics/${body.id}`, {body});
  if (response.err) {
    throw response.body;
  }
  return response.body;
}

async function deleteTopic(id) {
  const response = await api.del(`/topics/${id}`);
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
        Cmd.run(payload.id ? updateTopic : createTopic, {
          successActionCreator: success,
          failActionCreator: failure,
          args: [payload]
        })
      ),
    [remove]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true
        },
        Cmd.run(deleteTopic, {
          successActionCreator: removed,
          failActionCreator: failure,
          args: [payload]
        })
      ),
    [success]: (state, {payload}) => ({
      ...state,
      loading: false,
      data: payload
    }),
    [removed]: state => ({
      ...state,
      loading: false
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
