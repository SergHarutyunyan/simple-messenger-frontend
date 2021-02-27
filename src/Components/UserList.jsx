import React from 'react';
import Button from '@material-ui/core/Button';
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
        justifyContent: 'center'
    },
    status: {
        margin: '0 0 0 15px',
        height: '20px'
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
            <div id="users" className={classes.users}>
                <div className={classes.group}>               
                    {chatMembers.map(element => 
                        <>                    
                            <Button className={classes.list}>
                                <Button onClick={chatSelection}>{element.username}</Button>
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
