import React from 'react'
import { Button } from '@material-ui/core';
import {db, batch} from '../../firebase'
import '../../App.css'

const SaveButton = ({markers, setSuccess}) => {

    const openAlert = () => {
        setSuccess("Saved Successfully")
        setTimeout(() => {
            setSuccess("")
        }, 2000)
    }

    const saveHandler = () => {
            console.log(markers)

            markers.forEach((doc) => {
                let docRef = db.collection("markers").doc();
                batch.set(docRef, doc)
            });
            batch.commit();

            // db.collection('markers').add(...markers)
            openAlert();
    };

    return (
        <div className="buttons" id="saveBtn">
            <Button variant="contained" color="primary" onClick={saveHandler}>Save</Button>
        </div>
    )
}

export default SaveButton
