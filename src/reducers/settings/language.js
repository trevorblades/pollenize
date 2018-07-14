import store from 'store';
import {LANGUAGE_KEY} from '../../constants';
import {handleAction} from 'redux-actions';
import {loop, Cmd} from 'redux-loop';
import {setLanguage} from '../../actions/settings';

const defaultState = store.get(LANGUAGE_KEY) || 'en';
export default handleAction(
  setLanguage,
  (state, {payload}) =>
    loop(
      payload,
      Cmd.run(store.set.bind(store), {args: [LANGUAGE_KEY, payload]})
    ),
  defaultState
);
