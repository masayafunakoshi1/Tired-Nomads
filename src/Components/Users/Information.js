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

    const [user] = useState({
       userName: currentUser ? `${currentUser.email}` : 'JohnChongus@gmail.com',
       avatar: currentUser ? `${currentUser.avatar}` : null,
       uid: currentUser ? currentUser.uid : "user1",
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
            }}
            options={{shouldFocus: false}}
            >
          <ClickAwayListener onClickAway={handleClickAway}>
                <div>
                <h2>Slept Here</h2>
                <h5>{`${selected.time}`}</h5>

                <button className='invBtn' 
                //Invisible button because glitch in InfoWindow 
                /> 

                <Ratings selected={selected} user={user}/>
                <Reviews user={user} selected={selected}/>
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
