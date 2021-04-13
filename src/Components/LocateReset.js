import React, {useRef} from 'react'
import '../App.css';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import PopoverComp from './PopoverComp'

export const LocateReset = (
    {panTo, 
    setMarkers, 
    setSelected, 
    setChanges, 
    setPopoverNum, 
    popoverNum}
            ) => {

    const locateBtn = useRef(null)

    return (
        <>
            {/*FIND YOUR LOCATION BUTTON */}
            <button 
            ref={locateBtn}
            onMouseOver={() => setPopoverNum(0)}
            className="locate"
            onClick={() => {
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
            <PopoverComp popoverNum={popoverNum}>
                Find Yourself
            </PopoverComp>

            {/*MARKER RESET BUTTON */}
            <button 

            
            className="reset" onClick={() => {
                setMarkers([]);
                setSelected(null);
                setChanges(true);
            }}
            >
                <DeleteSweepIcon color="secondary" fontSize="large" cursor="pointer"/>

                <PopoverComp onMouseOver={() => setPopoverNum(1)} popoverNum={popoverNum}>
                    Reset Markers
                </PopoverComp>
            </button>
            
        </>
    )
}

export default LocateReset