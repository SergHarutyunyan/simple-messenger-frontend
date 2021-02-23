import apiConfig from "../apiConfig";

const handleAPIResponse = (response) => {
  const { ok, statusText, status } = response

  if (ok) {
    return response.text()
      .then(JSON.parse)
  }

  if (status === 401) {
    // auto logout if 401 response returned from api
    logout();
    window.location.reload(true);
  }

  return Promise.reject(new Error(statusText))
}

const buildAuthHeader = () => ({
  'Authorization': getAuthenticationData()
})

const getAuthenticationData = () => {
  // return authorization header with basic auth credentials
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.authenticationData) {
    return user.authenticationData;
  }
}

export const login = (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${apiConfig.Url}account/login`, requestOptions)
    .then(handleAPIResponse)
    .then((user) => {
      if (user) {
        user.authdata = window.btoa(email + ":" + user.username + ":" + password);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

export const register = (email, username, password) => {

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password })
  };

  return fetch(`${apiConfig.Url}account/register`, requestOptions)
    .then(handleAPIResponse)
    .then((user) => {
      if (user) {
        user.authdata = window.btoa(email + ":" + username + ":" + password);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

export const logout = () => localStorage.removeItem("user");

export const getUsers = (currentUser) => {
  const requestOptions = {
    method: "GET",
    headers: buildAuthHeader()
  };

  return fetch(`${apiConfig.Url}account/all?user=${currentUser}`, requestOptions)
    .then( (response) => {
      return response.text()
      .then(JSON.parse)
    })
}

