export const REGISTER_URL = 'http://localhost:5000/registrations';
export const SIGNIN_URL = 'http://localhost:5000/login';
export const FETCH_USER_INFO_URL = 'http://localhost:5000/me';
export const CREATE_CATEGORY_URL = 'http://localhost:5000/categories/';
export const FETCH_CATEGORIES_URL = (offset, limit) => (`http://localhost:5000/categories/?offset=${offset}&limit=${limit}`);
export const VIEW_CATEGORY_URL = (categoryId) => (`http://localhost:5000/categories/${categoryId}`);
