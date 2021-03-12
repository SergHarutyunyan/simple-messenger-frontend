import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(() => ({
    group: {
        display: 'grid',
        whiteSpace : 'nowrap'
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
        textTransform: 'none'
    },
    status: {
        margin: '0 0 0 15px',
        height: '25px'
    },
    username: {
        fontSize: '18px;'
    },
    connected: {
        color: 'green'
    },
    disconnected: {
        color: 'red'
    }
  }));

export const UserList = (props) => {

    const classes = useStyles();

    const { chatMembers, chatSelection } = props;

    if(chatMembers.length !== 0) {
        return (               
            <div id="users">
                <div className={classes.group}>               
                    {chatMembers.map(element => 
                        <>                    
                            <Button onClick={chatSelection} className={classes.list}>
                                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.username}>
                                    {element.username}
                                </Typography>
                                <FiberManualRecordIcon className={`${classes.status} ${element.connected ? classes.connected : classes.disconnected}`}/>   
                            </Button>                           
                        </>
                    )}    
                </div>            
            </div>
        );
    }
    else{
        return (
            <div>
                    
            </div>
        );
    }
}
