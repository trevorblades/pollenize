import store from 'store';
import {Cmd, loop} from 'redux-loop';
import {STARS_KEY} from '../constants';
import {add, remove, reset} from '../actions/stars';
import {combineActions, handleActions} from 'redux-actions';

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
