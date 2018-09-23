import api from '../api';
import {Cmd, loop} from 'redux-loop';
import {failure, remove, removed, reset, save, success} from '../actions/topic';
import {handleActions} from 'redux-actions';

async function createTopic(body) {
  const response = await api.post('/topics', {body});
  if (response.err) {
    throw response.body;
  }
  return response.body;
}

async function updateTopic(body, id) {
  const response = await api.put(`/topics/${id}`, {body});
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
  success: false
};

export default handleActions(
  {
    [save]: (state, {payload}) => {
      const {id, formData} = payload;
      return loop(
        {
          ...state,
          loading: true,
          success: false
        },
        Cmd.run(id ? updateTopic : createTopic, {
          successActionCreator: success,
          failActionCreator: failure,
          args: [formData, id]
        })
      );
    },
    [remove]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true,
          success: false
        },
        Cmd.run(deleteTopic, {
          successActionCreator: removed,
          failActionCreator: failure,
          args: [payload]
        })
      ),
    [success]: state => ({
      ...state,
      loading: false,
      success: true
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
