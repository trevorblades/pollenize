import api, {headers} from '../api';
import {Cmd, loop} from 'redux-loop';
import {create, failure, reset, success} from '../actions/invitation';
import {handleActions} from 'redux-actions';

async function createInvitation(body) {
  const response = await api.post('/invitations', {body, headers});
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
    [create]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true
        },
        Cmd.run(createInvitation, {
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
    }),
    [reset]: () => defaultState
  },
  defaultState
);
