import { combineReducers } from 'redux';
import user from './users';
import modal from './modals';
import categories from './categories';
import item from './items';

export default combineReducers({
  user, modal, categories, item,
});
