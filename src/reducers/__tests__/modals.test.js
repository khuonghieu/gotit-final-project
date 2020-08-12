import modal from '../modals';
import * as constants from '../../constants/actions';

describe('reducers/modals.js', () => {
  it('should return initial state', () => {
    expect(modal(undefined, {})).toEqual({
      modalChosen: null,
      prefill: {},
    });
  });
  it('should handle CHOOSE_MODAL', () => {
    const dispatchedAction = {
      type: constants.CHOOSE_MODAL,
      modalChosen: constants.SIGN_IN_MODAL,
      prefill: {},
    };
    expect(modal(undefined, dispatchedAction)).toEqual({
      modalChosen: constants.SIGN_IN_MODAL,
      prefill: {},
    });
  });
  it('should handle CLOSE_MODAL', () => {
    const dispatchedAction = {
      type: constants.CLOSE_MODAL,
    };
    expect(modal(undefined, dispatchedAction)).toEqual({
      modalChosen: null,
      prefill: {},
    });
  });
});
