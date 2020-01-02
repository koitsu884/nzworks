import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({
    iconNameClass, 
    iconSizeClass = '', 
    modifierClasses = '',
    onClick
}) => {
    let className = 'fas '
                  + iconNameClass
                  + (modifierClasses ? ' ' + modifierClasses : '');
    return (
        <span className={`icon ${iconSizeClass}`} onClick={onClick}>
            <i className={`${className}`}></i>
        </span>
    )
}

Icon.propTypes = {
    iconSizeClass: PropTypes.string,
    iconNameClass: PropTypes.string.isRequired,
    modifierClasses: PropTypes.string,
    onClick: PropTypes.func
}

export default Icon
