import api from '../api';
import {
  save,
  success,
  remove,
  removed,
  failure,
  reset
} from '../actions/candidate';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';

async function createCandidate(body) {
  const response = await api.post('/candidates', {body});
  if (response.err) {
    throw response.body;
  }
  return response.body;
}

async function updateCandidate(body, id) {
  const response = await api.put(`/candidates/${id}`, {body});
  if (response.err) {
    throw response.body;
  }
  return response.body;
}

async function deleteCandidate(id) {
  const response = await api.del(`/candidates/${id}`);
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
        Cmd.run(id ? updateCandidate : createCandidate, {
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
        Cmd.run(deleteCandidate, {
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
