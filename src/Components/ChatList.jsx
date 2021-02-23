import React  from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
    group: {
        display: 'grid',
        whiteSpace : 'nowrap'
    }
  }));

export const ChatList = (props) => {

    const classes = useStyles();
    
    const { chatMembers, chatSelection } = props;

    if(chatMembers.length !== 0) {
        return (
            <div id="users" className={classes.users}>
                <div className={classes.group}>
                    {chatMembers.map(element =>
                        <Button onClick={chatSelection}>{element}</Button>                      
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
