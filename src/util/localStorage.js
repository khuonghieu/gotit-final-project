import * as tokenConst from '../constants/token';

export const getToken = () => (
  localStorage.getItem(tokenConst.TOKEN_PREFIX + tokenConst.USER_TOKEN)
);

export const setToken = (newToken) => {
  localStorage.setItem(tokenConst.TOKEN_PREFIX + tokenConst.USER_TOKEN, newToken);
};

export const deleteToken = () => {
  localStorage.removeItem(tokenConst.TOKEN_PREFIX + tokenConst.USER_TOKEN);
};
