import React, {useState, useCallback} from 'react'
import {
    Marker,
    DistanceMatrixService
  } from "@react-google-maps/api";

import { makeStyles } from '@material-ui/core/styles';
import {TextField,
        Button,
        Paper,
        FormControl,
        InputLabel,
        Select} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            left: '40px',
            },
    },
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

    return (
        <div className="distanceMatrix">

            <Button 
            variant="contained" 
            color="primary" 
            type="open"
            onClick={createTripBtn}>
                Create Trip
            </Button>

        {  createTrip ? 
            <Paper 
            elevation={3} 
            variant="elevation"
            className={classes.root}>
                <form>
                    <div>
                        <TextField 
                        id="standard-basic" 
                        label="Start/Origin"/>
                    </div>
                    <div>
                        <TextField 
                        id="standard-basic" 
                        label="End/Destination"/>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel>Travel Method</InputLabel>
                            <Select 
                                native
                                value={distanceMatrix.travelMode}

                            >
                                <option aria-label="None" value="" />
                                <option value={'DRIVING'}>Driving</option>
                                <option value={'BICYCLING'}>Bicycling</option>
                                <option value={'WALKING'}>Walking</option>
                                <option value={'TRANSIT'}>Transit</option>
                            </Select>
                        </FormControl>

                    </div>
                    <div>
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
