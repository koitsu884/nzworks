import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ApplyPreview = ({ formData }) => {
    if (!formData) return null;
    let fileNames = [];
    if (formData.attachments) {
        formData.attachments.forEach(attachment => {
            fileNames.push(attachment.name);
        })
    }

    return (
        <dl className="applyPreview">
            <dt>件名</dt><dd>{formData.title}</dd>
            <dt>送信者名</dt><dd>{formData.name}</dd>
            <dt>本文</dt><dd className="u-text-wrap">{formData.message}</dd>
            {
                fileNames.length > 0
                    ? (
                        <Fragment>
                            <dt>添付ファイル</dt><dd>{fileNames.join(' , ')}</dd>
                        </Fragment>
                    )
                    : null
            }
        </dl>
    )
}

ApplyPreview.propTypes = {
    formData: PropTypes.object
}

export default ApplyPreview
