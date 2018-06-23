import election from './election';
import map from './map';
import position from './position';
import settings from './settings';
import topic from './topic';
import {combineReducers} from 'redux-loop';

export default combineReducers({
  election,
  map,
  position,
  settings,
  topic
});
