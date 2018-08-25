import api from '../api';
import {load, success, failure} from '../actions/organizations';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';

async function fetchOrganizations() {
  const response = await api.get('/organizations');
  if (response.err) {
    throw response.body;
  }
  return response.body;
}

const defaultState = {
  loading: false,
  error: null,
  data: []
};

export default handleActions(
  {
    [load]: state =>
      loop(
        {
          ...state,
          loading: true
        },
        Cmd.run(fetchOrganizations, {
          successActionCreator: success,
          failActionCreator: failure
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
