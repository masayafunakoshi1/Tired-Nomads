import 
    React, 
    {
    useState, 
    useRef, 
    useCallback,
}from 'react';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  // DistanceMatrixService
} from "@react-google-maps/api";
// import '@reach/combobox/styles.css'

import '../App.css';
import {regular, nightMode} from '../mapStyles'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

import Information from './Users/Information'
import Search from './Search'
import LocateReset from './LocateReset';
import DialogPopup from './DialogPopup';
import NightMode from './NightMode'


  //Avoid rerenders
  const libraries = ["places"];
  //Must be set with 100 vw/vh to make it fit page
  const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
  };
  const center = {
    lat: 39.099724,
    lng: -94.578331,
  }

const GoogleMapContainer = ({popup, setPopup}) => {
///////////////////////////////////////Hooks///////////////////////////////////////////
    const { isLoaded, loadError } = useLoadScript({
      //Get API key from the env.local file
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      //Loading additional libraries when loading google scripts, "in this case libraries"
      libraries,
    });
    const [markers, setMarkers] = useState([]);
        //Gets the information of the currently selected marker
    const [selected, setSelected] = useState(null);
    //Gets anchor element for popover to show    
    const [anchorEl, setAnchorEl] = useState(null);
    const [nightModeHandler, setNightModeHandler] = useState(false)
    const mapRef = useRef()

    //Originally outside scope of functional component to prevent rerenders, but couldn't pass nightMode styled map with a conditional, so now inside functional component
    //If nightModeHandler is toggled, map style becomes nightMode
    const options = {
      styles: !nightModeHandler ? regular : nightMode,
      disableDefaultUI: true,
      zoomControl: true
   }

/////////////////////////////////////Functions////////////////////////////////////////
    //Use useCallback for functions you only want to run in certain situations
    const onMapClick = useCallback((event) => {
          setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
          }])
    }, [])

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
      }, []);


    //When searching a location, zoom into the location on map
    const panTo = React.useCallback(({lat, lng}) => {
      mapRef.current.panTo({lat, lng});
      mapRef.current.setZoom(14);
    }, [])

    //Delete selected marker
    const deleteMarker = () => {
      const newMarkerList = markers.filter((deleteFromMarkers) => {
        if(selected !== deleteFromMarkers) {
          return deleteFromMarkers
        } 
      })
      setMarkers(newMarkerList);
      setSelected(null);
    }

        //If there is a load error, DOM will show this message
    if(loadError) return(<div className="App">Error loading maps</div>)
    //When map is loading, will show this message
    if(!isLoaded) return(<div className="App">Loading Maps</div> );

    return (
    <div className="App">
        <h1 className={nightModeHandler ? "nightModeFont" : ""}>
          Tired Nomads
            <span role="img" aria-label="sleep">
            🚗🚙🚚💤
            </span>
        </h1>

        <Search panTo = {panTo}/>
        <LocateReset 
        panTo = {panTo} 
        setMarkers={setMarkers} 
        setSelected={setSelected} 
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        />
        <NightMode 
        nightModeHandler = {nightModeHandler}
        setNightModeHandler = {setNightModeHandler}
        />

        {/* Login & Signup buttons */}
          <div className="buttons-landing" id="loginBtn">
            <Button variant="contained" component={Link} to="/login" >Log In</Button>
          </div>
          <div className="buttons-landing" id="signupBtn">
            <Button variant="contained" color="primary" component={Link} to="/signup" >Sign Up</Button>
          </div>

         <DialogPopup/>

        <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={4.9} 
            center={center}
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
            >
            {/* Render markers onto map in GoogleMap component with a Marker component. Need to add a key as we are iterating through."newMarker" is the new version of "markers*/}
            {markers.map((newMarker) =>  (
                <span>
                  <Marker 
                  key={`${newMarker.lat}-${newMarker.lng}`} 
                  position={{lat: newMarker.lat, lng: newMarker.lng}} 
                  //Change Icon, icon styles
                  icon = {{
                      url: "/sleeping.svg",
                      scaledSize: new window.google.maps.Size(30,30),
                      origin: new window.google.maps.Point(0,0),
                      anchor: new window.google.maps.Point(15,15),
                      }}
                  animation={2}
                  onClick={() => {
                      setSelected(newMarker);
                      }}
                  />
                </span>
                // Makes marker show when clicking on the map
            ))}

            {selected ? <Information selected={selected} setSelected={setSelected} deleteMarker={deleteMarker}/> : null}  

            </GoogleMap>

    </div>

    )
}

export default GoogleMapContainer
