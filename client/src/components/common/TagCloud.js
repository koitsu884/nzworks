import React from 'react'
import PropTypes from 'prop-types'

const TagCloud = ({tags, className}) => {
    if (!tags || tags.length === 0) return null;

    let tagContents = tags.map(tag => {
        return <span key={tag} className="tag is-primary is-light">{tag}</span>
    });

    return (
        <div className={`tags ${className}`}>{tagContents}</div>
    )
}

TagCloud.propTypes = {
    tags: PropTypes.array,
    className: PropTypes.string
}

export default TagCloud
