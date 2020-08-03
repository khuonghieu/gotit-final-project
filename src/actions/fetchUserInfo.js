import * as constants from '../constants/actions';
import { get } from '../utilities/request';
import CONFIG from '../config/local';

const fetchUserInfo = () => ({
  type: constants.FETCH_USER_INFO,
  promise: get(`${CONFIG.URL}/me`),
});

export default fetchUserInfo;
