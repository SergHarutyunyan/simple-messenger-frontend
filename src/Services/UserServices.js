import apiConfig from "../apiConfig";
import { buildAuthHeader } from "../Helpers/AuthHeader"
import { handleAPIResponse } from "../Helpers/HandleAPIRespone"

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
    }).catch((errorResponse) =>
    { 
      return Promise.reject(errorResponse);
    })
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
    headers: { 'Authorization' : buildAuthHeader() }
  };

  return fetch(`${apiConfig.Url}account/all?user=${currentUser}`, requestOptions)
    .then( (response) => {
      return response.text()
      .then(JSON.parse)
    })
}

