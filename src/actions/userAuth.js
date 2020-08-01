import * as constants from '../constants/actions';
import { post } from '../utilities/request';
import { REGISTER_URL, SIGNIN_URL } from '../config/urlconfig';

export const signIn = (username, password) => ({
  type: constants.SIGN_IN,
  promise: post(SIGNIN_URL, { username, password }),
});

export const signOut = {
  type: constants.SIGN_OUT,
};

export const signUp = (email, username, password, name) => ({
  type: constants.SIGN_UP,
  promise: post(REGISTER_URL, {
    email, username, password, name,
  }),
});
