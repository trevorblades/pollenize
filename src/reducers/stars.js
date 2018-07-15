import store from 'store';
import {STARS_KEY} from '../constants';
import {handleActions, combineActions} from 'redux-actions';
import {add, remove, reset} from '../actions/stars';
import {loop, Cmd} from 'redux-loop';

function persist(getState) {
  const {stars} = getState();
  store.set(STARS_KEY, stars);
}

const cmd = Cmd.run(persist, {args: [Cmd.getState]});
const defaultState = store.get(STARS_KEY) || {};
export default handleActions(
  {
    [combineActions(add, remove)]: (state, action) =>
      loop(
        {
          ...state,
          [action.payload]: action.type === add.toString()
        },
        cmd
      ),
    [reset]: () => loop({}, cmd)
  },
  defaultState
);
