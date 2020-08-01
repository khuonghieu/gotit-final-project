import * as constants from '../../constants/actions';
import { setToken, deleteToken } from '../../utilities/localStorage';

export default (store) => (next) => (action) => {
  if (action.type === constants.SIGN_IN_SUCCESS || action.type === constants.SIGN_UP_SUCCESS) {
    setToken(action.payload.access_token);
  }
  if (action.type === constants.SIGN_OUT || action.type === constants.FETCH_USER_INFO_FAILURE) {
    deleteToken();
  }
  next(action);
};
