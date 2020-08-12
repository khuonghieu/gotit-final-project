import configureStore from 'redux-mock-store';
import * as constants from '../../constants/actions';
import { chooseModal, closeModal } from '../modals';

const mockStore = configureStore();

describe('actions/modals.js', () => {
  let store;
  beforeEach(() => {
    const initialState = {};
    store = mockStore(initialState);
  });

  it('chooseModal should return correct type and data', () => {
    const modalName = constants.SIGN_IN_MODAL;
    const props = {};
    store.dispatch(chooseModal(modalName, props));
    const expectedAction = {
      type: constants.CHOOSE_MODAL,
      modalChosen: modalName,
      prefill: { ...props },
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('closeModal should return correct type', () => {
    store.dispatch(closeModal());
    const expectedAction = {
      type: constants.CLOSE_MODAL,
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
