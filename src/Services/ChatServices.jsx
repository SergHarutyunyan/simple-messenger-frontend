import apiConfig from "../apiConfig";
import { buildAuthHeader } from "../Helpers/AuthHeader"

export const getChat = (user1, user2) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", 'Authorization' : buildAuthHeader() }, 
      body: JSON.stringify({ user1, user2 })
    };
  
    return fetch(`${apiConfig.Url}chat/getchannel`, requestOptions)
      .then((response) => {
        if(response) {
            return response.text().then(JSON.parse);
        }
      });
  }