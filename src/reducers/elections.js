import api from '../api';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';
import {load, success, failure} from '../actions/elections';

async function fetchElections() {
  const response = await api.get('/elections');
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
        Cmd.run(fetchElections, {
          successActionCreator: success,
          failActionCreator: failure
        })
      ),
    [success]: (state, {payload}) => ({
      ...state,
      loading: false,
      error: null,
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
