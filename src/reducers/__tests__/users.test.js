import user from '../users';
import * as constants from '../../constants/actions';
import { getToken } from '../../util/localStorage';

describe('reducers/users.js', () => {
  it('should return initial state', () => {
    expect(user(undefined, {})).toEqual({
      loggedIn: getToken() !== null,
      currentUser: null,
    });
  });
  it('should handle SIGN_IN_SUCCESS', () => {
    const dispatchedAction = {
      type: constants.SIGN_IN_SUCCESS,
    };
    expect(user(undefined, dispatchedAction)).toEqual({
      loggedIn: true,
      currentUser: null,
    });
  });
  it('should handle SIGN_IN_FAILURE', () => {
    const dispatchedAction = {
      type: constants.SIGN_IN_FAILURE,
    };
    expect(user(undefined, dispatchedAction)).toEqual({
      loggedIn: false,
      currentUser: null,
    });
  });
  it('should handle SIGN_OUT', () => {
    const dispatchedAction = {
      type: constants.SIGN_OUT,
    };
    expect(user(undefined, dispatchedAction)).toEqual({
      loggedIn: false,
      currentUser: null,
    });
  });
  it('should handle FETCH_USER_INFO_SUCCESS', () => {
    const dispatchedAction = {
      type: constants.FETCH_USER_INFO_SUCCESS,
      payload: {},
    };
    expect(user(undefined, dispatchedAction)).toEqual({
      loggedIn: true,
      currentUser: {},
    });
  });
});
