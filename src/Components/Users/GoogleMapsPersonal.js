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
// import '@reach/combobox/styles.css'
import '../../App.css';
import {regular, nightMode} from '../../mapStyles'

import {Alert} from '@material-ui/lab'

import Information from './Information'
import Search from '../Search'
import LocateReset from '../LocateReset';
import SaveButton from './SaveButton';
import Logout from '../Logout'
import NightMode from '../NightMode'
import DistanceMatrix from './DistanceMatrix'

import {useAuth} from '../contexts/AuthContext'
import {db} from '../../firebase'

  //Must be set with 100 vw/vh to make it fit page
  const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
  };

////////////////// Attempting to change starting location to user's location if location checker is allowed/////////////////////////////

  // const successLocation = (position) => {
  //   return({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     })
  // }

  // const errorLocation = (err) => {
  //   console.log(err)
  //   return ({
  //     lat: 41.076206,
  //     lng: -73.858749,
  //   })
  // }    

  // const yourLocation = navigator.geolocation.getCurrentPosition(successLocation, errorLocation)
    
  // const center = yourLocation

  const center = {
    lat: 39.099724,
    lng: -94.578331,
  }


const GoogleMapsPersonal = () => {
    const [libraries] = useState(["places"]);

////////////////////////////////////////Hooks///////////////////////////////////
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
    // Checks if there were changes to determine if the save btn should be available or not
    const [changes, setChanges] = useState(false)
    //Gets anchor element for popover to show
    const [anchorEl, setAnchorEl] = useState(null);
    const [nightModeHandler, setNightModeHandler] = useState(false)

    const mapRef = useRef()
    const {currentUser} = useAuth();
    const markersDocs = db.collection('users').doc(currentUser.uid).collection('markers')

    //Originally outside scope of functional component to prevent rerenders, but couldn't pass nightMode styled map with a conditional, so now inside functional component
    //If nightModeHandler is toggled, map style becomes nightMode
    const options = {
      styles: !nightModeHandler ? regular : nightMode,
      disableDefaultUI: true,
      zoomControl: true
    }     

///////////////////////////////////////Functions///////////////////////////////////////

//Use useCallback for functions you only want to run in certain situations or for functions with complex props from components 
    //Creates markers and sets them on map click
    const onMapClick = useCallback((event) => {
          setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date().toString(),
            key: `${event.latLng.lat()}-${event.latLng.lng()}` //key is Doc ID
          }])
          setChanges(true);
    }, [])

    //Loads up map
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
      }, []);

    //When searching a location, zoom into the location on map
    const panTo = useCallback(({lat, lng}) => {
      mapRef.current.panTo({lat, lng});
      mapRef.current.setZoom(14);
    }, [])



              ///////////////// Data Modification ////////////////////////
    //Delete selected marker and firestore data, props is key value/ID on firestore
    const deleteMarker = async (props) => {
        deleteMarkerData(props)
        await deleteRatingData(props)
        await deleteReviewData(props)
        const newMarkerList = markers.filter((deleteFromMarkers) => {
            if(selected !== deleteFromMarkers) {
              return deleteFromMarkers
            } 
          })
        await setMarkers(newMarkerList);
        await setSelected(null);
        setChanges(true)
      }

    const deleteMarkerData = (markerKey) => {
      const fbMarkerID = markersDocs.doc(markerKey)

        fbMarkerID.delete().then(() => {
          console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      }); 
    }

    const deleteRatingData = (markerKey) => {
      const fbRatingID = db.collection('users').doc(currentUser.uid).collection('ratings').doc(markerKey)

        fbRatingID.delete().then(() => {
          console.log("Rating successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      }); 
    }

    const deleteReviewData = (markerKey) => {
      const fbReviewID = db.collection('users').doc(currentUser.uid).collection('reviews').doc(markerKey)

        fbReviewID.delete().then(() => {
          console.log("Review successfully deleted!");
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
    }, [])


    /////////////////////////////////////////JSX///////////////////////////////////
    //If there is a load error, DOM will show this message
    if(loadError) return(<div className="App">Error loading maps</div>)
    //When map is loading, will show this message
    if(!isLoaded) return(<div className="App">Loading Maps</div> );

    return (
    <div className="App">
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <h1 className={nightModeHandler ? 'nightModeFont' : ''}>
          Welcome back, 
          <br/>{currentUser.email}!
              <span role="img" aria-label="sleep">
              😎
              </span>
        </h1>

        <Search panTo = {panTo}/>

        <LocateReset 
        panTo = {panTo} 
        setMarkers={setMarkers} 
        setSelected={setSelected} 
        setChanges={setChanges}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        />

        <Logout setError={setError} changes={changes}/>

        <SaveButton 
        markers={markers} 
        setSuccess={setSuccess}
        setError={setError}
        currentUser={currentUser}
        setChanges={setChanges}
        changes={changes}
        nightModeHandler={nightModeHandler}
        />

        <NightMode 
        nightModeHandler = {nightModeHandler}
        setNightModeHandler = {setNightModeHandler}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        />

        <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={4.9} 
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
                    currentUser={currentUser}
                    />                     
                : null}  

            <DistanceMatrix currentUser={currentUser} />
                
            </GoogleMap>
    </div>

    )
}

export default GoogleMapsPersonal