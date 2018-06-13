import {handleAction} from 'redux-actions';
import {setView} from '../actions/map';

const defaultState = {
  extent: [-180, -85, 180, 85]
};

export default handleAction(
  setView,
  (state, {payload}) => payload,
  defaultState
);
