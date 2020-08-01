import * as constants from '../constants/actions';

const initialState = { loggedIn: false, currentUser: null };

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
      return initialState;
    case constants.FETCH_USER_INFO_SUCCESS:
      return {
        loggedIn: true,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
