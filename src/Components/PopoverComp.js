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


const PopoverComp = React.forwardRef((props, ref) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);
    
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(ref)
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    
    return (
        <div onMouseOver={handlePopoverOpen}>
            <Popover
            className={classes.popover}
            classes={{paper: classes.paper,}}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            > 
                {props.children}
            </Popover>
        </div>

    )
})

export default PopoverComp
