import {handleAction, combineActions} from 'redux-actions';
import {success as candidateSuccess} from '../actions/candidate';
import {success as positionSuccess} from '../actions/position';
import {success as topicSuccess} from '../actions/topic';

export default handleAction(
  combineActions(candidateSuccess, positionSuccess, topicSuccess),
  (state, {payload}) => payload.updated_at,
  null
);
