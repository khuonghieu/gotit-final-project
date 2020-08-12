import * as constants from '../constants/actions';
import { getToken } from '../util/localStorage';

const initialState = { loggedIn: getToken() !== null, currentUser: null };

export default function user(state = initialState, action) {
  switch (action.type) {
    case constants.SIGN_IN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case constants.SIGN_IN_FAILURE:
      return {
        ...state,
        loggedIn: false,
      };
    case constants.SIGN_OUT:
      return {
        currentUser: null,
        loggedIn: false,
      };
    case constants.FETCH_USER_INFO_SUCCESS:
      return {
        loggedIn: true,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
