import configureStore from 'redux-mock-store';
import * as constants from '../../constants/actions';
import {
  post, get, put, deleteRequest,
} from '../../util/request';
import CONFIG from '../../config';
import {
  createItem, viewItems, deleteItem, chooseItem, editItem,
} from '../items';

const mockStore = configureStore();

describe('actions/items.js', () => {
  let store;
  beforeEach(() => {
    const initialState = {};
    store = mockStore(initialState);
  });

  it('createItem should dispatch correct type and promise', () => {
    const categoryId = 1;
    const name = 'testName';
    const description = 'testDesc';
    const price = 0;
    store.dispatch(createItem(categoryId, name, description, price));
    const expectedAction = {
      type: constants.CREATE_ITEM,
      promise: post(`${CONFIG.URL}/categories/${categoryId}/items`, { name, description, price }),
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('viewItems should dispatch correct type and promise', () => {
    const categoryId = 1;
    const offset = 0;
    const limit = 0;
    store.dispatch(viewItems(categoryId, offset, limit));
    const expectedAction = {
      type: constants.VIEW_ITEMS,
      promise: get(`${CONFIG.URL}/categories/${categoryId}/items?offset=${offset}&limit=${limit}`),
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('chooseItem should dispatch correct type and promise', () => {
    const categoryId = 1;
    const itemId = 1;
    store.dispatch(chooseItem(categoryId, itemId));
    const expectedAction = {
      type: constants.CHOOSE_ITEM,
      promise: get(`${CONFIG.URL}/categories/${categoryId}/items/${itemId}`),
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('editItem should dispatch correct type and promise', () => {
    const categoryId = 1;
    const itemId = 1;
    const name = 'testName';
    const description = 'testDesc';
    const price = 0;
    store.dispatch(editItem(categoryId, itemId, name, description, price));
    const expectedAction = {
      type: constants.EDIT_ITEM_MODAL,
      promise: put(`${CONFIG.URL}/categories/${categoryId}/items/${itemId}`, { name, description, price }),
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('deleteItem should return correct type and promise', () => {
    const categoryId = 1;
    const itemId = 1;
    store.dispatch(deleteItem(categoryId, itemId));
    const expectedAction = {
      type: constants.DELETE_ITEM,
      promise: deleteRequest(`${CONFIG.URL}/categories/${categoryId}/items/${itemId}`),
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
