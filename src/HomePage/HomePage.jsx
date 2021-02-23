import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MdExitToApp } from "react-icons/md";
import { useHistory } from 'react-router-dom';

import useStyles from './HomePageCSS'
import { getUsers, logout } from '../Services/UserServices'
import { ChatList } from '../Components/ChatList'

const HomePage = () => {
  
  let history = useHistory();

  const userName = JSON.parse(localStorage.getItem('user')).username;

  const [userList, setUserList] = useState([]);

  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();  
    logout();
    history.push('/login');
  }

  const openChat = (e) => {
    e.preventDefault();  
    const userClicked = e.target.innerHTML;
    
  }

  useEffect(() => {
      getUsers(userName).then((users) => {
        const data = users.userList;             
        setUserList(data)
      });
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />            
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Messenger
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
              {userName}
            </Typography>         
          <IconButton color="inherit" onClick={handleLogout}>        
            <Badge>           
              <MdExitToApp /> 
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton className={classes.contacts}>
            Contacts
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
           <ChatList chatSelection={openChat} chatMembers={userList}/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>                  
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default HomePage;
