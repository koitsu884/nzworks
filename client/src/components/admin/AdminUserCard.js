import React from 'react'
import PropTypes from 'prop-types'

const AdminUserCard = ({user}) => {
    return (
        <div className="adminUserCard">
            <h5>{user.name}</h5>
            <div>{user.email}</div>
            <p>{user.verified ? <span>verified</span> : <span className="has-text-danger">unverified</span>}</p>
            <p>{user.is_active ? <span>active</span> : <span className="has-text-danger">inactive</span>}</p>
            <div>{user.created_at}</div>
        </div>
    )
}

AdminUserCard.propTypes = {
    user: PropTypes.object.isRequired
}

export default AdminUserCard
