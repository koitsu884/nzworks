import React from 'react'
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery'

import { getResizedImageUrl } from '../../../utils/imageManager';
import JobDetailLocation from './JobDetailLocation';

const JobDetailCompanyInfo = props => {
    if (!props.user) return <p>No data</p>;
    let { name, profile } = props.user;

    const renderCompanyImages = images => {
        if (!images || images.length === 0) return null;

        let items = [];

        images.forEach(image => {
            items.push({
                original: image.image_url,
                thumbnail: getResizedImageUrl(image.image_url, 'c_thumb,w_200')
            })
        })

        return (
            <ImageGallery
                items={items}
                autoPlay={true}
                slideInterval={6000}
            />
        )
    }

    return (
        <div className="jobDetail__companyInfo">
            <h3>投稿者情報</h3>
            <h4>{name}</h4>
            <div className="jobDetail__companyInfo__container">
                <div className="jobDetail__companyInfo__images">
                    {renderCompanyImages(profile.images)}
                </div>
                <div className="jobDetail__companyInfo__description">
                    {profile.introduction}
                </div>
                {
                    profile.companyWebsite
                    ? (
                        <div className="jobDetail__companyInfo__description u-margin-top-small">
                            <h5>ウェブサイト</h5>
                            <a href={profile.companyWebsite} className="has-text-link"><u>{profile.companyWebsite}</u></a>
                        </div>
                    )
                    : null
                }
                <JobDetailLocation address={profile.address} />
            </div>
        </div>
    )
}

JobDetailCompanyInfo.propTypes = {
    user: PropTypes.object
}

export default JobDetailCompanyInfo
