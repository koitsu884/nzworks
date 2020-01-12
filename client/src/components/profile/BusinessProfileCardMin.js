import React from 'react'
import PropTypes from 'prop-types';
import Image from '../common/Image';
import noImageUrl from '../../img/no_image_small.png';

const BusinessProfileCardMin = props => {
    const {user} = props;

    return (
        <div className="businessProfileCardMin">
            <div className="businessProfileCardMin__image">
                {
                    user.profile.avatar
                    ? <Image src={user.profile.avatar.image_url} thumb={true} />
                    : <img src={noImageUrl} />
                }
               
            </div>
            <div>
                <h5 className="has-text-info">{user.name}</h5>
            </div>
        </div>
    )
}

BusinessProfileCardMin.propTypes = {
    user: PropTypes.object.isRequired
}

export default BusinessProfileCardMin
