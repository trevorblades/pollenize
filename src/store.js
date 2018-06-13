import reducers from './reducers';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

export default createStore(reducers, composeWithDevTools());
