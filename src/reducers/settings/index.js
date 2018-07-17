import language from './language';
import {combineReducers} from 'redux-loop';
import {handleAction, handleActions} from 'redux-actions';
import {logOut} from '../../actions/user';
import {setCompareMode, setEditMode} from '../../actions/settings';

export default combineReducers({
  language,
  compareMode: handleAction(
    setCompareMode,
    (state, {payload}) => payload,
    false
  ),
  editMode: handleActions(
    {
      [setEditMode]: (state, {payload}) => payload,
      [logOut]: () => false
    },
    false
  )
});
