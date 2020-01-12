import React from 'react'
import PropTypes from 'prop-types'

import Image from '../common/Image';
import Icon from '../common/Icon';
import noImageUrl from '../../img/no_image.png';

const BusinessProfileCard = props => {
    const { user } = props;

    const renderImage = (avatar) => {
        return <div className="businessProfileCard__image u-margin-small">
            <Image src={avatar ? avatar.image_url : noImageUrl} alt='avatar' />
        </div>
    }

    const renderAddress = address => {
        if (!address) return null;

        return (
            <div className="u-margin-bottom-small">
                <Icon iconClassName='fa-map-marker-alt' className='has-text-danger' />
                <span>{address}</span>
            </div>
        )
    }

    return (
        <div className="businessProfileCard hover-basic">
            {renderImage(user.profile.avatar)}
            <div className="businessProfileCard__content">
                <h3 className="businessProfileCard__name has-text-info">{user.name}</h3>
                {/* <div className="businessProfileCard__introduction u-margin-bottom-small">{user.profile.introduction}</div> */}
                {renderAddress(user.profile.address)}
            </div>
        </div>
    )
}

BusinessProfileCard.propTypes = {
    user: PropTypes.object
}

export default BusinessProfileCard
