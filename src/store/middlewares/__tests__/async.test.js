import async from '../async';
import {
  get, post, put, deleteRequest,
} from '../../../util/request';
import * as constants from '../../../constants/actions';

jest.mock('../../../util/request.js');

const store = {
  dispatch: jest.fn(),
};

const next = jest.fn();

describe('async middleware', () => {
  it('should call next on actions', () => {
    const createItem = post.mockResolvedValue({ ok: true });
    async(store)(next)({ type: constants.CREATE_ITEM, promise: createItem() });
    expect(next).toHaveBeenCalled();
  });

  it('should dispatch an action that has ok result', async () => {
    const createItem = post.mockResolvedValue({ ok: true });
    await async(store)(next)({ type: constants.CREATE_ITEM, promise: jest.fn().mockResolvedValue({ ok: true }) });
    expect(store.dispatch).toHaveBeenCalled();
  });
});
