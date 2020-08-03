import * as constants from '../constants/actions';

function modal(state = null, action) {
  switch (action.type) {
    case constants.SIGN_IN_MODAL:
      return constants.SIGN_IN_MODAL;
    case constants.SIGN_UP_MODAL:
      return constants.SIGN_UP_MODAL;
    case constants.SIGN_OUT_MODAL:
      return null;
    case constants.CLOSE_MODAL:
      return null;
    case constants.CHOOSE_ITEM_MODAL:
      return constants.CHOOSE_ITEM_MODAL;
    case constants.EDIT_ITEM_MODAL:
      return constants.EDIT_ITEM_MODAL;
    default:
      return state;
  }
}

export default modal;
