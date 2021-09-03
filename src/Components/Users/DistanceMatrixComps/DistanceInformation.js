import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import "../../../App.css";
import { Button, ClickAwayListener } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const DistanceInformation = (props) => {
  // Handle Click Away from Component
  const handleClickAway = () => {
    props.setTripSelected(null);
    props.setTripSelectedDest(false);
  };

  return (
    <InfoWindow
      position={
        props.tripSelectedDest
          ? {
              lat: parseFloat(props.tripSelected.destination.lat),
              lng: parseFloat(props.tripSelected.destination.lng),
            }
          : {
              lat: parseFloat(props.tripSelected.origin.lat),
              lng: parseFloat(props.tripSelected.origin.lng),
            }
      }
      //Position determined based on if tripSelectedDest is true (selected trip marker is the destination or not)

      onCloseClick={() => {
        props.setTripSelected(null);
        props.setTripSelectedDest(false);
      }}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <h2>{props.tripSelected.tripName}</h2>
          <h4>{props.tripSelectedDest ? "Destination:" : "Origin:"}</h4>
          <div>
            {props.tripSelectedDest
              ? props.tripSelected.destination.address
              : props.tripSelected.origin.address}
          </div>

          <div className="distanceInfoDelBtn">
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
  );
};

export default DistanceInformation;
