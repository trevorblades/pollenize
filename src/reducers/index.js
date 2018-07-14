import candidate from './candidate';
import election from './election';
import elections from './elections';
import map from './map';
import position from './position';
import settings from './settings';
import stars from './stars';
import topic from './topic';
import topics from './topics';
import user from './user';
import {combineReducers} from 'redux-loop';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
  candidate,
  election,
  elections,
  map,
  position,
  router: routerReducer,
  settings,
  stars,
  topic,
  topics,
  user
});
