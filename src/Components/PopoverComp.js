import { Typography } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const PopoverComp = (props) => {
  // const arrayOfLabels = ['Your Location', 'Reset Markers']
  // const [label, setLabel] = useState('')
  const classes = useStyles();
  const open = Boolean(props.anchorEl);

  const switchFunc = (className) => {
    switch (className) {
      case "locate":
        return <Typography>Your Location</Typography>;
      case "reset":
        return <Typography>Reset Markers</Typography>;
      case "nightMode":
        return <Typography>Toggle NightMode</Typography>;
      case "feedbackBtn":
        return <Typography>Write Feedback</Typography>;
      default:
        return null;
    }
  };

  return (
    <div>
      {props.anchorEl ? (
        <Popover
          className={classes.popover}
          classes={{ paper: classes.paper }}
          open={open}
          anchorEl={props.anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {switchFunc(props.anchorEl.className)}
        </Popover>
      ) : null}
    </div>
  );
};

export default PopoverComp;
