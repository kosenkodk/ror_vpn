import { config } from 'config';
import { history, authHeader } from '../_helpers';
const autoRefreshToken = true;
const credentials = 'same-origin'

export const userService = {
  login,
  signin_check_credentials,
  login_check_code2fa,
  logout,
  signup,
  getAll,
  getUser,
  getTickets,
  addTicket,
  viewTicket,
  updateTicket,
  getInvoices,
  addPaymentMethod,
  getPaymentMethods,
  deletePaymentMethodById,
  getPlans,
  getConfigs,
  getCountries,
  getDepartments,
  readAllNotifications,
  getNotifications,
  contactUs,
  cancelAccount,
  getAccountCancellationReasons,
  changeLoginPassword,
  changeLoginEmail,
  changePlan,
  deleteAccount,
  getQrCodeUrl,
  enable2FA,
  disable2FA,
  getReferLink,
  refer_friend,
  updateInvoice,
};

function readAllNotifications() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/notifications/read_all`, 'POST', {})

  const requestOptions = {
    method: 'POST',
    credentials: credentials,
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/notifications/read_all`, requestOptions).then(handleResponse);
}

function refer_friend(emails) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/refer_friend`, 'POST', emails)

  const requestOptions = {
    method: 'POST',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify(emails)
  };

  return fetch(`${config.apiUrl}/refer_friend`, requestOptions).then(handleResponse);
}

function getReferLink() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/refer_friend/link`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/refer_friend/link`, requestOptions).then(handleResponse);
}

function getQrCodeUrl() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/user_mfa_session/new`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/user_mfa_session/new`, requestOptions).then(handleResponse);
}

function enable2FA(data) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/user_mfa_session`, 'POST', data)

  const requestOptions = {
    method: 'POST',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify(data)
  };

  return fetch(`${config.apiUrl}/user_mfa_session`, requestOptions).then(handleResponse);
}

function disable2FA() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/user_mfa_session/0`, 'DELETE', { id: '' })

  const requestOptions = {
    method: 'DELETE',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify({ id: '' })
  };

  return fetch(`${config.apiUrl}/user_mfa_session`, requestOptions).then(handleResponse);
}

function deleteAccount(data) {
  // if (autoRefreshToken)
  //   return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/delete`, 'DELETE', data)

  return fetch(`${config.apiUrl}/delete`, {
    method: 'DELETE',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify(data)
  })
    .then(handleResponse)
    .then(response => {
      logout();
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

function signin_check_credentials(email, password) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/signin_check_credentials`, 'POST', { email, password })

  const requestOptions = {
    method: 'POST',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify({ email, password })
  };

  return fetch(`${config.apiUrl}/signin_check_credentials`, requestOptions).then(handleResponse);
}

function login_check_code2fa(data) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/signin_check_code`, 'POST', data)

  const requestOptions = {
    method: 'POST',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify(data)
  };

  return fetch(`${config.apiUrl}/signin_check_code`, requestOptions).then(handleResponse);
}

function login(data) {
  const requestOptions = {
    method: 'POST',
    credentials: credentials,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
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
  return fetch(`${config.apiUrl}/me`, {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  })
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
    credentials: credentials,
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
    credentials: credentials,
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function contactUs(contact) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/contacts`, 'POST', { contact: contact })

  const requestOptions = {
    method: 'POST',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify({ contact: contact }),
    // body: JSON.stringify({ contact })
  }
  return fetch(`${config.apiUrl}/contacts`, requestOptions).then(handleResponse);
}

function updateInvoice(invoice) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/invoices/${invoice.id}`, 'PATCH', { invoice: invoice })

  const requestOptions = {
    method: 'PATCH',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify({ invoice })
  }
  return fetch(`${config.apiUrl}/invoices/${invoice.id}`, requestOptions).then(handleResponse);
}

function updateTicket(ticket) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/tickets/${ticket.id}`, 'PATCH', { ticket: { id: ticket.id, status: 'closed' } })

  const requestOptions = {
    method: 'PATCH',
    credentials: credentials,
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
    credentials: credentials,
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

function changePlan(data) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/change_plan`, 'POST', data)

  const requestOptions = {
    method: 'POST',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify(data)
  }
  return fetch(`${config.apiUrl}/change_plan`, requestOptions).then(handleResponse);
}

function changeLoginEmail(data) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/change_email`, 'PATCH', data)

  const requestOptions = {
    method: 'PATCH',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify(data)
  }
  return fetch(`${config.apiUrl}/change_email`, requestOptions).then(handleResponse);
}

function addPaymentMethod(data) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/payment_methods`, 'POST', data)

  const requestOptions = {
    method: 'POST',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify(data)
  }
  return fetch(`${config.apiUrl}/payment_methods`, requestOptions).then(handleResponse);
}

function deletePaymentMethodById(id) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/payment_methods/${id}`, 'DELETE', { id: id })

  const requestOptions = {
    method: 'DELETE',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify({ id: id })
  };

  return fetch(`${config.apiUrl}/payment_methods/${id}`, requestOptions).then(handleResponse);

}

function addTicket(ticket) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/tickets`, 'POST', { ticket })

  const requestOptions = {
    method: 'POST',
    credentials: credentials,
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
    credentials: credentials,
    headers: authHeader(),
  }
  return fetch(`${config.apiUrl}/tickets/${id}`, requestOptions).then(handleResponse);
}

function getTickets({ page = 1, status = '' } = {}) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/tickets?page=${page}&status=${status}`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/tickets`, requestOptions).then(handleResponse);
}

function getInvoices() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/invoices`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/invoices`, requestOptions).then(handleResponse);
}

function getPaymentMethods() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/payment_methods`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/payment_methods`, requestOptions).then(handleResponse);
}

function getPlans() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/tariff_plans`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/tariff_plans`, requestOptions).then(handleResponse);
}

function getConfigs() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/configs`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/configs`, requestOptions).then(handleResponse);
}

function getCountries() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/countries`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/countries`, requestOptions).then(handleResponse);
}

function getNotifications(params) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/notifications?${params}`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/notifications?${params}`, requestOptions).then(handleResponse);
}

function getDepartments() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/departments`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/departments`, requestOptions).then(handleResponse);
}

function cancelAccount(data) {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/cancel`, 'POST', data)

  const requestOptions = {
    method: 'POST',
    credentials: credentials,
    headers: authHeader(),
    body: JSON.stringify(data)
  }
  return fetch(`${config.apiUrl}/cancel`, requestOptions).then(handleResponse);
}

function getAccountCancellationReasons() {
  if (autoRefreshToken)
    return sendRequestAndRetryByUrlMethodData(`${config.apiUrl}/account_cancellation_reasons`, 'GET', {})

  const requestOptions = {
    method: 'GET',
    credentials: credentials,
    headers: authHeader()
  }
  return fetch(`${config.apiUrl}/account_cancellation_reasons`, requestOptions).then(handleResponse);
}

function getRequestOptions(method, data) {
  if (method === 'GET')
    return {
      method: method,
      credentials: credentials,
      headers: authHeader(),
    }
  return {
    method: method,
    credentials: credentials,
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
        if ((response.status === 401) // unauth
          || (response.status === 403) // forbidden
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
    credentials: credentials,
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
