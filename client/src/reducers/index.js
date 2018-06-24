import candidate from './candidate';
import election from './election';
import map from './map';
import position from './position';
import settings from './settings';
import topic from './topic';
import {combineReducers} from 'redux-loop';

export default combineReducers({
  candidate,
  election,
  map,
  position,
  settings,
  topic
});
