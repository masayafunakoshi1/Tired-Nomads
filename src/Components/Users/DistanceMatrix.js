import React, {useState, useCallback} from 'react'
import {
    Marker,
    DistanceMatrixService
  } from "@react-google-maps/api";

  import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { makeStyles } from '@material-ui/core/styles';
import {Button,
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
 import '../../App.css'



//Material UI styles
const useStyles = makeStyles(() => ({
    distanceMarkBtn: {
        display: 'flex',
    },
    paperStyle: {
        display: 'flex',
        justifyContent:'center',
        width: '270px',
        height: '250px',
    },
    formItems: {
        marginTop: '15px',
    },
    dropDown: {
        width: '130px'
    }
}));

const DistanceMatrix = () => {
    const classes = useStyles();
    const [createTrip, setCreateTrip] = useState(false)
    //Distance Matrix API (marking origins and destinations, calculating distance)
    //Save origins and destinations data temporarily in this hook, until it is sent to 
    const [distanceMatrix, setDistanceMatrix] = useState({
        origin: {lat: 0, lng:0},
        destination: {lat: 0, lng: 0},
        travelMode: 'DRIVING'
      });
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

    //////////////////////////////////////Next Step////////////////////////////////////////////
    /////////////////////////////////////////create markers//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Distance Matrix Service callback function
    //Create markers with this callback
    const distanceCallback = useCallback(() => {
      });

    //Open create trip popout
    const createTripBtn = () => {
        if(createTrip){
            setCreateTrip(false)
        }
        if(!createTrip){
            setCreateTrip(true)
        }
    }

    //may potentially have a problem with delay, we have to see when putting it on firestore

    const submitHandler = (e) => {
        e.preventDefault()
        setDistanceMatrix(prevState => ({
            ...prevState,
            origin: {
                lat: originObj.lat,
                lng: originObj.lng
            },
            destination: {
                lat: destinationObj.lat,
                lng: destinationObj.lng
            },
            travelMode: travelMethod
        }))
    }

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
    {  createTrip ? 
    <Paper 
    elevation={4} 
    variant="elevation"
    className={classes.paperStyle}>

        <form onSubmit={e => submitHandler(e)}>

            <div className="search-distance">
                <Combobox 
                    onSelect={async (address) => {
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
                                status === "OK" && data.map(({index, description}) => (
                                    <ComboboxOption key={index} value={description} 
                                    //Gives suggestion options 
                                    />
                                ))}
                                </ComboboxList>
                        </ComboboxPopover>
                    </Combobox>
                </div>

                <div className="search-distance">
                    <Combobox 
                        onSelect={async (address) => {
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
                                    status === "OK" && data.map(({index, description}) => (
                                        <ComboboxOption key={index} value={description} 
                                        //Gives suggestion options 
                                        />
                                    ))}
                                    </ComboboxList>
                            </ComboboxPopover>
                        </Combobox>
                    </div>

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
                        >
                            Set Markers
                        </Button>
                    </div>
                </form>
            </Paper>

            :

            ""
            
            }

        </div>

        <DistanceMatrixService
        //Get firestore data and insert in options
            options={{
              origins: [distanceMatrix.origin],
              destinations: [distanceMatrix.destination],
              travelMode: distanceMatrix.travelMode,
            }}
            callback={distanceCallback}
          />

            {/* Create form to submit origin and destinations for different trips you take... use markers and figure out a way to match markers to their intended destinations. 
            
            Create emoji table to use emojis as markers... research how that can be done.
            */}
        </div>
    )
}

export default DistanceMatrix
