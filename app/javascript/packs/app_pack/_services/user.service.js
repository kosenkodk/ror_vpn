import { config } from 'config';
import { history, authHeader } from '../_helpers';
const autoRefreshToken = true;

export const userService = {
  login,
  logout,
  signup,
  getAll,
  getTickets,
  addTicket,
  viewTicket,
  updateTicket,
  getDepartments,
  contactUs,
  changeLoginPassword,
  changeLoginEmail,
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

      return getUser()
    });
}

function getUser() {
  return fetch(`${config.apiUrl}/me`, { method: 'GET', headers: authHeader() })
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('csrf');
  // history.push(config.urlAfterSignout)
}

function signup(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  return fetch(`${config.apiUrl}/signup`, requestOptions)
    .then(handleResponse)
    .then(response => {

      if (!response.csrf) {
        // auto logout if empty csrf returned from api
        logout()
        const error = (response && response.error) || response.statusText;
        return Promise.reject(error);
      }

      localStorage.setItem('csrf', JSON.stringify(response.csrf));

      return getUser()
    });
}

function getAll() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/users`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function contactUs(contact) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/contacts`, 'POST', { contact: contact })

  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ contact: contact }),
    // body: JSON.stringify({ contact })
  }
  return fetch(`${config.apiUrl}/contacts`, requestOptions).then(handleResponse);
}

function updateTicket(ticket) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/tickets/${ticket.id}`, 'PATCH', { ticket: { id: ticket.id, status: 'closed' } })

  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify({ ticket })
  }
  return fetch(`${config.apiUrl}/tickets/${ticket.id}`, requestOptions).then(handleResponse);
}

function changeLoginPassword(data) {
  // if (autoRefreshToken)
  //   return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/change_password`, 'PATCH', data)

  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify(data)
  }
  return fetch(`${config.apiUrl}/change_password`, requestOptions).then(handleResponse)
    .then(response => {
      if (!response.csrf) {
        // auto logout if empty csrf returned from api
        logout()
        const error = (response && response.error) || response.statusText;
        return Promise.reject(error);
      }
      localStorage.setItem('csrf', JSON.stringify(response.csrf));
      return response
    });
}

function changeLoginEmail(data) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/change_email`, 'PATCH', data)

  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify(data)
  }
  return fetch(`${config.apiUrl}/change_email`, requestOptions).then(handleResponse);
}

function addTicket(ticket) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/tickets`, 'POST', { ticket })

  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ ticket })
  }
  return fetch(`${config.apiUrl}/tickets`, requestOptions).then(handleResponse);
}

function viewTicket(id) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/tickets/${id}`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }
  return fetch(`${config.apiUrl}/tickets/${id}`, requestOptions).then(handleResponse);
}

function getTickets({ page = 1, status = '' } = {}) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/tickets?page=${page}&status=${status}`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/tickets`, requestOptions).then(handleResponse);
}

function getDepartments() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/departments`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/departments`, requestOptions).then(handleResponse);
}

function getRequestOptions(method, data) {
  if (method === 'GET')
    return {
      method: method,
      headers: authHeader(),
    }
  return {
    method: method,
    headers: authHeader(),
    body: JSON.stringify(data),
  }
}

async function sendRequestAndRetryByUrlMethodData(url, method, data) {
  let response = await fetch(url, getRequestOptions(method, data))
  return refreshTokenAndRetryResponse(response, url, method, data)
}

function refreshTokenAndRetryResponse(response, url, method, data_orig) {
  return response.text()
    .then(text => {
      let data = {}
      try {
        data = JSON.parse(text);
      } catch (e) { }

      // network error
      if (!response.ok) {
        if ((response.status === 401)
          || (response.status === 403)
        ) {
          return handle401Status(url, method, data_orig)
        }

        const error = (data && data.error) || (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      // api error
      const error = (data && data.error) || (data && data.message) || response.statusText;
      if (data && data.error) return Promise.reject(error)

      return data;
    });
}

function handle401Status(url, method, data) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/refresh`, requestOptions).then(handleResponse)
    .then(response => {
      localStorage.setItem('csrf', JSON.stringify(response.csrf))
      return getUser().then(user => {
        // retrying request with a new refreshed csrf token
        return fetch(url, getRequestOptions(method, data)).then(handleResponse)
      })
    }).catch(error => {
      logout()
      return Promise.reject(error);
    });
}

function handleResponse(response) {
  return response.text().then(text => {
    let data = {}
    try {
      data = JSON.parse(text);
    } catch (e) { }

    // network error
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }

      const error = (data && data.error) || (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    // api error
    const error = (data && data.error) || (data && data.message) || response.statusText;
    if (data && data.error) return Promise.reject(error)

    return data;
  });
}
