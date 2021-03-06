import * as constants from '../constants/actions';
import {
  post, get, put, deleteRequest,
} from '../util/request';
import CONFIG from '../config';

export const createItem = (categoryId, name, description, price) => ({
  type: constants.CREATE_ITEM,
  promise: post(`${CONFIG.URL}/categories/${categoryId}/items`, { name, description, price }),
});

export const viewItems = (categoryId, offset, limit) => ({
  type: constants.VIEW_ITEMS,
  promise: get(`${CONFIG.URL}/categories/${categoryId}/items?offset=${offset}&limit=${limit}`),
});

export const chooseItem = (categoryId, itemId) => ({
  type: constants.CHOOSE_ITEM,
  promise: get(`${CONFIG.URL}/categories/${categoryId}/items/${itemId}`),
});

export const editItem = (categoryId, itemId, name, description, price) => ({
  type: constants.EDIT_ITEM_MODAL,
  promise: put(`${CONFIG.URL}/categories/${categoryId}/items/${itemId}`, { name, description, price }),
});

export const deleteItem = (categoryId, itemId) => ({
  type: constants.DELETE_ITEM,
  promise: deleteRequest(`${CONFIG.URL}/categories/${categoryId}/items/${itemId}`),
});
