

function ExceptionWithMessageAndResponse(response, message) {
  this.response = response
  this.message = message
}

const handleErrors = (response) => {
  let contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    console.log('json')
    if (response.ok) {
      return response.json();
    }
    throw new ExceptionWithMessageAndResponse(response.json(), "")
  } else {
    console.log('not json')
    if (response.ok) {
      return response.text();
    }
    throw new ExceptionWithMessageAndResponse(response.text(), "Network error") //TypeError("Oops, we haven't got JSON!");
  }
}

const postCsrfRequest = (url, method, data) => {
  let csrf = ''
  try {
    csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  } catch (e) { }
  return new Request(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
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

export { postCsrfRequest, handleErrors }

