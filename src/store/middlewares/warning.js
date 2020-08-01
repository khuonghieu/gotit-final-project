import * as constants from '../../constants/actions';

const failActionTypes = [constants.CREATE_CATEGORY_FAILURE, constants.FETCH_USER_INFO_FAILURE, constants.SIGN_IN_FAILURE, constants.SIGN_UP_FAILURE];

export default (store) => (next) => (action) => {
  if (failActionTypes.includes(action.type)) {
    alert(JSON.stringify(action.payload));
  }
  next(action);
};
