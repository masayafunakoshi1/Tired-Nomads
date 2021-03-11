import React from 'react'
import '../App.css';

export const Locate = ({panTo}) => {
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
        </div>
    )
}

export default Locate