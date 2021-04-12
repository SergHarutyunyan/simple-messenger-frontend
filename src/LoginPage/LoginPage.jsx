import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Link as LinkR, useHistory } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Alert as BootAlert } from 'react-bootstrap'

import { login } from '../Services/UserServices'
import logo from '../Resources/logo-removebg-preview.png'

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
  )
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    height: '50px',
  },
}))

export default function LoginPage() {
  const classes = useStyles()

  let history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [wrongLogin, setError] = useState('')
  const [invalidEmail, setInvalidEmail] = useState('')
  const [invalidPassword, setInvalidPassword] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePass = (e) => {
    setPass(e.target.value)
  }

  const validateInput = () => {
    let validationPassed = true

    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      setInvalidEmail('Invalid Email format')
      validationPassed = false
    } else setInvalidEmail('')

    if (password.length < 3) {
      setInvalidPassword('Password length must be at least 3 characters')
      validationPassed = false
    } else setInvalidPassword('')

    return validationPassed
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (validateInput()) {
      login(email, password)
        .then((user) => {
          if (user) {
            history.push({
              pathname: '/',
            })
          }
        })
        .catch((error) => {
          setError(error.message)
        })
    } else {
      setError('')
      return
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} className={classes.logo} alt="" />
        <Typography component="h1" variant="h5" color="initial">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <BootAlert show={wrongLogin} variant="danger">
            {wrongLogin}
          </BootAlert>
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
          <BootAlert show={invalidEmail} variant="danger">
            {invalidEmail}
          </BootAlert>
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
          <BootAlert show={invalidPassword} variant="danger">
            {invalidPassword}
          </BootAlert>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {' '}
            Sign In{' '}
          </Button>
          <Grid container>
            <Grid item xs>
              <LinkR to="/forgot" variant="body2">
                Forgot password?
              </LinkR>
            </Grid>
            <Grid item>
              <LinkR to="/register" variant="body2">
                Don't have an account? Sign Up
              </LinkR>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
