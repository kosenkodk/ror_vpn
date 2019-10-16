import { config } from 'config';
import { authHeader } from '../_helpers';

export const userService = {
  login,
  logout,
  getAll,
  getTickets,
  addTicket,
  viewTicket,
  getDepartments,
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${config.apiUrl}/signin`, requestOptions)
    .then(handleResponse)
    .then(response => {

      if (!response.csrf) {
        // auto logout if empty csrf returned from api
        logout()
        const error = (response && response.error) || response.statusText;
        return Promise.reject(error);
      }

      localStorage.setItem('csrf', JSON.stringify(response.csrf));

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

function addTicket(ticket) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ ticket })
  }
  return fetch(`${config.apiUrl}/tickets`, requestOptions).then(handleResponse);
}

function viewTicket(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }
  return fetch(`${config.apiUrl}/tickets/${id}`, requestOptions).then(handleResponse);
}

function getTickets() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/tickets`, requestOptions).then(handleResponse);
}

function getDepartments() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/departments`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    let data = {}
    try {
      data = JSON.parse(text);
    } catch (e) { }

    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }

      const error = (data && data.error) || (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}