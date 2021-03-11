import 
  React, 
  {useState, 
  useCallback, 
  useRef} from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

import '@reach/combobox/styles.css'
import { formatRelative } from "date-fns";

import './App.css';
import mapStyles from './mapStyles'

import Search from './Components/Search'
import Locate from './Components/Locate';

  //Avoid rerenders
  const libraries = ["places"];
  //Must be set with 100 vw/vh to make it fit page
  const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
  };
  const center = {
    lat: 41.076206,
    lng: -73.858749,
  }

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
  }

  
const App = () => {
    const { isLoaded, loadError } = useLoadScript({
      //Get API key from the env.local file
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      //Loading additional libraries when loading google scripts, "in this case libraries"
      libraries,
    });
    const [markers, setMarkers] = useState([]);
    //Gets the information of the currently selected marker
    const[selected, setSelected] = useState(null);

    //Use useCallback for functions you only want to run in certain situations
    const onMapClick = useCallback((event) => {
          setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
          }])
    }, [])

    const mapRef = useRef()
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
      }, []);

    const panTo = React.useCallback(({lat, lng}) => {
      mapRef.current.panTo({lat, lng});
      mapRef.current.setZoom(14);
    }, [])


    //If there is a load error, DOM will show this message
    if(loadError) return(<div className="App">Error loading maps</div>)
    //When map is loading, will show this message
    if(!isLoaded) return(<div className="App">Loading Maps</div> );

    return (
      <div className="App">
        <h1>
          Car Camping 
            <span role="img" aria-label="sleep">
            🚗
            </span>
          </h1>

        <Search panTo = {panTo}/>
        <Locate panTo = {panTo} />

        <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={10} 
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad = {onMapLoad}
        >
          {/* Render markers onto map in GoogleMap component with a Marker component. Need to add a key as we are iterating through."marker" is the new version of "markers*/}
          {markers.map((newMarker) =>  (
            <Marker 
            key={newMarker.time.toISOString()} 
            position={{lat: newMarker.lat, lng: newMarker.lng}} 
            //Change Icon
            icon = {{
              url: "/sleeping.svg",
              scaledSize: new window.google.maps.Size(30,30),
              origin: new window.google.maps.Point(0,0),
              anchor: new window.google.maps.Point(15,15),
              }}
            onClick={() => {
              setSelected(newMarker);
              }}
            />
            // Makes marker show when clicking on the map
          ))}

          {selected ? (
          <InfoWindow 
          position={{lat: selected.lat, lng: selected.lng}} 
          onCloseClick = {() => {
            setSelected(null);
          }}>
            <div>
              <h2>Slept Here</h2>
              <p>Time: {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>) : null}

        </GoogleMap>
      </div>
    );
  }


export default App;
