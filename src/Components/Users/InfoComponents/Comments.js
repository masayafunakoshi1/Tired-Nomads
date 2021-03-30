import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PublishIcon from '@material-ui/icons/Publish';
import {
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Typography, 
  TextField, 
  Divider,  
  IconButton
} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '50ch',
    backgroundColor: theme.palette.background.paper,
        '& .MuiTextField-root': {
          width: '30ch',
        },
  },
  inline: {
    display: 'inline',
  },
}));


const Comments = ({user}) => {
    const classes = useStyles();

    const handleSubmit =(e) => {
      e.preventDefault();
      console.log("submitted")
    }

    const handleChange = (e) => {
      console.log(e.target.value)
    }


    return (
        <List className={classes.root}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={user.avatar ? user.avatar : `${AccountCircleIcon}`}/>
            </ListItemAvatar>
            <ListItemText
            primary={user.userName}
            secondary={
                <>
                    <Typography
                        component={"span"}
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                    </Typography>
                    {user.comment}
                    <Divider component={"span"}/>
                </>
            }
            />
        </ListItem>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <TextField 
                multiline={true}
                id="outlined-basic" 
                label="Add a review"
                placeholder="Write review here" 
                variant="outlined"
                size="medium"
                rows={2}
                rowsMax={6}
                onChange={(e) => handleChange(e)} 
               />
              <IconButton 
              color="primary" 
              className={classes.iconButton} 
              aria-label="submit"
              >
                <PublishIcon />
              </IconButton>
            </form>
        </List>
    )
}

export default Comments
