import React from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Marker } from '@react-google-maps/api'

const defaultCenter = {
    lat: -3.745,
    lng: -38.523
}

const DisplayLocation = props => {
    let { location } = props;

    return (
        <div className={props.className} style={props.style}>
            <GoogleMap
                id="gmap"
                mapContainerStyle={{
                    height: "100%",
                    width: "100%"
                }}
                zoom={15}
                center={location ? location : defaultCenter}
            >
                {
                    location ? <Marker position={location} /> : null
                }
            </ GoogleMap> 
        </div>
    )
}

DisplayLocation.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    location: PropTypes.object
}

export default DisplayLocation
