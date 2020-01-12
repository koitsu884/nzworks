import React from 'react'
import PropTypes from 'prop-types';
import Image from '../common/Image';
import JobDetailLocation from '../job/JobDetail/JobDetailLocation';


const BusinessProfileDetail = (props) => {
    const { name, profile } = props.user;

    return (
        <div className="businessProfileDetail">
            <div>
                {
                    profile.avatar
                    ? <div className="businessProfileDetail__avatar u-margin-bottom-medium">
                        <Image className="u-margin-auto" src={profile.avatar.image_url} alt='avatar' />
                    </div>

                    : null
                }
                <h2 className="heading u-margin-bottom-medium">{name}</h2>
                <div className="u-margin-medium">
                    <div className="u-text-wrap u-margin-small">
                        {profile.introduction}
                    </div>
                    {
                        profile.companyWebsite
                            ? (
                                <div className="u-margin-small">
                                    <h4>ウェブサイト</h4>
                                    <a href={profile.companyWebsite} className="has-text-link"><u>{profile.companyWebsite}</u></a>
                                </div>
                            )
                            : null
                    }
                    {
                        profile.address
                        ? (
                            <div className="u-margin-small">
                            <h4>住所</h4>
                            <JobDetailLocation address={profile.address} />
                            </div>
                        )
                        : null
                    }
                </div>
            </div>
            {/* <h3>求人</h3>
            <div>Job list here</div> */}
        </div>
    )
}

BusinessProfileDetail.propTypes = {
    user: PropTypes.object
}

export default BusinessProfileDetail
