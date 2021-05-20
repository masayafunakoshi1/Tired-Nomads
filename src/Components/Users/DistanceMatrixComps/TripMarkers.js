import React, {useState} from 'react'
import {
    Marker
  } from "@react-google-maps/api";
  
import DistanceInformation from './DistanceInformation'

const TripMarkers = ({tripMarkers, tripMarkersShow}) => {
    const [tripSelected, setTripSelected] = useState(null) //Keeps track of what trip marker is currently selected
    const [tripSelectedDest, setTripSelectedDest] = useState(false)

    // const [tripSelectedOrig, setTripSelectedOrig] = useState(null) //Keeps track of what trip marker Origin is currently selected
    // const [tripSelectedDest, setTripSelectedDest] = useState(null) //Keeps track of what trip marker Destination is currently selected


    return (
    <>
{/* Origin Marker */}
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
