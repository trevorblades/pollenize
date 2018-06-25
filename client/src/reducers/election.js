import api from '../api';
import findIndex from 'lodash/findIndex';
import reject from 'lodash/reject';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';
import {load, success, failure, reset} from '../actions/election';
import {push} from 'react-router-redux';
import {
  success as candidateSuccess,
  removed as candidateRemoved
} from '../actions/candidate';
import {
  success as positionSuccess,
  removed as positionRemoved
} from '../actions/position';
import {
  success as topicSuccess,
  removed as topicRemoved
} from '../actions/topic';

async function fetchElection(id) {
  const response = await api.get(`/elections/${id}`);
  if (response.err) {
    throw response.body;
  }

  return response.body;
}

function replaceOrUpdate(collection, item) {
  if (!collection) {
    return [item];
  }

  const index = findIndex(collection, ['id', item.id]);
  if (index === -1) {
    return [...collection, item];
  }

  return [...collection.slice(0, index), item, ...collection.slice(index + 1)];
}

const defaultState = {
  loading: false,
  error: null,
  data: null
};

export default handleActions(
  {
    [load]: (state, {payload}) =>
      loop(
        {
          ...state,
          loading: true
        },
        Cmd.run(fetchElection, {
          successActionCreator: success,
          failActionCreator: failure,
          args: [payload]
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
    }),
    [candidateSuccess]: (state, {payload}) => {
      const nextState = {
        ...state,
        data: {
          ...state.data,
          candidates: replaceOrUpdate(state.data.candidates, payload)
        }
      };

      const pathname = `/elections/${state.data.slug}/${payload.slug}`;
      if (pathname === window.location.pathname) {
        return nextState;
      }

      return loop(nextState, Cmd.action(push(pathname)));
    },
    [candidateRemoved]: (state, {payload}) =>
      loop(
        {
          ...state,
          data: {
            ...state.data,
            candidates: reject(state.data.candidates, ['id', payload.id])
          }
        },
        Cmd.action(push(`/elections/${state.data.slug}`))
      ),
    [positionSuccess]: (state, {payload}) => ({
      ...state,
      data: {
        ...state.data,
        candidates: state.data.candidates.map(candidate => {
          if (candidate.id !== payload.candidate_id) {
            return candidate;
          }

          const {id} = payload.topic;
          return {
            ...candidate,
            positions: {
              ...candidate.positions,
              [id]: replaceOrUpdate(candidate.positions[id], payload)
            }
          };
        })
      }
    }),
    [positionRemoved]: (state, {payload}) => ({
      ...state,
      data: {
        ...state.data,
        candidates: state.data.candidates.map(candidate => {
          if (candidate.id !== payload.candidate_id) {
            return candidate;
          }

          const {id} = payload.topic;
          return {
            ...candidate,
            positions: {
              ...candidate.positions,
              [id]: reject(candidate.positions[id], ['id', payload.id])
            }
          };
        })
      }
    }),
    [topicSuccess]: (state, {payload}) => ({
      ...state,
      data: {
        ...state.data,
        topics: replaceOrUpdate(state.data.topics, payload)
      }
    }),
    [topicRemoved]: (state, {payload}) => ({
      ...state,
      data: {
        ...state.data,
        topics: reject(state.data.topics, ['id', payload.id])
      }
    }),
    [reset]: () => defaultState
  },
  defaultState
);
