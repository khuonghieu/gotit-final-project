import configureStore from 'redux-mock-store';
import {
  chooseCategory, createCategory, fetchCategories, viewCategory,
} from '../categories';
import * as constants from '../../constants/actions';
import { post, get } from '../../util/request';
import CONFIG from '../../config';
import asyncMiddleware from '../../store/middlewares/async';

jest.mock('../../util/request');

const mockStore = configureStore([asyncMiddleware]);

describe('actions/categories.js', () => {
  let store;

  beforeEach(() => {
    const initialState = {};
    store = mockStore(initialState);
  });

  it('chooseCategory should return correct categoryId and type', async () => {
    const categoryId = 1;
    await store.dispatch(chooseCategory(categoryId));
    const expectedAction = {
      type: constants.CHOOSE_CATEGORY,
      categoryId,
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('createCategory should return correct type and promise', async () => {
    await store.dispatch({
      type: constants.CREATE_CATEGORY,
      promise: post.mockResolvedValue({ ok: true }),
    });
    const expectedAction = {
      type: constants.CREATE_CATEGORY,
      promise: post,
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('fetchCategories should return correct type and promise', () => {
    const offset = 0;
    const limit = 0;
    store.dispatch(fetchCategories(offset, limit));
    const expectedAction = {
      type: constants.FETCH_CATEGORIES,
      promise: get(`${CONFIG.URL}/categories?offset=${offset}&limit=${limit}`),
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it('viewCategory should return correct type and promise', () => {
    const categoryId = 1;
    store.dispatch(viewCategory(categoryId));
    const expectedAction = {
      type: constants.VIEW_CATEGORY,
      promise: get(`${CONFIG.URL}/categories/${categoryId}`),
    };
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
