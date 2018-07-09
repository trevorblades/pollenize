import {combineReducers} from 'redux';
import {handleAction, handleActions} from 'redux-actions';
import {logOut} from '../actions/user';
import {setLanguage, setEditMode} from '../actions/settings';

export default combineReducers({
  language: handleAction(setLanguage, (state, {payload}) => payload, 'en'),
  editMode: handleActions(
    {
      [setEditMode]: (state, {payload}) => payload,
      [logOut]: () => false
    },
    false
  )
});
