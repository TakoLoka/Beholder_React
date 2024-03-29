
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';

export default createStore(rootReducer, applyMiddleware(thunk));