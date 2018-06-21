import api from '../api';
import reject from 'lodash/reject';
import {handleActions} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';
import {load, success, failure, reset} from '../actions/election';
import {
  success as positionSuccess,
  removed as positionRemoved
} from '../actions/position';

async function fetchElection(id) {
  const response = await api.get(`/elections/${id}`);
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

          let nextPositions;
          const positions = candidate.positions[payload.topic.slug];
          if (!positions) {
            nextPositions = [payload];
          } else {
            nextPositions = positions.slice();

            let replaced = false;
            for (let i = 0; i < nextPositions.length; i++) {
              if (nextPositions[i].id === payload.id) {
                nextPositions[i] = payload;
                replaced = true;
                break;
              }
            }

            if (!replaced) {
              nextPositions.push(payload);
            }
          }

          return {
            ...candidate,
            positions: {
              ...candidate.positions,
              [payload.topic.slug]: nextPositions
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

          return {
            ...candidate,
            positions: {
              ...candidate.positions,
              [payload.topic.slug]: reject(
                candidate.positions[payload.topic.slug],
                ['id', payload.id]
              )
            }
          };
        })
      }
    }),
    [reset]: () => defaultState
  },
  defaultState
);
