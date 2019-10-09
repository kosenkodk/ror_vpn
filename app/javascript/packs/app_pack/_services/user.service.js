import { config } from 'config';
import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  getTickets,
  getAll
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${config.apiUrl}/signin`, requestOptions)
    .then(handleResponse)
    .then(user => {

      localStorage.setItem('csrf', JSON.stringify(user.csrf));

      // if (!user.csrf)
      //   return this.responseFailed(response)

      return fetch(`${config.apiUrl}/me`, { method: 'GET', headers: authHeader() })
        .then(handleResponse)
        .then(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        });
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('csrf');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getTickets() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/tickets`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}