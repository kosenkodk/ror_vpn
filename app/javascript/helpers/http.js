

const handleErrors = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw response //new Error('Network response was not ok.');
}

const postCsrfRequest = (url, method, data, csrf) => {
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

