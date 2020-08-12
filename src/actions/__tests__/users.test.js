import configureStore from 'redux-mock-store';
import * as constants from '../../constants/actions';
import {
  post, get, put, deleteRequest,
} from '../../util/request';
import CONFIG from '../../config';
import {
  signIn, signUp, fetchUserInfo, signOut,
} from '../users';

const mockStore = configureStore();

describe('actions/modals.js', () => {
  let store;
  beforeEach(() => {
    const initialState = {};
    store = mockStore(initialState);
  });

  it('signIn should return correct type and promise', () => {
    const username = 'testUsername';
    const password = 'testPassword';
    store.dispatch(signIn(username, password));
    const expectedAction = {
      type: constants.SIGN_IN,
      promise: post(`${CONFIG.URL}/login`, { username, password }),
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('signUp should return correct type and promise', () => {
    const email = 'testEmail@gmail.com';
    const username = 'testUsername';
    const password = 'testPassword';
    const name = 'testName';
    store.dispatch(signUp(email, username, password, name));
    const expectedAction = {
      type: constants.SIGN_UP,
      promise: post(`${CONFIG.URL}/registrations`, {
        email, username, password, name,
      }),
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('signOut should return correct type', () => {
    store.dispatch(signOut());
    const expectedAction = {
      type: constants.SIGN_OUT,
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('fetchUserInfo should return correct type and promise', () => {
    store.dispatch(fetchUserInfo());
    const expectedAction = {
      type: constants.FETCH_USER_INFO,
      promise: get(`${CONFIG.URL}/me`),
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
