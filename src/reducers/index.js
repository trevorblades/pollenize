import election from './election';
import map from './map';
import {combineReducers} from 'redux-loop';

export default combineReducers({
  election,
  map
});
