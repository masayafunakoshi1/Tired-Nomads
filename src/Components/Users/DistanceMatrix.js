import React, {useState, useEffect} from 'react'

// import {
//     DistanceMatrixService
//   } from "@react-google-maps/api";

  import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { makeStyles } from '@material-ui/core/styles';
import {Button,
        TextField,
        Paper,
        FormControl,
        InputLabel,
        Select} from '@material-ui/core'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
 } from "@reach/combobox";
 import {db} from '../../firebase'
 import '../../App.css'

 
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// UNDER DEVELOPMENT ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Currently only showing trip markers and trip names ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// When I figure out DistanceMatrixService a bit more then can add distance and duration of trips ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Material UI styles
const useStyles = makeStyles(() => ({
    distanceMarkBtn: {
        display: 'flex',
    },
    paperStyle: {
        display: 'flex',
        justifyContent:'center',
        width: '270px',
        height: '340px',
    },
    formItems: {
        marginTop: '15px',
    },
    dropDown: {
        width: '130px'
    },
    tripName: {
        height: '20px',
        width: '150px',
        margin: '0px 0px 20px 0px'
    }
}));


//////////////////////// How the data moves within this component /////////////////////
/* 
1. insert origin and destination info in textfields on app
2. setOriginObj() setDestinationObj() is the value storage of textfields
3. SubmitHandler(
    TripName
    Origin
    Destination
    TravelMode
) 
all go into setDistanceMatrix onSubmit() of form

4.setDistanceMatrix
on setDistanceMatrix change => useEffect() => createFirebase() => sends to firestore && resets state hooks/textfields to empty strings
5. get data from firestore onPageLoad && when a new "Trip" is created (on distanceMatrix state change)
push data into tripMarkers
6. 3 functions (originCoords(), destinationsCoords(), travelModeHandler()) picks out firestore data from tripMarkers into data that can be used by <DistanceMatrixService />

DistanceMatrixService data looks like 
e.g.
2 origins
2 destinations

Origin Addresses:{}
Destination Addresses:{}
Rows: [
        {1: [
            { destination 1
                distance,
                duration
            },
            { destination 2
                distance,
                duration
            }
        ]}
        {2: [
            { destination 1
                distance,
                duration
            },
            { destination 2
                distance,
                duration
            }
        ]}
    ]

7. store DistanceMatrixService coordinates and distance data into 

*/

const DistanceMatrix = (
    {currentUser, 
    tripMarkers,
    setTripMarkerDetails,
    setTripMarkersShow,
    setSuccess,
    setError, 
}) => {
    const classes = useStyles();
    const [createTrip, setCreateTrip] = useState(false)
    const [tripNameCond, setTripNameCond] = useState(false)
    //Distance Matrix API (marking origins and destinations, calculating distance)
    //Save origins and destinations data temporarily in this hook, until it is sent to 
    const [distanceMatrix, setDistanceMatrix] = useState({
        tripName: "",
        origin: {lat: 0, lng:0},
        destination: {lat: 0, lng: 0},
        travelMode: 'DRIVING'
      });
    const [valueTripName, setValueTripName] = useState('')
    const [valueOrigin, setValueOrigin] = useState('')
    const [originObj, setOriginObj] = useState({
        address: '',
        lat: 0,
        lng: 0,
    })
    const [valueDestination, setValueDestination] = useState('')
    const [destinationObj, setDestinationObj] = useState({
        address: '',
        lat: 0,
        lng: 0,
    })
    const [travelMethod, setTravelMethod] = useState('')

    const [tripOrigCoords, setTripOrigCoords] = useState([]) //Trip origin coords
    const [tripDestCoords, setTripDestCoords] = useState([]) //Trip dest. coords
    const [tripMarkerTravelMode, setTripMarkerTravelMode] = useState([]) //Travel Mode

    /////////////////////////////////////// FOR DISTANCE MATRIX SERVICE /////////////////////////////////////////////
    //  //Allow for proper data format to work with DistanceMatrixService
    // const [getDMS, setGetDMS] = useState(true) //To stop callback from running endlessly

    // const detailsArr = [] 
    //TEMPORARY hold of data from Distance Matrix API callback response
    //Only OK because callback has conditions which prevent it from being called repetitively for no reason
    //!!!!!!!!Would like a better solution as this could take up alot of memory!!!!!!//

    //Put firestore database collection into a const
    const userTripMarkers = db.collection('users').doc(currentUser ? currentUser.uid : null).collection('tripMarkers')

    ////////////////////UsePlacesAutocomplete API/////////////////////////
    const {
        ready,
        setValue,
        suggestions: {status, data}, 
        clearSuggestions
    } = usePlacesAutocomplete({ //Autocompletes suggestions of locations and has many available hooks
        requestOptions: {
            location: {    
            lat: () => 41.076206, //want to receive function that it can call
            lng: () => -73.858749,
            },
            radius: 200 * 1000, //need radius of search in meters (120 mi)
        },
    });


////////////////////////////////////// FUNCTIONS ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// UNDER CONSTRUCTION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const distanceCallback = (props, status) => {
    //     if(status === "OK" && getDMS){
    //         console.log(props)
    //         setTripMarkerDetails(props.rows[0].elements[0])

    //         // detailsArr.push(props.rows[0].elements[0])
    //         // //Should take care of any duplicates in array
    //         // setTripMarkerDetails([...new Set(detailsArr)])

    //         setGetDMS(false)
    //     } else {
    //         console.log("Error: " + status)
    //     }
    // }

    const originCoords = () => {
        if(tripMarkers){
            for(let i = 0; i < tripMarkers.length; i++){
                setTripOrigCoords([...tripOrigCoords, tripMarkers[i].origin])
            }
        }
    }

    const destinationCoords = () => {
        if(tripMarkers){
            for(let i = 0; i < tripMarkers.length; i++){
                setTripDestCoords([...tripDestCoords, tripMarkers[i].destination])
            }
        }
    }

    const travelModeHandler = () => {
        if(tripMarkers){
            for(let i = 0; i < tripMarkers.length; i++){
                setTripMarkerTravelMode([...tripMarkerTravelMode, tripMarkers[i].travelMode])
            }
        }
    }

    //////////////////////////////Open create trip popout//////////////////////////////////
    const createTripBtn = () => {
        if(createTrip){
            setCreateTrip(false)
        }
        if(!createTrip){
            setCreateTrip(true)
        }
    }

    //////////////////////////// Succes or Error alerts //////////////////////////////

    const openSuccessAlert = () => {
        setSuccess("Trip created successfully")
        setTimeout(() => {
            setSuccess("")
        }, 1500)
    }

    const openFailureAlert = () => {
        setError("Failed to create trip")
        setTimeout(() => {
            setError("")
        }, 1500)

    }

    //Constraints that valueTripName must follow, else doesn't work with firebase
    const tripNameChanger = (e) => {
        if(e.target.value.includes(" ") || e.target.value.indexOf(' ') > 0){
            let string = e.target.value.replace(/\s+/g, '-')
            setValueTripName(string)
        }
        else{
        setValueTripName(e.target.value)
        }
        tripNameConstraints(e)
    }

    const tripNameConstraints = (e) => {
        if(e.target.value.includes("/")|| e.target.value.includes('.') || e.target.value.includes('..') || e.target.value.includes(`${RegExp('__.*__')}`)){
            setTripNameCond(true)
        } else {
            setTripNameCond(false)
        }
    }


    ///////////////////////////////Firestore set(), get() and Delete Trip//////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    //Submit distance matrix to firestore, creating new doc if doc doesn't exist

    const submitHandler = (e) => {
        e.preventDefault()
        setDistanceMatrix(prevState => {
           return{ ...prevState,
            tripName: valueTripName,
            origin: {
                address: originObj.address,
                lat: originObj.lat,
                lng: originObj.lng
            },
            destination: {
                address: destinationObj.address,
                lat: destinationObj.lat,
                lng: destinationObj.lng
            },
            travelMode: travelMethod
            }})
    }

    useEffect(() => {
    if(distanceMatrix.tripName){
        createTripFirebase()
    }
    }, [distanceMatrix])

    const createTripFirebase = () => {
        if(userTripMarkers){
            userTripMarkers.doc(`${distanceMatrix.tripName}`).set({
                distanceMatrix
            }).then(() => {
                console.log("Distance Markers set")
                setValueTripName('')
                setValueOrigin('')
                setValueDestination('')
                setTravelMethod('')
            }).then(() => {
                getDataFromFB()
                setTripMarkersShow(false)
                setTimeout(() => {
                    setTripMarkersShow(true)
                }, 100)
                openSuccessAlert()
            }).catch((err) => {
                console.log(err)
                openFailureAlert()
            })
        } else {
            console.log("No account storage located")
        }
    }


   ////////// GET trips from firestore and insert them into state hook ////////////
   //On pageload, push data into tripMarkers state hook. Then 

    const getDataFromFB = () => {
      if(userTripMarkers){
         (async() => {
            const snapshot = await userTripMarkers.get()
            const data = snapshot.docs.map(doc => doc.data());
            for(let i = 0; i < data.length; i++){
                tripMarkers.push(data[i].distanceMatrix)
            }
            console.log("got data from firebase")
            })()
        }else {
            console.log("No account data located")
        }
    }

    useEffect(() => {
        getDataFromFB()
    }, [])


    useEffect(() => {
        setTimeout(() => {
            originCoords()
            destinationCoords()
            travelModeHandler()
            setTripMarkersShow(true)
        }, 1000);
    }, [])



/////////////////////////////////////////// JSX /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
    return (
    <div className="distanceMatrix">
        <Button 
        className={classes.distanceMarkBtn}
        variant="contained" 
        color="primary" 
        onClick={createTripBtn}>
            Create Trip
        </Button>

            <div className={classes.paperContainer}>
            {  createTrip &&
            <Paper 
            elevation={4} 
            variant="elevation"
            className={classes.paperStyle}>
            {/* Search for origin and destination coords */}
            <form onSubmit={e => submitHandler(e)}>
                <div className="title">Create Trip Markers</div>
                <div>
                    <TextField 
                    className={classes.tripName} 
                    label="Trip Name"
                    value={valueTripName}
                    error={tripNameCond}
                    onChange={(e) => tripNameChanger(e)
                    //Setting trip name with conditional func to make sure name works with firebase 
                    }  
                    />
                </div>

                <div className="search-distance">
                    <Combobox 
                        onSelect={ 
                            //Tried to make reusable, but sets values to different states
                            async(address) => {      
                            setValueOrigin(address, false); //Comes from usePlacesAutocomplete hook
                            clearSuggestions()
                            try {
                                const results = await getGeocode({address}); //selects suggestion and shows information on it
                                const {lat, lng} = await getLatLng(results[0]) //gets lat/lng of location
                                setOriginObj(prevState => ({...prevState,
                                                address: address,
                                                lat: lat,
                                                lng: lng})
                                                )
                            } catch(error){
                                console.log("error!")
                            }
                        }}
                        >
                            <ComboboxInput  //Input Search bar
                            value={valueOrigin} 
                            onChange={(e) => {
                            setValue(e.target.value)
                            setValueOrigin(e.target.value)
                            }}
                            disabled={!ready}
                            placeholder="Start/Origin"/>

                            <ComboboxPopover 
                            className="search-distance-popover"
                            //Popover of suggestions
                            > 
                                <ComboboxList>
                                    {
                                    status === "OK" && data.map(({id, description}) => (
                                        <ComboboxOption key={id} value={description} 
                                        //Gives suggestion options 
                                        />
                                    ))}
                                    </ComboboxList>
                            </ComboboxPopover>
                        </Combobox>
                    </div>

                    <div className="search-distance">
                        <Combobox 
                            onSelect={async(address) => {      
                                setValueDestination(address, false); //Comes from usePlacesAutocomplete hook
                                clearSuggestions()
                                try {
                                    const results = await getGeocode({address}); //selects suggestion and shows information on it
                                    const {lat, lng} = await getLatLng(results[0]) //gets lat/lng of location
                                    setDestinationObj(prevState => ({...prevState,
                                                    address: address,
                                                    lat: lat,
                                                    lng: lng})
                                                    )
                                } catch(error){
                                    console.log("error!")
                                }
                        }}
                            >
                                <ComboboxInput  //Input Search bar
                                value={valueDestination} 
                                onChange={(e) => {
                                setValue(e.target.value)
                                setValueDestination(e.target.value)
                                }}
                                disabled={!ready}
                                placeholder="End/Destination"/>

                                <ComboboxPopover 
                                className="search-distance-popover"
                                //Popover of suggestions
                                > 
                                    <ComboboxList>
                                        {
                                        status === "OK" && data.map(({id, description}) => (
                                            <ComboboxOption key={id} value={description} 
                                            //Gives suggestion options 
                                            />
                                        ))}
                                        </ComboboxList>
                                </ComboboxPopover>
                            </Combobox>
                        </div>

                    {/* Dropdown with travel methods */}
                        <div className={classes.formItems}>
                            <FormControl  className={classes.dropDown}>
                                <InputLabel>Travel Method</InputLabel>
                                <Select 
                                    native
                                    value={travelMethod}
                                    onChange={e => setTravelMethod(e.target.value)}
                                >
                                    <option value={''}></option>
                                    <option value={'DRIVING'}>Driving</option>
                                    <option value={'BICYCLING'}>Bicycling</option>
                                    <option value={'WALKING'}>Walking</option>
                                    <option value={'TRANSIT'}>Transit</option>
                                </Select>
                            </FormControl>
                        </div>
                        
                        <div className={classes.formItems}>
                            <Button 
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={ !valueOrigin || !valueDestination || !travelMethod || tripNameCond || valueTripName === ""}
                            >
                                Set Markers
                            </Button>
                        </div>
                </form>
            </Paper>
            }
        </div>


{/* 
    /////////////////////////////////// Gets distance information from Google Distance API using react-google-maps component //////////////////////////////
        <DistanceMatrixService
        //Get firestore data and insert in options
            options={{
                //Array of data
                origins: tripOrigCoords, 
                destinations: tripDestCoords,
                travelMode: "DRIVING",
            }}
            callback={getDMS ? (...res) => distanceCallback(...res) : ""}
        />

            
*/}

    </div>

    )
}



export default DistanceMatrix
