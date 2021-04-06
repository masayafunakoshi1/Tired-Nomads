import React, {useState} from 'react'
import {
  InfoWindow
} from "@react-google-maps/api";
import '../../App.css'
import {Button, ClickAwayListener} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Ratings from './InfoComponents/Ratings'
import Reviews from './InfoComponents/Reviews'

const Information = ({selected, setSelected, deleteMarker, currentUser}) => {

    const [user, setUser] = useState({
       userName: currentUser ? `${currentUser.email}` : 'JohnChongus@gmail.com',
       avatar: currentUser ? `${currentUser.avatar}` : null,
    })
    const [reviewHolder, setReviewHolder] = useState({
      review: "I thought that this was a really nice place to sleep!"
    })

    //Handle Click Away from Component
    const handleClickAway = () => {
      setSelected(null)
    }

    return (
          <InfoWindow 
            position={{lat: parseFloat(selected.lat), lng: parseFloat(selected.lng)}} 
            onCloseClick = {() => {
                setSelected(null);
            }}>
          <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                <h2>Slept Here</h2>
                <p>Time: {`${selected.time}`}</p>

                <Ratings selected={selected} currentUser={currentUser}/>
                <Reviews user={user} reviewHolder={reviewHolder} setReview={setReviewHolder}/>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteMarker(selected.key)}
                    >
                    Delete
                </Button>
                </div>
            </ClickAwayListener>
          </InfoWindow>
    )
}

export default Information
