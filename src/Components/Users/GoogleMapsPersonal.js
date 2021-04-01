import 
    React, {
    useState, 
    useRef, 
    useCallback,
    useEffect,
}from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import '@reach/combobox/styles.css'
import '../../App.css';
import mapStyles from '../../mapStyles'

import { useHistory } from 'react-router-dom'
import { Button} from '@material-ui/core';
import {Alert} from '@material-ui/lab'

import Information from './Information'
import Search from '../Search'
import Locate from '../Locate';
import SaveButton from './SaveButton';

import {useAuth} from '../contexts/AuthContext'
import {db} from '../../firebase'

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

const GoogleMapsPersonal = () => {
    //Avoid rerenders
    const [libraries] = useState(["places"]);

//Hooks
    const { isLoaded, loadError } = useLoadScript({
      //Get API key from the env.local file
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      //Loading additional libraries when loading google scripts, "in this case libraries"
      libraries,
    });

    const [markers, setMarkers] = useState([])
    //Gets the information of the currently selected marker
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const mapRef = useRef()
    const history = useHistory()
    const {currentUser, logout} = useAuth();
    const markersDocs = db.collection('users').doc(currentUser.uid).collection('markers')

//Functions
    //Use useCallback for functions you only want to run in certain situations
    //Creates markers and sets them on map click
    const onMapClick = useCallback((event) => {
          setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date().toString(),
            key: `${event.latLng.lat()}-${event.latLng.lng()}` //key is Doc ID
          }])
    }, [])

    //Loads up map
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
      }, []);

    //When searching a location, zoom into the location on map
    const panTo = React.useCallback(({lat, lng}) => {
      mapRef.current.panTo({lat, lng});
      mapRef.current.setZoom(10);
    }, [])


////////////////////////// Data Modification //////////////////////////////////
    //Delete selected marker and firestore data, props is key value/ID on firestore
    const deleteMarker = async (props) => {
        deleteMarkerData(props)
        const newMarkerList = markers.filter((deleteFromMarkers) => {
            if(selected !== deleteFromMarkers) {
              return deleteFromMarkers
            } 
          })
        await setMarkers(newMarkerList);
        await setSelected(null);
      }

    const deleteMarkerData = (markerKey) => {
      const fbMarkerID = markersDocs.doc(markerKey)

        fbMarkerID.delete().then(() => {
          console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      }); 
    }

      
    //Get data from firestore to show on map on page load
    useEffect(() => {
      markersDocs.get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            key: doc.id,
          }))
          setMarkers(data)
              })
        .catch(() => {
          console.log("Failed to get data")
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    //Logout and go back to homepage
    const handleLogout = async() => {
        setError('')
        try{
            await logout()
            history.push('/')
        } catch{
            setError("Failed to log out")
        }
    }

    //If there is a load error, DOM will show this message
    if(loadError) return(<div className="App">Error loading maps</div>)
    //When map is loading, will show this message
    if(!isLoaded) return(<div className="App">Loading Maps</div> );

    return (
    <div className="App">
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <h1>
        Welcome back, 
        <br/>{currentUser.email}!
            <span role="img" aria-label="sleep">
            😎
            </span>
        </h1>

        <Search panTo = {panTo}/>
        <Locate panTo = {panTo} setMarkers={setMarkers} setSelected={setSelected} />

        <div className="buttons">
            <Button variant="contained" color="secondary" onClick={handleLogout}>Log Out</Button>
        </div>

        <SaveButton 
        markers={markers} 
        setSuccess={setSuccess}
        setError={setError}
        currentUser={currentUser}/>

        <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={10} 
            center={center}
            options={options}
            onClick={onMapClick}
            onLoad = {onMapLoad}
            >
            {/* Render markers onto map in GoogleMap component with a Marker component. Need to add a key as we are iterating through."newMarker" is the new version of "markers*/}
            {markers.map((newMarker) => (
                  <Marker 
                  key={`${newMarker.lat}-${newMarker.lng}`} 
                  position={{lat: parseFloat(newMarker.lat), lng: parseFloat(newMarker.lng)}} 
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
                // Makes marker show when clicking on the map
            ))}

            {selected ?
                    <Information 
                    selected={selected} 
                    setSelected={setSelected} 
                    deleteMarker={deleteMarker} 
                    currentUser={currentUser}/>                     
                : null}  
                
            </GoogleMap>

    </div>

    )
}

export default GoogleMapsPersonal