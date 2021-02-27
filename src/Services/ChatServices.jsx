import apiConfig from "../apiConfig";
import { buildAuthHeader } from "../Helpers/AuthHeader"
import { HubConnectionBuilder} from '@microsoft/signalr';

export const createConnection = () => {
   
    const connection = new HubConnectionBuilder()
            .withUrl(`${apiConfig.Url}chathub?access_token=${buildAuthHeader()}`)
            .withAutomaticReconnect()
            .build();
        
    connection.start()
        .then(result => {
            console.log('Connected!');
            })
        .catch(e => console.log('Connection failed: ', e))    

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

