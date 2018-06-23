import api from '../api';
import findIndex from 'lodash/findIndex';
import reject from 'lodash/reject';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';
import {load, success, failure, reset} from '../actions/election';
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

function getPositions(positions, payload) {
  if (!positions) {
    return [payload];
  }

  const index = findIndex(positions, ['id', payload.id]);
  if (index === -1) {
    return [...positions, payload];
  }

  return [...positions.slice(0, index), payload, ...positions.slice(index + 1)];
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
              [id]: getPositions(candidate.positions[id], payload)
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
    [topicSuccess]: (state, {payload}) => {
      const {topics} = state.data;
      const index = findIndex(topics, ['id', payload.id]);
      return {
        ...state,
        data: {
          ...state.data,
          topics:
            index === -1
              ? [...topics, payload]
              : [...topics.slice(0, index), payload, ...topics.slice(index + 1)]
        }
      };
    },
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
