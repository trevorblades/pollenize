import election from './election';
import map from './map';
import position from './position';
import settings from './settings';
import {combineReducers} from 'redux-loop';

export default combineReducers({
  election,
  map,
  position,
  settings
});
