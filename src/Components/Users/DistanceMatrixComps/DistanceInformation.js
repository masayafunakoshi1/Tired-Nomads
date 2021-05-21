import React from 'react'
import {
    InfoWindow
  } from "@react-google-maps/api";
import {Button, ClickAwayListener} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const DistanceInformation = (props) => {

    // Handle Click Away from Component
    const handleClickAway = () => {
        props.setTripSelected(null)
        props.setTripSelectedDest(false)
      }

    return (
        <InfoWindow
        position={props.tripSelectedDest ? 
            {lat: parseFloat(props.tripSelected.destination.lat), lng: parseFloat(props.tripSelected.destination.lng)} : 
            {lat: parseFloat(props.tripSelected.origin.lat),
            lng: parseFloat(props.tripSelected.origin.lng)}}
        onCloseClick={() => {
            props.setTripSelected(null)
            props.setTripSelectedDest(false)
        }}
        >
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <h3>{props.tripSelected.tripName}</h3>
                <p>Distance: 2km</p>
                <p>Duration: 1hr</p>

                <Button onClick={() => console.log(props.tripMarkerDetails)}> Check </Button>
                <div>
                    <Button 
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => props.deleteTrip(props.tripSelected.tripName)}
                        >
                        Delete Trip
                    </Button> 
                </div>
            </div>
        </ClickAwayListener>
    </InfoWindow>
    )
}

export default DistanceInformation
