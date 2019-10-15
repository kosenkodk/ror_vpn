export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));
  let csrf = JSON.parse(localStorage.getItem('csrf'));

  if (user && user.token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    };
  } else if (csrf) {
    return {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrf
    };
  } else {
    return {};
  }
}