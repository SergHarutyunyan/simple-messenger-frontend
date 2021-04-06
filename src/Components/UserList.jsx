import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(() => ({
    group: {
        display: 'grid',
        gridTemplateColumns: '150px 50px'
    },
    list: {
        display: 'flex',
        textTransform: 'none',
        width: '200px',
        textAlign: 'left'
    },
    status: {
        margin: '5px',
        height: '25px'
    },
    username: {
        fontSize: '18px',
        width: 'calc(100% - 50px)',
        marginRight: '50px'
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
                            </Button>   
                            <FiberManualRecordIcon className={`${classes.status} ${element.connected ? classes.connected : classes.disconnected}`}/>                        
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
