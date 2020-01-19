import React from 'react'
import PropTypes from 'prop-types';
import Icon from '../Icon';

const MenuIcon = ({className, onClick}) => {
    return (
        <Icon iconClassName="fa-bars icon--selectable icon--edit" className={className} onClick={onClick} />
    )
}

MenuIcon.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
}

export default MenuIcon
