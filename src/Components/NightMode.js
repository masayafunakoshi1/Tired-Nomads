import React from 'react'
import Switch from '@material-ui/core/Switch';

const NightMode = ({nightModeHandler, setNightModeHandler}) => {

    const switchHandler = () => {
        if(!nightModeHandler){
            setNightModeHandler(true)
        }
        if (nightModeHandler){
            setNightModeHandler(false)
        }
    }

    return (
    <div className='buttons' id="nightMode">
        <Switch
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
        onChange={switchHandler}
        /> 
        {nightModeHandler ? '🌜' : '🌞'}
    </div>
    )
}

export default NightMode
