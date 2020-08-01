import * as constants from '../constants/actions';
import { post } from '../utilities/request';
import { CREATE_CATEGORY_URL, FETCH_CATEGORY_URL } from '../config/urlconfig';

export const chooseCategory = (categoryId) => ({
  type: constants.CHOOSE_CATEGORY,
  categoryId,
});

export const createCategory = (name, description) => ({
  type: constants.CREATE_CATEGORY,
  promise: post(CREATE_CATEGORY_URL, { name, description }),
});

export const viewCategories = (offset, limit) => ({
  type: constants.FETCH_CATEGORIES,
  promise: get(FETCH_CATEGORY_URL(offset, limit)),
});
