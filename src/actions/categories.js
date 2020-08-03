import * as constants from '../constants/actions';
import { post, get } from '../utilities/request';
import { CONFIG } from '../config/urlconfig';

export const chooseCategory = (categoryId) => ({
  type: constants.CHOOSE_CATEGORY,
  categoryId,
});

export const createCategory = (name, description) => ({
  type: constants.CREATE_CATEGORY,
  promise: post(`${CONFIG.URL}/categories`, { name, description }),
});

export const fetchCategories = (offset, limit) => ({
  type: constants.FETCH_CATEGORIES,
  promise: get(`${CONFIG.URL}/categories?offset=${offset}&limit=${limit}`),
});

export const viewCategory = (categoryId) => ({
  type: constants.VIEW_CATEGORY,
  promise: get(`${CONFIG.URL}/categories/${categoryId}`),
});
