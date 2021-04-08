import React from 'react'
import '../App.css';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import PopoverComp from './PopoverComp'

export const Locate = ({panTo, setMarkers, setSelected, setChanges}) => {

    return (
        <>
            {/*FIND YOUR LOCATION BUTTON */}
            <button 
            className="locate" onClick={() => {
                //On click will locate position of user if location is allowed in browser
                navigator.geolocation.getCurrentPosition((position)=>{
                    //panTo user's location
                    panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                }, () => null);
            }}
            >
                <img src="compass.svg" alt="compass - locate me" />
            </button>

            {/*MARKER RESET BUTTON */}
            <button 
            className="reset" onClick={() => {
                setMarkers([]);
                setSelected(null);
                setChanges(true);
            }}
            >
                <DeleteSweepIcon color="secondary" fontSize="large" cursor="pointer"/>
            </button>

            
        </>
    )
}

export default Locate