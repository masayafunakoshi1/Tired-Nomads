import React, {useState, useEffect} from 'react'
import '../../../styles/InfoWindow.css'
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';
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
import {db} from '../../../firebase'

/////////////////////////////////// Material UI Styles ////////////////////////////////////
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '50ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

////////////////////////////////// Functional Component //////////////////////////////////////
const Reviews = ({user, selected}) => {
    const classes = useStyles();
    const [review, setReview] = useState('')
    const [reviewArr, setReviewArr] = useState(null)
    const userReview = db.collection('users').doc(user ? user.uid : null).collection('reviews')

    //Button to save review
    const handleSubmit = async (e) => {
        e.preventDefault();
        onReviewSet();
        await setReview('')
      }

    //Sending data into firestore
    const onReviewSet = () => {
        userReview.doc(`${selected.key}`).set({
            review
        }).then(() => {
            console.log("Review saved successfully")
        }).catch((err) => {
            console.log(err)
        })
      }

    //Delete review without deleting marker
    //Eventually want to allow for multiple reviews and individually delete them from the array
    const deleteReviewBtn = () => {
        const fbReviewID = userReview.doc(`${selected.key}`)
        fbReviewID.delete()
        .then(() => {
          setReviewArr(null)
        }).catch((error) => {
          console.error("Error removing document: ", error)
        })
    }
    
    //Gets "review" value from firestore and sets it on selected marker's information window
    useEffect(() => {
      userReview.doc(`${selected.key}`).get()
      .then((doc) => {
        if(doc.exists){
          setReviewArr([doc.data().review])
        }else{
          console.log("Review doesn't exist")
        }
      }).catch((err) => {
        console.log("Process unsuccessful", err)
      })
    }, [selected, onReviewSet])



    return (
        <List className={classes.root}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={user.avatar ? user.avatar : `${AccountCircleIcon}`}/>
            </ListItemAvatar>
            <ListItemText
            primary={user.userName}
            secondary={
                <div>
                    <Typography
                        component={"span"}
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
          {/*////// May want to add multiple reviews eventually/////// */}
                      {reviewArr}

                      {reviewArr !== null || undefined ? <IconButton 
                        color="secondary"
                        type="delete" 
                        aria-label="delete"
                        onClick={deleteReviewBtn}
                        >
                        <DeleteIcon />
                      </IconButton> : ""}

                    </Typography>


                    <Divider component={"span"}/>
                </div>
            }
            />
        </ListItem>
            <form onSubmit={e => handleSubmit(e)} noValidate autoComplete="off">
                <TextField 
                  multiline={true}
                  type="text"
                  id="outlined-basic" 
                  label="Add a review"
                  placeholder="Write review here" 
                  variant="outlined"
                  size="medium"
                  value={review}
                  rows={2}
                  rowsMax={6} 
                  // onChange={(e) => setText(e)}
                  onChange={e => {
                                const review = e.target.value;
                                setReview(review); 
                                }}
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
