import { getToken } from './localStorage';

const getHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const get = (URL, params) => fetch(URL, {
  method: 'GET',
  headers: getHeader(),
  body: JSON.stringify(params),
}).then((res) => res);

export const post = (URL, params) => fetch(URL, {
  method: 'POST',
  headers: getHeader(),
  body: JSON.stringify(params),
}).then((res) => res);

export const put = (URL, params) => fetch(URL, {
  method: 'PUT',
  headers: getHeader(),
  body: JSON.stringify(params),
}).then((res) => res);

export const deleteRequest = (URL, params) => fetch(URL, {
  method: 'DELETE',
  headers: getHeader(),
  body: JSON.stringify(params),
}).then((res) => res);
