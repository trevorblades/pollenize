import api from '../api';
import cookies from 'browser-cookies';
import jwtDecode from 'jwt-decode';
import {logIn, logOut, success, failure} from '../actions/user';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';

async function auth(email, password) {
  const response = await api.auth(email, password).post('/auth');
  api.auth();

  if (response.err) {
    throw response.body;
  }

  const token = response.body;
  api.jwt(token);
  cookies.set('token', token);
  return token;
}

function userFromToken(token) {
  if (!token) {
    return null;
  }

  const claims = jwtDecode(token);
  delete claims.exp;
  delete claims.iat;
  return {
    ...claims,
    token
  };
}

const defaultState = {
  loading: false,
  error: null,
  data: userFromToken(cookies.get('token'))
};

export default handleActions(
  {
    [logIn]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true
        },
        Cmd.run(auth, {
          successActionCreator: success,
          failActionCreator: failure,
          args: payload
        })
      ),
    [success]: (state, {payload}) => ({
      ...state,
      loading: false,
      data: userFromToken(payload)
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
