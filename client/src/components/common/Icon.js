import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({iconNameClass, modifierClasses = ''}) => {
    let className = 'fas '
                  + iconNameClass
                  + (modifierClasses ? ' ' + modifierClasses : '');
    return (
        <span className="icon">
            <i className={`${className}`}></i>
        </span>
    )
}

Icon.propTypes = {
    iconNameClass: PropTypes.string.isRequired,
    modifierClasses: PropTypes.string
}

export default Icon
