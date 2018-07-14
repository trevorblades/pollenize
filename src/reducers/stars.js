import {handleActions} from 'redux-actions';
import {add, remove} from '../actions/stars';

export default handleActions(
  {
    [add]: (state, {payload}) => ({
      ...state,
      [payload]: true
    }),
    [remove]: (state, {payload}) => ({
      ...state,
      [payload]: false
    })
  },
  {}
);
