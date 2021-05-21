import React, {useState} from 'react'
import {
    Marker
  } from "@react-google-maps/api";
  
import DistanceInformation from './DistanceInformation'

const TripMarkers = (
    {tripMarkers, 
    setTripMarkers, 
    tripMarkersShow, 
    tripMarkerDetails },
    userTripMarkers 
    ) => {
    const [tripSelected, setTripSelected] = useState(null) //Keeps track of what trip marker is currently selected
    const [tripSelectedDest, setTripSelectedDest] = useState(false)
//////////////////////////////// UNDER CONSTRUCTION //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Functions delete trip markers and trip data
    const deleteTrip = async (props) => {
        deleteTripData(props)
        const newTripList = tripMarkers.filter((deleteFromTrips) => {
            if(!tripSelected !== deleteFromTrips){
                return deleteFromTrips
            }
        })
        setTripMarkers(newTripList);
        setTripSelected(null);
    }

    const deleteTripData = (tripName) => {
        const fbTripData = userTripMarkers.doc('newTrip')
        console.log(fbTripData)

        // userTripMarkers.doc(tripName).delete().then(() => {
        //     console.log("Trip Successfully Deleted");
        // }).catch((error) => {console.log("Error removing Trip: ", error)
        // });
    }


    return (
    <>
{/* Origin Marker */}

    <button onClick={() => console.log(tripMarkerDetails)}>click me </button>

        {tripMarkersShow && tripMarkers.map((newMarker) => (
                  <Marker 
                  key={`${newMarker.tripName}`}
                  position={{lat: parseFloat(newMarker.origin.lat), lng: parseFloat(newMarker.origin.lng)}}
                  icon={{
                      url: "/greenMarker.svg",
                      scaledSize: new window.google.maps.Size(40, 40),
                      origin: new window.google.maps.Point(0,0),
                      anchor: new window.google.maps.Point(15,15),
                  }}
                  onClick={() => {
                    setTripSelected(newMarker)
                    }}
                  />
              ))} 

{/* Destination Marker */}
        {tripMarkersShow && tripMarkers.map((newMarker) => (
                <Marker 
                key={`${newMarker.tripName}`}
                position={{lat: parseFloat(newMarker.destination.lat), lng: parseFloat(newMarker.destination.lng)}}
                icon={{
                    url: "/redMarker.svg",
                    scaledSize: new window.google.maps.Size(40, 40),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(15,15),
                }}
                onClick={() => {
                    setTripSelected(newMarker)
                    setTripSelectedDest(true)
                }}
                />
            ))}

    {tripSelected ?
        <DistanceInformation 
        deleteTrip={deleteTrip} //Function
        tripMarkerDetails={tripMarkerDetails}
        tripSelected={tripSelected}
        tripSelectedDest={tripSelectedDest}
        setTripSelectedDest={setTripSelectedDest}
        setTripSelected={setTripSelected}
         /> 
         : null}

    </>
    )
}

export default TripMarkers
