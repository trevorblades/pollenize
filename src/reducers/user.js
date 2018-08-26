import api, {headers} from '../api';
import store from 'store';
import {TOKEN_KEY} from '../constants';
import {logIn, logOut, renew, create, success, failure} from '../actions/user';
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

async function renewToken(token) {
  const response = await api.jwt(token).post('/auth/renew');
  api.jwt(null);

  if (response.err) {
    throw response.body;
  }
  return response.body;
}

async function createUser(body) {
  const response = await api.post('/users', {body, headers});
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

const setJwt = api.jwt.bind(api);
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
    [renew]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true
        },
        Cmd.run(renewToken, {
          successActionCreator: success,
          failActionCreator: logOut,
          args: [payload.token]
        })
      ),
    [create]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true
        },
        Cmd.run(createUser, {
          successActionCreator: success,
          failActionCreator: failure,
          args: [payload]
        })
      ),
    [success]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: false,
          data: userFromToken(payload)
        },
        Cmd.list([
          Cmd.run(setJwt, {args: [payload]}),
          Cmd.run(store.set.bind(store), {args: [TOKEN_KEY, payload]})
        ])
      ),
    [failure]: (state, {payload}) => ({
      ...state,
      loading: false,
      error: payload
    }),
    [logOut]: () =>
      loop(
        {
          ...defaultState,
          data: null
        },
        Cmd.list([
          Cmd.run(setJwt, {args: [null]}),
          Cmd.run(store.remove.bind(store), {args: [TOKEN_KEY]})
        ])
      )
  },
  defaultState
);
