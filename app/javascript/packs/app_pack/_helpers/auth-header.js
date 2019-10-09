export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));
  let csrf = JSON.parse(localStorage.getItem('csrf'));

  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else if (csrf) {
    return { 'X-CSRF-Token': csrf };
  } else {
    return {};
  }
}