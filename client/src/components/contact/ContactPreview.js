import React from 'react'
import PropTypes from 'prop-types'

const ContactPreview = ({ formData }) => {
    if (!formData) return null;

    return (
        <dl className="contactPreview">
            <dt>件名</dt><dd>{formData.title}</dd>
            <dt>送信者名</dt><dd>{formData.name}</dd>
            <dt>返信先メールアドレス</dt><dd>{formData.email}</dd>
            <dt>本文</dt><dd className="u-text-wrap">{formData.message}</dd>
        </dl>
    )
}

ContactPreview.propTypes = {
    formData: PropTypes.object
}

export default ContactPreview
