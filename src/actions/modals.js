import * as constants from '../constants/actions';

export const chooseModal = (modalName, props, callbackFunc) => ({
  type: constants.CHOOSE_MODAL,
  modalChosen: modalName,
  prefill: { ...props },
  callbackFunc,
});

export const closeModal = () => ({
  type: constants.CLOSE_MODAL,
});
