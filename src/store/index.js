import { createStore, applyMiddleware, compose } from 'redux';
import rootreducer from '../reducers';
import asyncMiddleware from './middlewares/async';
import warningMiddleware from './middlewares/warning';
import tokenMiddleware from './middlewares/token';
// import fetchUserMiddleware from './middlewares/fetchUserMiddleware';

const middlewares = [asyncMiddleware, tokenMiddleware, warningMiddleware];

const createReduxStore = () => createStore(
  rootreducer,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default createReduxStore;
