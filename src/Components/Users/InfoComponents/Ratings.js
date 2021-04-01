import React, {useState, useCallback} from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {db} from '../../../firebase'

const Ratings = ({selected, currentUser}) => {
    const [value, setValue] = useState(2)
    const userRating = db.collection('users').doc(currentUser.uid).collection('ratings')

    const onValueSet = async() => {
        console.log(value)
        await userRating.doc(`${selected.key}`).set({
            rating: value
        }).then(() => {
            console.log("Document written successfully!")

        }).catch(() => {
            console.log("Document failed to write")
        })
    }

    return (
        <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Rating</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                    onValueSet()
                }}
                />
        </Box>
    )
}

export default Ratings
