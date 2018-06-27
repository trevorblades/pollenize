import candidate from './candidate';
import election from './election';
import lastSuccess from './last-success';
import map from './map';
import position from './position';
import settings from './settings';
import topic from './topic';
import {combineReducers} from 'redux-loop';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
  candidate,
  election,
  lastSuccess,
  map,
  position,
  router: routerReducer,
  settings,
  topic
});
