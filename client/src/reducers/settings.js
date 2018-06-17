import {combineReducers} from 'redux';
import {handleAction} from 'redux-actions';
import {setEditMode} from '../actions/settings';

export default combineReducers({
  editMode: handleAction(setEditMode, state => !state, false)
});
