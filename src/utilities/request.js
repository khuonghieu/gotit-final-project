import { getToken } from './token';

export const get = (URL, params) => fetch(URL, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
  body: JSON.stringify(params),
}).then((res) => res);

export const post = (URL, params) => fetch(URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
  body: JSON.stringify(params),
}).then((res) => res);

export const put = (URL, params) => fetch(URL, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
  body: JSON.stringify(params),
}).then((res) => res);

export const deleteRequest = (URL, params) => fetch(URL, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
  body: JSON.stringify(params),
}).then((res) => res);
