import * as constants from '../constants/actions';
import { post, get } from '../utilities/request';
import { CREATE_ITEM_URL, VIEW_ITEMS_URL } from '../config/urlconfig';

export const createItem = (categoryId, name, description, price) => ({
  type: constants.CREATE_ITEM,
  promise: post(CREATE_ITEM_URL(categoryId), { name, description, price }),
});

export const viewItems = (categoryId, offset, limit) => ({
  type: constants.VIEW_ITEMS,
  promise: get(VIEW_ITEMS_URL(categoryId, offset, limit)),
});
