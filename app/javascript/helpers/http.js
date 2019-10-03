

import I18n from 'i18n-js/index.js.erb'

function ExceptionWithMessageAndResponse(response, message) {
  this.response = response
  this.message = message
}

const errorMessage = (jsonResponse) => {
  if (jsonResponse.error) {
    // api error
    return jsonResponse.error
  } else if (jsonResponse instanceof TypeError || jsonResponse instanceof Error) {
    // network error
    return jsonResponse.message
  } else {
    // api error (json response as pending promise)
    try {
      return jsonResponse.then(item => {
        return item.error
      })
    } catch (e) {
      return e.message
    }
  }
}

const handleErrors = async (response) => {
  let contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    if (response.ok) {
      return response.json();
    }
    // throw new ExceptionWithMessageAndResponse(response.json(), "")
    // return response.json();
    let responseJson = await response.json()

    throw new TypeError(responseJson && responseJson.error)
  }

  throw new TypeError(I18n.t('errors.api.network_error'))
}

const postCsrfRequest = (url, method, data) => {
  let csrf = ''
  try {
    csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  } catch (e) { }

  return new Request(url, {
    method: method, // *GET, POST, PATCH, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, cors, *same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // same-origin, include, *same-origin, omit
    // redirect: 'follow', // manual, *follow, error,
    // referrer: 'no-referrer', // no-referrer, *client
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRF-Token': csrf
    },
    body: JSON.stringify(data)
  })
}

export { postCsrfRequest, handleErrors, errorMessage }

