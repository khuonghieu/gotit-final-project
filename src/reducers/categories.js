import * as constants from '../constants/actions';

const initialState = {
  currentCategory: null,
  categoriesList: [],
};

function categories(state = initialState, action) {
  switch (action.type) {
    case constants.CHOOSE_CATEGORY:
      return {
        ...state,
        currentCategory: action.categoryId,
      };
    case constants.FETCH_CATEGORIES_SUCCESS:
      if (action.payload.categories) {
        return {
          ...state,
          categoriesList: action.payload.categories,
        };
      }
      return state;
    default:
      return state;
  }
}

export default categories;
