import api, {headers} from '../api';
import {reorder, success, failure} from '../actions/topics';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';

async function reorderTopics(topics) {
  const response = await api.post('/topics/reorder', {
    headers,
    body: {
      topics: topics.map(({id}, order) => ({
        id,
        order
      }))
    }
  });

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
    [reorder]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true,
          success: false
        },
        Cmd.run(reorderTopics, {
          successActionCreator: success,
          failActionCreator: failure,
          args: [payload]
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
