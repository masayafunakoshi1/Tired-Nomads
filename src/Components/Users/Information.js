import React, {useState} from 'react'
import {
  InfoWindow
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import '../../App.css'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import Ratings from '../InfoComponents/Ratings'
import Comments from '../InfoComponents/Comments'


const Information = ({selected, setSelected, deleteMarker}) => {

    const [user, setUser] = useState({
       userName: "John Chongus",
       avatar: null,
       comment: "I thought that this was a really nice place to sleep!"

    })

    console.log(selected)

    return (
            <InfoWindow 
            position={{lat: parseFloat(selected.lat), lng: parseFloat(selected.lng)}} 
            onCloseClick = {() => {
                setSelected(null);
            }}>

                <div>
                <h2>Slept Here</h2>
                <p>Time: {`${selected.time.toString()}`}</p>

                <Ratings/>
                <Comments user={user}/>
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
