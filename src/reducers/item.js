import * as constants from '../constants/actions';

const initialState = {};

function item(state = initialState, action) {
  switch (action.type) {
    case constants.CHOOSE_ITEM_SUCCESS:
      return action.payload;
    case constants.CHOOSE_ITEM_FAILURE:
      return initialState;
    default:
      return state;
  }
}

export default item;
