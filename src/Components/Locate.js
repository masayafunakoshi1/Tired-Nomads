import React from 'react'
import '../App.css';
import RefreshIcon from '@material-ui/icons/Refresh';

export const Locate = ({panTo, setMarkers, setSelected}) => {
    return (
        <div>
            <button className="locate" onClick={() => {
                //On click will locate position of user if location is allowed in browser
                navigator.geolocation.getCurrentPosition((position)=>{
                    //panTo user's location
                    panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                }, () => null);
            }}>
                <img src="compass.svg" alt="compass - locate me" />
            </button>
            <button className="reset" onClick={() => {
                setMarkers([]);
                setSelected(null);
            }}>
                <RefreshIcon color="secondary" fontSize="large" cursor="pointer"/>
            </button>
        </div>
    )
}

export default Locate