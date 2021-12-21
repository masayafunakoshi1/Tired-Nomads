import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";

/////////////////////////////////// Material UI Styles ////////////////////////////////////
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "41ch",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "40ch",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "30ch",
    },
  },
  inline: {
    display: "inline",
  },
  submitBtn: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "160px",
    },
  },
  listItem: {
    overflow: "auto",
    maxHeight: "170px",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "100px",
    },
  },
}));

////////////////////////////////// Functional Component //////////////////////////////////////
const Reviews = ({ user, selected }) => {
  const classes = useStyles();
  const [review, setReview] = useState("");
  const [reviewDep, setReviewDep] = useState(false); //Review update on submit
  const [reviewArr, setReviewArr] = useState(null);
  const userReview = db
    .collection("users")
    .doc(user ? user.uid : null)
    .collection("reviews");

  //Button to save review
  const handleSubmit = async (e) => {
    e.preventDefault();
    onReviewSet();
    setReview("");
  };

  //Sending data into firestore
  const onReviewSet = () => {
    userReview
      .doc(`${selected.key}`)
      .set({
        review,
      })
      .then(() => {
        setReviewDep(true);
        console.log("Review saved successfully");
      })
      .then(() => {
        setReviewDep(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Delete review without deleting marker
  //Eventually want to allow for multiple reviews and individually delete them from the array
  const deleteReviewBtn = () => {
    const fbReviewID = userReview.doc(`${selected.key}`);
    fbReviewID
      .delete()
      .then(() => {
        setReviewArr(null);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  //Gets "review" value from firestore and sets it on selected marker's information window
  useEffect(() => {
    userReview
      .doc(`${selected.key}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setTimeout(() => {
            setReviewArr([doc.data().review]);
          }, 100);
        } else {
          console.log("Review doesn't exist");
        }
      })
      .catch((err) => {
        console.log("Process unsuccessful", err);
      });
  }, [selected, reviewDep]);

  return (
    <List className={classes.root}>
      <ListItem className={classes.listItem} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={user.avatar ? user.avatar : `${AccountCircleIcon}`} />
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
                <p>
                  {user && user.uid !== "user1"
                    ? reviewArr
                    : "This was a nice Walmart to sleep at"}
                </p>

                {reviewArr !== null || undefined ? (
                  <IconButton
                    color="secondary"
                    type="delete"
                    aria-label="delete"
                    onClick={deleteReviewBtn}
                    className="deleteBtnInfo"
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  ""
                )}
              </Typography>

              <Divider component={"span"} />
            </div>
          }
        />
      </ListItem>
      <form onSubmit={(e) => handleSubmit(e)} noValidate autoComplete="off">
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
          onChange={(e) => {
            const review = e.target.value;
            setReview(review);
          }}
        />
        <IconButton
          color="primary"
          type="submit"
          aria-label="submit"
          className={classes.submitBtn}
        >
          <PublishIcon />
        </IconButton>
      </form>
    </List>
  );
};

export default Reviews;
