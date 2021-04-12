import React, { useState } from 'react'
import Moment from 'react-moment'
import 'moment-timezone'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { BiSend } from 'react-icons/all'
import 'bootstrap/dist/css/bootstrap.min.css'

const useStyles = makeStyles(() => ({
  inputLen: {
    width: 'calc(100% - 250px)',
    position: 'absolute',
    bottom: '0px',
  },
  input: {
    maxHeight: '75px',
    minHeight: '50px',
    resize: 'none',
    padding: '10px',
    boxSizing: 'border-box',
    border: 'none',
    fontSize: '15px',
    width: '100%',
    fontFamily: 'Sniglet cursive',
    backgroundColor: 'lightsteelblue',
    transition: 'border 0.5s',
    borderRadius: '20px',
    outline: 'none',
    paddingRight: '50px',
    overflow: 'auto',
  },
  sendMessage: {
    float: 'right',
    position: 'absolute',
    marginTop: '6px',
    right: '5px',
  },
  sendIcon: {
    height: '35px',
    width: '30px',
  },
  chat: {
    position: 'absolute',
    width: 'calc(100% - 250px)',
    maxHeight: '85%',
    overflowY: 'auto',
  },
  rowUI: {
    width: 'auto',
    borderRadius: '25px',
    display: 'inline-block',
    wordBreak: 'break-all',
  },
  right: {
    display: 'table-row',
    background: '#e6ffff',
    float: 'right',
    clear: 'both',
  },
  left: {
    display: 'table-row',
    background: '#eeefff',
    float: 'left',
    clear: 'both',
  },
  timedate: {
    color: '#747474',
    display: 'block',
    fontSize: '10px',
    margin: '0px 15px',
    float: 'right',
  },
  messageConentLeft: {
    textAlign: 'left',
    marginLeft: '12px',
    fontSize: '16px',
    paddingRight: '15px',
  },
  messageConentRight: {
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '16px',
    paddingLeft: '15px',
  },
}))

export const Chat = (props) => {
  const classes = useStyles()

  const { history, send } = props

  const userName = JSON.parse(localStorage.getItem('user')).username

  const [message, setMessage] = useState('')
  const handleInput = (e) => {
    setMessage(e.target.value)
  }

  const onSave = (e) => {
    e.preventDefault()
    send(message)
    setMessage('')
  }

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      onSave(e)
    }
  }

  if (history) {
    return (
      <>
        <div className={classes.chat}>
          {history.map((element) => (
            <>
              <div
                className={`${classes.rowUI} ${
                  userName === element.from ? classes.right : classes.left
                }`}
              >
                <Typography
                  className={
                    userName === element.from
                      ? classes.messageConentRight
                      : classes.messageConentLeft
                  }
                  noWrap
                >
                  {element.messageText}
                </Typography>
                <Moment className={classes.timedate} format="hh:mm">
                  {element.sendTime}
                </Moment>
              </div>
              <br /> <br />
            </>
          ))}
        </div>
        <div className={classes.inputLen}>
          <textarea
            value={message}
            onChange={handleInput}
            maxLength={300}
            className={classes.input}
            onKeyDown={onEnterPress}
          ></textarea>
          <Button onClick={onSave} className={classes.sendMessage}>
            <BiSend className={classes.sendIcon}></BiSend>
          </Button>
        </div>
      </>
    )
  } else {
    return <div className={classes.chat}></div>
  }
}
