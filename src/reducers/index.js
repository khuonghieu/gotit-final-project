import { combineReducers } from 'redux';
import user from './users';
import modal from './modals';
import categories from './categories';

export default combineReducers({
  user, modal, categories,
});
