import categories from '../categories';
import * as constants from '../../constants/actions';

describe('reducers/categories.js', () => {
  it('should return initial state', () => {
    expect(categories(undefined, {})).toEqual({
      currentCategory: null,
      categoriesList: [],
    });
  });
  it('should handle CHOOSE_CATEGORY', () => {
    const dispatchedAction = {
      type: constants.CHOOSE_CATEGORY,
      categoryId: 1,
    };
    expect(categories(undefined, dispatchedAction)).toEqual({
      currentCategory: 1,
      categoriesList: [],
    });
  });

  it('should handle FETCH_CATEGORIES_SUCCESS', () => {
    const dispatchedAction = {
      type: constants.FETCH_CATEGORIES_SUCCESS,
      payload: {
        categories: [1, 2],
      },
    };
    expect(categories(undefined, dispatchedAction)).toEqual({
      currentCategory: null,
      categoriesList: [1, 2],
    });
  });
});
