import { createStore, applyMiddleware, compose } from 'redux';
import rootreducer from '../reducers';
import asyncMiddleware from './middlewares/async';
import tokenMiddleware from './middlewares/token';

const middlewares = [asyncMiddleware, tokenMiddleware];

const createReduxStore = () => createStore(
  rootreducer,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default createReduxStore;
