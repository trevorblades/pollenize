import compareMode from './compare-mode';
import language from './language';
import {combineReducers} from 'redux-loop';
import {handleActions} from 'redux-actions';
import {logOut} from '../../actions/user';
import {setEditMode} from '../../actions/settings';

export default combineReducers({
  language,
  compareMode,
  editMode: handleActions(
    {
      [setEditMode]: (state, {payload}) => payload,
      [logOut]: () => false
    },
    false
  )
});
