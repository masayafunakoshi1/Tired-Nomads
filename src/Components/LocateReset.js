import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import React from "react";
import "../App.css";
import PopoverComp from "./PopoverComp";

export const LocateReset = ({
  panTo,
  setMarkers,
  setSelected,
  setChanges,
  anchorEl,
  setAnchorEl,
}) => {
  return (
    <>
      {/*FIND YOUR LOCATION BUTTON */}
      <button
        onMouseEnter={(e) => setAnchorEl(e.target)}
        onMouseLeave={() => setAnchorEl(null)}
        className="locate"
        onClick={() => {
          //On click will locate position of user if location is allowed in browser
          navigator.geolocation.getCurrentPosition(
            (position) => {
              //panTo user's location
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null,
          );
        }}
      >
        <img src="compass.svg" alt="compass - locate me" />
      </button>

      {/*MARKER RESET BUTTON */}
      <button
        onMouseEnter={(e) => setAnchorEl(e.target)}
        onMouseLeave={() => setAnchorEl(null)}
        className="reset"
        onClick={() => {
          setMarkers([]);
          setSelected(null);
          if (setChanges) {
            setChanges(true);
          }
        }}
      >
        <DeleteSweepIcon color="secondary" fontSize="large" cursor="pointer" />
      </button>

      <PopoverComp anchorEl={anchorEl} />
    </>
  );
};

export default LocateReset;
