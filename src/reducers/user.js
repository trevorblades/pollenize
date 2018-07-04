import api from '../api';
import {logIn, success, failure} from '../actions/user';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';

async function auth(email, password) {
  const response = await api.auth(email, password).post('/auth');
  api.auth();

  if (response.err) {
    throw response.body;
  }

  api.jwt(response.body);
  return response.body;
}

const defaultState = {
  loading: false,
  error: null,
  data: null
};

export default handleActions(
  {
    [logIn]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true,
          success: false
        },
        Cmd.run(auth, {
          successActionCreator: success,
          failActionCreator: failure,
          args: payload
        })
      ),
    [success]: state => ({
      ...state,
      loading: false,
      success: true
    }),
    [failure]: (state, {payload}) => ({
      ...state,
      loading: false,
      error: payload
    })
  },
  defaultState
);
