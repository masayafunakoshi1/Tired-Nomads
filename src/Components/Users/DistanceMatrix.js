import React, {useState, useCallback, useEffect} from 'react'
import {
    Marker,
    DistanceMatrixService
  } from "@react-google-maps/api";

  import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField,
        Grid,
        Button,
        Paper,
        FormControl,
        InputLabel,
        Select} from '@material-ui/core'


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
        origins: {lat: 41.048395464035885, lng:-73.86802677461547},
        destinations: {lat: 37.733795, lng: -122.446747},
        travelMode: 'DRIVING'
      });

    // const [value, setValue] = useState(null)
    // const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = useState([])
    const {
        ready, 
        suggestions: {status, data}, 
        value,
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({ //Autocompletes suggestions of locations and has many available hooks
        requestOptions: {
            location: {    
            lat: () => 41.076206, //want to receive function that it can call
            lng: () => -73.858749,
            },
            radius: 200 * 1000, //need radius of search in meters (12 mi)
        },
    });

    //Distance Matrix Service callback function
    //Create markers with this callback
    const distanceCallback = useCallback((response) => {
        console.log(response)
      }, []);

    const createTripBtn = () => {
        if(createTrip){
            setCreateTrip(false)
        }
        if(!createTrip){
            setCreateTrip(true)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('button pressed')
    }

    const travelModeHandler = (e) => {
        setDistanceMatrix(prevState => ({
             ...prevState,
            travelMode: e.target.value
            })
        )}


    // useEffect(async (address) => {
    //         setValue(address, false); //Comes from usePlacesAutocomplete hook
    //         clearSuggestions()
    //         try {
    //             const results = await getGeocode({address}); //selects suggestion and shows information on it
    //             const {lat, lng} = await getLatLng(results[0]) //gets lat/lng of location
    //             setOptions([{
    //                 results: results,
    //                 lat: lat,
    //                 lng: lng
    //             }])
    //         } catch(error){
    //             console.log(error)
    //         }
    //     }, [value])

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
                    <div className={classes.formItems}>
                        <TextField 
                        id="standard-basic" 
                        label="Start/Origin"/>
                    </div>

{/* //////////////////////////// Needs more work //////////////////////////////////// */}
                    <div className={classes.formItems}>
                        <Autocomplete 
                        autoComplete
                        onSelect={async (address) => {
                            setValue(address, false); //Comes from usePlacesAutocomplete hook
                            clearSuggestions()
                            try {
                                const results = await getGeocode({address}); //selects suggestion and shows information on it
                                const {lat, lng} = await getLatLng(results[0]) //gets lat/lng of location
                            } catch(error){
                                console.log("error!")
                            }
                        }}
                        options={options}
                        onChange={e => setValue(e.target.value)}
                        id="destination-input"
                        value={value}
                        style={{width: 200}}
                        renderInput={
                            (params) => <TextField {...params} 
                            id="standard-basic" 
                            label="End/Destination" 
                            fullWidth/>
                            }
                        renderOption={(option) => {
                            return(
                                <Grid item s>
                                {status === 'OK' && data.map(({index, description}) => (
                                <span key={index} >
                                    {description}
                                </span>
                            ))}
                            </Grid>
                        )
                        } }
                        
                        />
                    </div>



                    <div className={classes.formItems}>
                        <FormControl  className={classes.dropDown}>
                            <InputLabel>Travel Method</InputLabel>
                            <Select 
                                native
                                value={distanceMatrix.travelMode}
                                onChange={e => travelModeHandler(e)}
                            >
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
              origins: [distanceMatrix.origins],
              destinations: [distanceMatrix.destinations],
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
