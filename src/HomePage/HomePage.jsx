import React, { useState, useEffect, useRef  } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import apiConfig from "../apiConfig";
import { HubConnectionBuilder} from '@microsoft/signalr';
import { buildAuthHeader } from "../Helpers/AuthHeader"

import { MdExitToApp } from "react-icons/md";
import { useHistory } from 'react-router-dom';

import logo from '../Resources/logo-removebg-preview.png';

import useStyles from './HomePageCSS'
import { getUsers, logout } from '../Services/UserServices'
import { closeHub, getChatHistory } from '../Services/ChatServices'

import { UserList } from '../Components/UserList'
import { Chat } from '../Components/Chat'

const HomePage = () => {
  
  let history = useHistory();
  const classes = useStyles();
  
  const loggedInUser = JSON.parse(localStorage.getItem('user')).username;
  const intervalID = useRef(null);

  const [currentChatUser, setcurrentChatUser] = useState();
  const [userList, setUserList] = useState([]);
  
  const [connection, setConnection] = useState(null);

  const [chatHistory, setChatHistory] = useState(null);

  const handleLogout = (e) => {  
    e.preventDefault();  
        
    if(connection) {
      closeHub(connection);

    logout();

    history.push('/login');
    }
  }

  const openChat = (e) => {
    e.preventDefault();  
    const userCLicked = e.target.innerText;
    setcurrentChatUser(userCLicked);
    getChatHistory(loggedInUser, userCLicked).then((result) => setChatHistory(result));
  }

  const sendMessage = async (message) => { 
    //await submitMessage(connection, loggedInUser, currentChatUser, message);
    if(connection) {
      var response = await connection.invoke('SendChatMessage', message, loggedInUser, currentChatUser);
      setChatHistory((chatHistory) => [
        ...chatHistory,
        {from: response.from.username, to: response.to.username, messageText: response.messageText, sendTime: response.sendTime.toString("HH:mm")}
      ]);
    } 
  }

  useEffect(() => {
    const connection = new HubConnectionBuilder()
            .withUrl(`${apiConfig.Url}chathub?access_token=${buildAuthHeader()}`)
            .withAutomaticReconnect()
            .build();
        
    connection.start()
    .then(result => {
        console.log('Connected!');

        connection.on('ReceiveMessage', response => {
          if(response) {
            setChatHistory((chatHistory) => {
              return [
              ...chatHistory,
              {from: response.from, to: response.to, messageText: response.messageText, sendTime: response.sendTime.toString("HH:mm")}
            ]
          });
          }        
        });
    })
    .catch(e => console.log('Connection failed: ', e));

    setConnection(connection);
  }, [])

  useEffect(() => {   
    if(loggedInUser) {
      getUsers(loggedInUser).then((users) => {    
        setUserList(users.userList);
      });
      intervalID.current = setInterval(() => {
       getUsers(loggedInUser).then((users) => {    
          setUserList(users.userList);
        });
      }, 10000); 
    }
    return () => clearInterval(intervalID.current);
  }, [loggedInUser]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.contacts}>
            Contacts
          </Typography>  
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Messenger
            <img src={logo} className={classes.logo} alt=""/>
          </Typography>         
          <Typography component="h1" variant="h6" color="inherit" noWrap>
              {loggedInUser}
          </Typography>         
          <IconButton color="inherit" onClick={handleLogout}>        
            <Badge>           
              <MdExitToApp /> 
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>     
      <div className={classes.body}>
        <Drawer variant="permanent" >
          <div className={classes.toolbarIcon}>
            <IconButton className={classes.contactsIcon}>
              Contacts
            </IconButton>
          </div>
          <Divider />
            <UserList chatSelection={openChat} chatMembers={userList}/>
        </Drawer>      
        <main className={classes.chat}>
          <Container className={classes.container}>
            <Grid container>       
                <Chat send={sendMessage} history={chatHistory}></Chat>           
            </Grid>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
