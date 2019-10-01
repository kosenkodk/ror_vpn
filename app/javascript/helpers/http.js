
const handleErrors = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw response //new Error('Network response was not ok.');
}

export { handleErrors }

