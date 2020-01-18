import React from 'react'
import PropTypes from 'prop-types';
import Icon from '../Icon';

const EditIcon = ({className, onClick}) => {
    return (
        <Icon iconClassName="fa-edit icon--selectable icon--edit" className={className} onClick={onClick} />
    )
}

EditIcon.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
}

export default EditIcon
