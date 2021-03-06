import * as constants from '../constants/actions';

const initialState = {
  modalChosen: null,
  prefill: {},
};

function modal(state = initialState, action) {
  switch (action.type) {
    case constants.CHOOSE_MODAL:
      return {
        modalChosen: action.modalChosen,
        prefill: action.prefill,
        callbackFunc: action.callbackFunc,
      };
    case constants.CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default modal;
