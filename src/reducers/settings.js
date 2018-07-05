import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {logOut} from '../actions/user';
import {setEditMode} from '../actions/settings';

export default combineReducers({
  editMode: handleActions(
    {
      [setEditMode]: (state, {payload}) => payload,
      [logOut]: () => false
    },
    false
  )
});
