import React, {useState} from 'react'
import {
  InfoWindow
} from "@react-google-maps/api";
import '../../App.css'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import {db} from '../../firebase'

import Ratings from './InfoComponents/Ratings'
import Comments from './InfoComponents/Comments'


const Information = ({selected, setSelected, deleteMarker}) => {

    const userRating = db.collection('users').doc('user1').collection('ratings')
    const userReviews = db.collection('users').doc('user1').collection('reviews')

    const [user, setUser] = useState({
       userName: "John Chongus",
       avatar: null,
       comment: "I thought that this was a really nice place to sleep!"
    })

    return (
            <InfoWindow 
            position={{lat: parseFloat(selected.lat), lng: parseFloat(selected.lng)}} 
            onCloseClick = {() => {
                setSelected(null);
            }}>

                <div>
                <h2>Slept Here</h2>
                <p>Time: {`${selected.time}`}</p>

                <Ratings userRating={userRating}/>
                <Comments userReviews={userReviews} user={user}/>
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

    )
}

export default Information
