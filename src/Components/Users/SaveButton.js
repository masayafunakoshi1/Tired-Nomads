import React from 'react'
import { Button } from '@material-ui/core';
import {db} from '../../firebase'
import '../../App.css'

const SaveButton = (props) => {

    const openSuccessAlert = () => {
        props.setSuccess("Saved Successfully")
        setTimeout(() => {
            props.setSuccess("")
        }, 1500)
    }

    const openFailureAlert = () => {
        props.setError("Failed to save")
        setTimeout(() => {
            props.setError("")
        }, 1500)

    }

    const saveHandler = () => {
        let batch = db.batch();
        //sets batch as new mark ers, then commits them to firestore
        if(props.markers !== [] || null || undefined){
            props.markers.forEach((doc) => {
                let markersList = db.collection('users')
                                .doc(props.currentUser.uid)
                                .collection('markers')
                                .doc(`${doc.key}`);
                batch.set(markersList, doc);
            })
            batch.commit()
            .then(() => {
                openSuccessAlert()
                props.setChanges(false)
            })
        } else{
            openFailureAlert()
        }
        
        
    };

    return (
        <div className="buttons" id="saveBtn">
            <Button 
            variant="contained" 
            color={props.nightModeHandler ? "default" : "primary"} 
            onClick={saveHandler}
            disabled={!props.changes}
            >Save</Button>
        </div>
    )
}

export default SaveButton
