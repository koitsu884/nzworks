import React from 'react'
import PropTypes from 'prop-types';
import Icon from '../Icon';

const DeleteIcon = ({className, onClick}) => {
    return (
        <Icon iconClassName="fa-trash-alt icon--selectable icon--delete" className={className} onClick={onClick} />
    )
}

DeleteIcon.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
}

export default DeleteIcon
