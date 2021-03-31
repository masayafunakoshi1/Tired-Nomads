import React, {useState} from 'react'
import {
  InfoWindow
} from "@react-google-maps/api";
import '../../App.css'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Ratings from './InfoComponents/Ratings'
import Comments from './InfoComponents/Reviews'
import ClickOutsideAlerter from'./InfoComponents/ClickOutsideAlerter'

const Information = ({selected, setSelected, deleteMarker, currentUser}) => {

    // const userRating = db.collection('users').doc(currentUser.uid).collection('ratings')
    // const userReviews = db.collection('users').doc(currentUser.uid).collection('reviews')

    const [user, setUser] = useState({
       userName: `${currentUser.email}`,
       avatar: `${currentUser.avatar}`,
       review: "I thought that this was a really nice place to sleep!"
    })

    return (
        <ClickOutsideAlerter>
            <InfoWindow 
            position={{lat: parseFloat(selected.lat), lng: parseFloat(selected.lng)}} 
            onCloseClick = {() => {
                setSelected(null);
            }}>

                <div>
                <h2>Slept Here</h2>
                <p>Time: {`${selected.time}`}</p>

                <Ratings selected={selected} currentUser={currentUser}/>
                <Comments user={user} />
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteMarker(selected.key)}
                    >
                    Delete
                </Button>
                </div>

            </InfoWindow>
        </ClickOutsideAlerter> 

    )
}

export default Information
