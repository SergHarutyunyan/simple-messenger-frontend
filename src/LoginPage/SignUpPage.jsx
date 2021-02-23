import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkR, useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';

import { register } from '../Services/UserServices';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        HelpEaters
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function SignUp() {
  let history = useHistory();

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  const [confirmPassword, setConfirmPass] = useState('');

  const [error, setError] = useState('');

  const handleEmail = (e) => { setEmail(e.target.value);  }
  const handleUsername = (e) => { setUsername(e.target.value);  }
  const handlePass = (e) => { setPass(e.target.value);  } 
  const handleConfirmPass = (e) => { setConfirmPass(e.target.value); }

  useEffect(() => {     
    if(password !== confirmPassword) {
        setError('Passwords do not match.');
    }
    else{
        setError('');
    }
  }, [confirmPassword]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if(email && password && confirmPassword && !error)
    {
        register(email, username, password).then(
            user => {                  
              if(user) {
                history.push({
                  pathname: '/' });            
              };
            });       
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="initial">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"    
            value={email}
            onChange={handleEmail}   
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"    
            value={username}
            onChange={handleUsername}   
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePass}   
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={handleConfirmPass}          
          />
              <Alert show={error} variant="danger">{error}</Alert>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          > Sign Up </Button>
          <Grid container>           
            <Grid item xs>
              <LinkR to="/login" variant="body2">
                {"Already have an account? Sign in"}
              </LinkR>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}