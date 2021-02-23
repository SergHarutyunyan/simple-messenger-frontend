import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import Navigationbar from './Navbar';

const Chat = () => {
    const [ connection, setConnection ] = useState(null);
    const [ chat, setChat ] = useState([]);
    const latestChat = useRef(null);

    const [userName, setUserName] = useState('');
    const handleChange = (e) => setUserName(e.target.value);

    latestChat.current = chat;

    const onExit = async () => {
        if (connection) {
            try {
                await connection.stop();                       
                setConnection(null);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }
        
    const handleLogin = () => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/hubs/chat')
            .withAutomaticReconnect()
            .build();
    
        setConnection(newConnection);      
    };

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    sessionStorage.setItem('userExist', true);

                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                    
                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);
  
    // useEffect(() => {
    //     if(sessionStorage.getItem('userExist')) {
    //         setUser(true);           
    //     }
    //     else {
    //         if(connection){
    //             const logout = async () => {
    //                 await connection.stop();
    //                 setUser(false);                 
    //             }    
    //             logout();   
    //         }    
    //     }                 
    // }, [connection]);

    const sendMessage = async (message) => {
        const chatMessage = {
            user: userName,
            message: message
        };

        if (connection) {
            try {
                await connection.send('SendMessage', chatMessage);
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }   

    return (
        <div>
            <Modal show={!connection}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group >
                        <Form.Label> Name: </Form.Label>
                        <Form.Control type="input" onChange={handleChange} value={userName} placeholder="name input" required/>                  
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleLogin}>
                        Submit
                    </Button>    
                </Modal.Body>
            </Modal>
            <Navigationbar exit={onExit}/>
            <ChatInput user={userName} sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat}/>
        </div>
    );
};

export default Chat;