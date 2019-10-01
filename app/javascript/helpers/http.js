
const handleErrors = (response) => {
  if (response.ok) {
    return response.json();
    // return [response.text(), response.status]
    // return { response.text, response.status }
  }
  throw response //new Error('Network response was not ok.');
}

export { handleErrors }

