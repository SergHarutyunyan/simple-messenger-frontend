import { logout } from "../Services/UserServices"

export const handleAPIResponse = (response) => {
    const { ok, statusText, status } = response
  
    if (ok) {
      return response.text()
        .then(JSON.parse);
    }
  
    if (status === 401) {
      // auto logout if 401 response returned from api
      logout();
      window.location.reload(true);
    }

    if(status === 400) { 
        var errmsg = response.text().then(JSON.parse).then((err) => { return err; })       
        return Promise.reject(errmsg);      
    }
  
    return Promise.reject(new Error(statusText))
  }