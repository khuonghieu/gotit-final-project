import * as constants from '../constants/actions';
import { post, get } from '../util/request';
import CONFIG from '../config';

export const signIn = (username, password) => ({
  type: constants.SIGN_IN,
  promise: post(`${CONFIG.URL}/login`, { username, password }),
});

export const signOut = () => ({
  type: constants.SIGN_OUT,
});

export const signUp = (email, username, password, name) => ({
  type: constants.SIGN_UP,
  promise: post(`${CONFIG.URL}/registrations`, {
    email, username, password, name,
  }),
});

export const fetchUserInfo = () => ({
  type: constants.FETCH_USER_INFO,
  promise: get(`${CONFIG.URL}/me`),
});
