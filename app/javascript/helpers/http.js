

function ExceptionWithMessageAndResponse(response, message) {
  this.response = response
  this.message = message
}

const handleErrors = (response) => {
  let contentType = response.headers.get("content-type");

  if (response.ok) {
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    throw new ExceptionWithMessageAndResponse(response.text(), "Oops, we haven't got JSON!") //TypeError("Oops, we haven't got JSON!");
  }
  throw new ExceptionWithMessageAndResponse(response.text(), 'Network response was not ok.') //Error('Network response was not ok.')
  // throw response //new Error('Network response was not ok.');
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

