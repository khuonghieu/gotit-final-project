import * as constants from '../constants/actions';

export const chooseModal = (modalName) => ({
  type: modalName,
});

export const closeModal = () => ({
  type: constants.CLOSE_MODAL,
});
