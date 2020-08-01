import { combineReducers } from 'redux';
import user from './user';
import modal from './modal';
import categories from './categories';

export default combineReducers({ user, modal, categories });
