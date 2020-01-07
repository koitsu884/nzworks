import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({
    className,
    iconClassName,
    onClick
}) => {
    return (
        <span className={`icon ${className}`} onClick={onClick}>
            <i className={`fas ${iconClassName}`}></i>
        </span>
    )
}

Icon.propTypes = {
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    onClick: PropTypes.func
}

export default Icon
