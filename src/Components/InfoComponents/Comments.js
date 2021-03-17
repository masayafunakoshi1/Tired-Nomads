import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


const Comments = ({user}) => {
    const classes = useStyles();
    return (
        <List className={classes.root}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar src={user.avatar ? user.avatar : AccountCircleIcon}/>
            </ListItemAvatar>
            <ListItemText
            primary={user.userName}
            secondary={
                <>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                    </Typography>
                    {user.comment}
                </>
            }
            />
        </ListItem>
        </List>
    )
}

export default Comments
