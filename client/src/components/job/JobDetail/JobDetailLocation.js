import React from 'react'
import PropTypes from 'prop-types'
import DisplayLocation from '../../common/googlemap/DisplayLocation';

const JobDetailLocation = ({ address, jobLocation }) => {
    const renderLocation = () => {
        if (!jobLocation) return null;

        return (
            <DisplayLocation
                className="jobDetail__location-map"
                location={{
                    lat: jobLocation.coordinates[1],
                    lng: jobLocation.coordinates[0],
                }} />
        )
    }

    return (
        <div className="jobDetail__location">
            {
                renderLocation()
            }
            <div>
                <span className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                </span>
                <span>
                    {address}
                </span>
            </div>
        </div>
    )
}

JobDetailLocation.propTypes = {
    address: PropTypes.string,
    jobLocation: PropTypes.object
}

export default JobDetailLocation
