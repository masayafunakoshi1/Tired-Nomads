import React, {useState} from 'react'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
paper: {
padding: theme.spacing(1),
},
}));


const PopoverComp = ({props, componentID}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);

    //  aria-owns={open ? 'locationPopover' : undefined}
    // aria-haspopup="true"
    // onMouseEnter={handlePopoverOpen}
    // onMouseLeave={handlePopoverClose}

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    console.log(props.children)
    
    return (
        <div>
            <Popover
                id={componentID}
                className={classes.popover}
                classes={{paper: classes.paper,}}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                >
                <Typography>Location</Typography>
            </Popover>
        </div>
    )
}

export default PopoverComp
