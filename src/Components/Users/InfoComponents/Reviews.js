import React, {useState} from 'react'
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
          width: '35ch',
        },
  },
  inline: {
    display: 'inline',
  },
}));


const Reviews = ({user, reviewHolder, setReviewHolder}) => {
    const [text, setText] = useState('')
    const classes = useStyles();

    const handleSubmit =(e) => {
      e.preventDefault();
      setReviewHolder({
        review: `${text}`
      })
      setText('')
      console.log(reviewHolder)
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
                    {reviewHolder.review}
                    <Divider component={"span"}/>
                </>
            }
            />
        </ListItem>
            <form onSubmit={e => handleSubmit(e)} noValidate autoComplete="off">
                <TextField 
                  multiline={true}
                  id="outlined-basic" 
                  label="Add a review"
                  placeholder="Write review here" 
                  variant="outlined"
                  size="medium"
                  rows={2}
                  rowsMax={6}
                  onChange={(e) => setText(e)}
                />
                <IconButton 
                color="primary"
                type="submit" 
                aria-label="submit"
                >
                <PublishIcon />
              </IconButton>
            </form>
        </List>
    )
}

export default Reviews
