import React, {useState, useCallback} from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Ratings = (userRating) => {
    const [value, setValue] = useState(2)

    const onValueSet = useCallback(() => {
        
    })

    return (
        <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Rating</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                />
        </Box>
    )
}

export default Ratings
