import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";
import DistanceInformation from "./DistanceInformation";
import { db } from "../../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const TripMarkers = ({
  tripMarkers,
  setTripMarkers,
  tripMarkersShow,
  setTripMarkersShow,
  tripMarkerDetails,
}) => {
  const [tripSelected, setTripSelected] = useState(null); //Keeps track of what trip marker is currently selected
  const [tripSelectedDest, setTripSelectedDest] = useState(false);
  const { currentUser } = useAuth();
  const userTripMarkers = db
    .collection("users")
    .doc(currentUser ? currentUser.uid : "")
    .collection("tripMarkers");

  //Functions delete trip markers and trip data
  const deleteTrip = (props) => {
    deleteTripData(props);
    const newTripList = tripMarkers.filter((deleteFromTrips) => {
      if (tripSelected !== deleteFromTrips) {
        return deleteFromTrips;
      } else return console.log("No trip deleted");
    });
    setTripMarkers(newTripList);
    setTripSelected(null);
    setTripMarkersShow(false);
    setTimeout(() => {
      setTripMarkersShow(true);
    }, 100);
  };

  const deleteTripData = (tripName) => {
    userTripMarkers
      .doc(tripName)
      .delete()
      .then(() => {
        console.log("Trip Successfully Deleted");
      })
      .catch((error) => {
        console.log("Error removing Trip: ", error);
      });
  };

  return (
    <>
      {/* Origin Marker */}
      {tripMarkersShow &&
        tripMarkers.map((newMarker) => (
          <Marker
            key={`${newMarker.tripName}`}
            position={{
              lat: parseFloat(newMarker.origin.lat),
              lng: parseFloat(newMarker.origin.lng),
            }}
            icon={{
              url: "/greenMarker.svg",
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setTripSelected(newMarker);
            }}
          />
        ))}

      {/* Destination Marker */}
      {tripMarkersShow &&
        tripMarkers.map((newMarker) => (
          <Marker
            key={`${newMarker.tripName}`}
            position={{
              lat: parseFloat(newMarker.destination.lat),
              lng: parseFloat(newMarker.destination.lng),
            }}
            icon={{
              url: "/redMarker.svg",
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setTripSelected(newMarker);
              setTripSelectedDest(true);
            }}
          />
        ))}

      {tripSelected ? (
        <DistanceInformation
          deleteTrip={deleteTrip} //Function
          tripMarkerDetails={tripMarkerDetails}
          tripSelected={tripSelected}
          tripSelectedDest={tripSelectedDest}
          setTripSelectedDest={setTripSelectedDest}
          setTripSelected={setTripSelected}
        />
      ) : null}
    </>
  );
};

export default TripMarkers;
