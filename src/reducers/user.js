import api from '../api';
import store from 'store';
import {TOKEN_KEY} from '../constants';
import {logIn, logOut, renewToken, success, failure} from '../actions/user';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';
import {userFromToken} from '../util';

async function authenticate(email, password) {
  const response = await api.auth(email, password).post('/auth');
  api.auth();

  if (response.err) {
    throw response.body;
  }
  return response.body;
}

async function renew(token) {
  const response = await api.jwt(token).post('/auth/renew');
  api.jwt(null);

  if (response.err) {
    throw response.body;
  }
  return response.body;
}

const defaultState = {
  loading: false,
  error: null,
  data: userFromToken(store.get(TOKEN_KEY))
};

export default handleActions(
  {
    [logIn]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true
        },
        Cmd.run(authenticate, {
          successActionCreator: success,
          failActionCreator: failure,
          args: payload
        })
      ),
    [renewToken]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true
        },
        Cmd.run(renew, {
          successActionCreator: success,
          failActionCreator: logOut,
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
    [logOut]: () => ({
      ...defaultState,
      data: null
    })
  },
  defaultState
);
