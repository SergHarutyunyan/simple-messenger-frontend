import { logout } from '../Services/UserServices'

export const handleAPIResponse = (response) => {
  const { statusText, status } = response

  if (status === 401) {
    logout()
    window.location.reload(true)
    return Promise.resolve()
  }

  if (status !== 200 && status !== 400) {
    return Promise.reject(statusText)
  }

  return response
    .text()
    .then(JSON.parse)
    .then((response) => {
      if (status === 400) return Promise.reject(new Error(response.message))
      if (status === 200) return response
    })
}
