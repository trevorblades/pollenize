import {handleActions} from 'redux-actions';
import {setCompareMode, setCompareIndex} from '../../actions/settings';

const defaultState = {
  active: false,
  index: 0
};

export default handleActions(
  {
    [setCompareMode]: (state, {payload}) => ({
      ...state,
      active: payload
    }),
    [setCompareIndex]: (state, {payload}) => ({
      ...state,
      index: payload
    })
  },
  defaultState
);
