import React from 'react'
import PropTypes from 'prop-types'

const CoverMessage = props => {
    return (
        <div className={`coverMessage ${props.className}`}>
            <div className={`coverMessage__content ${props.innerClassName}`}>
                {props.message}
            </div>
        </div>
    )
}

CoverMessage.propTypes = {
    message: PropTypes.string,
    className: PropTypes.string,
    innerClassName: PropTypes.string
}

export default CoverMessage
