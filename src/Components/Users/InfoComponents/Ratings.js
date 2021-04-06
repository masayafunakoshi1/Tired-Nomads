import React, {useState, useCallback, useEffect} from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {db} from '../../../firebase'

const Ratings = ({selected, currentUser}) => {
    const [value, setValue] = useState(1)
    const userRating = db.collection('users').doc(currentUser ? currentUser.uid : 'user1').collection('ratings')

    //Adds value into firestore "ratings", using same key/id as "markers" in firestore
    //Sets value state hook AND rating to newValue, and sends to firestore
    const onValueSet = (newValue) => {
        setValue(newValue)
        userRating.doc(`${selected.key}`).set({
            rating: newValue
        }).then(() => {
            console.log("Rating set successfully")
        }).catch((err) => {
            console.log(err)
        })
    }

    //Gets "rating" value from firestore and sets it on selected marker's information window
    useEffect(() => {
        userRating.doc(`${selected.key}`).get()
            .then((doc) => {
                if(doc.exists){
                    setValue(doc.data().rating)
                    console.log(doc.data().rating)
                }
                else{
                    console.log("Rating doesn't exist")
                }
            }).catch((err) => {
                    console.log("Process unsuccessful", err)
            })
    }, [selected])


    return (
        <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Rating</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={
                (event, newValue) => {
                    onValueSet(newValue)       
                    }
                }
                />
        </Box>
    )
}

export default Ratings
