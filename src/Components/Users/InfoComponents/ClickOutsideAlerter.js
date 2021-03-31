import React, {useEffect, useRef} from 'react'

const ClickOutsideAlerter = (props) => {
    const wrapperRef = useRef()
    
        useEffect(() => {
            const handleClickOutside = (event) => {
                console.log(event.target)
                console.log(wrapperRef)
            //     if(wrapperRef && event.target !== wrapperRef){
            //         console.log("clicked outside")
            //     }
            }
            document.addEventListener('click', handleClickOutside)
            return () => {
                document.removeEventListener('click', handleClickOutside)
            }
        }, [wrapperRef])
    

    return (
        <div ref={wrapperRef}>
            {props.children}
        </div>
    )
}

export default ClickOutsideAlerter
