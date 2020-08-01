import * as constants from '../constants/actions';
import { get } from '../utilities/request';
import { FETCH_USER_INFO_URL } from '../config/urlconfig';

const fetchUserInfo = () => ({
  type: constants.FETCH_USER_INFO,
  promise: get(FETCH_USER_INFO_URL),
});

export default fetchUserInfo;
