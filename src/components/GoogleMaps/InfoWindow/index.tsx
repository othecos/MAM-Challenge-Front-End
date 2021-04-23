import { Box } from '@material-ui/core'
import React from 'react'

interface Props {
    distance:string
}

const DistanceInfoWindow = (props: Props) => {
    return (
        <Box>
            Distance: {props.distance}
        </Box>
    )
}

export default DistanceInfoWindow
