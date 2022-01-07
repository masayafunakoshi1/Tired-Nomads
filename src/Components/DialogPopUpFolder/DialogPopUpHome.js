import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Pulls out homepage dialog popup to introduce the site to user

const DialogPopUpHome = () => {
  const [popup, setPopup] = useState(false);

  //Closes popup
  const handleClose = () => {
    setPopup(false);
  };

  //"Get Started" pop-up on page load
  useEffect(() => {
    setPopup(true);
  }, []);

  return (
    <div>
      <Slide direction="up" timeout={500} in={popup}>
        <Dialog
          open={popup}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Welcome Nomad!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Fresh off of a road-trip or thinking about starting one?
              <br />
              <Link to="/signup">Create an account</Link> to start marking down
              your sleep-venture!
              <br />
              {/* Maybe should link directly to guest account */}
              Or try our <Link to="/login">Guest Account</Link>.
              <strong>Click on the map to get started!</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Lets Sleep!
            </Button>
          </DialogActions>
        </Dialog>
      </Slide>
    </div>
  );
};

export default DialogPopUpHome;
