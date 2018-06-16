import reducers from './reducers';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {install} from 'redux-loop';

const enhancer = composeWithDevTools(install());
export default createStore(reducers, enhancer);
