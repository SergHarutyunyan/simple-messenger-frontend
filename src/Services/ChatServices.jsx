import apiConfig from "../apiConfig";
import { buildAuthHeader } from "../Helpers/AuthHeader"
import { HubConnectionBuilder} from '@microsoft/signalr';
import { handleAPIResponse } from "../Helpers/HandleAPIRespone"

export const createConnection = () => {
   
    const connection = new HubConnectionBuilder()
            .withUrl(`${apiConfig.Url}chathub?access_token=${buildAuthHeader()}`)
            .withAutomaticReconnect()
            .build();
        
    connection.start()
    .then(result => {
        console.log('Connected!');

        connection.on('ReceiveMessage', message => {
           console.log(message);
        });
    })
    .catch(e => console.log('Connection failed: ', e));

    return connection;
}

export const closeHub = (connection) => {
    connection.stop();
}

export const connectToHub = (connection) => {
    connection.start()
    .then(result => {
        console.log('Connected!');
        })
    .catch(e => console.log('Connection failed: ', e))

    return connection;
}

export const getChatHistory = (user1, user2) => {
    const requestOptions = {
        method: "GET",
        headers: { 'Authorization' : buildAuthHeader() }
      };
    
      return fetch(`${apiConfig.Url}chat/history?user1=${user1}&user2=${user2}`, requestOptions)
        .then(handleAPIResponse)
        .then((response) => {
          if (response) {
            return response.chat;
          }            
        });
}

