import * as constants from '../constants/actions';
import { post } from '../utilities/request';
import { CONFIG } from '../config/urlconfig';

export const signIn = (username, password) => ({
  type: constants.SIGN_IN,
  promise: post(`${CONFIG.URL}/login`, { username, password }),
});

export const signOut = {
  type: constants.SIGN_OUT,
};

export const signUp = (email, username, password, name) => ({
  type: constants.SIGN_UP,
  promise: post(`${CONFIG.URL}/registrations`, {
    email, username, password, name,
  }),
});
