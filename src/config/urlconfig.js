export const CONFIG = {
  URL: 'http://localhost:5000/',
};

export const REGISTER_URL = `${CONFIG.URL}registrations`;
export const SIGNIN_URL = `${CONFIG.URL}login`;
export const FETCH_USER_INFO_URL = `${CONFIG.URL}me`;
export const CREATE_CATEGORY_URL = `${CONFIG.URL}categories`;
export const FETCH_CATEGORIES_URL = (offset, limit) => (`${CONFIG.URL}categories?offset=${offset}&limit=${limit}`);
export const VIEW_CATEGORY_URL = (categoryId) => (`${CONFIG.URL}categories/${categoryId}`);
