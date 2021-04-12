export const buildAuthHeader = () => {
  // return authorization header with basic auth credentials
  let user = JSON.parse(localStorage.getItem('user'))

  if (user && user.authenticationData) {
    return user.authenticationData
  }
}
