import React from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ja';

import Image from '../common/Image';
import noImageUrl from '../../img/no_image_small.png';

const UserComment = ({ user, status, comment, datetime }) => {
    const currentUser = useSelector(state => state.user.currentUser);
    let mine = currentUser && currentUser._id === user._id;

    return (
        <div className={`userComment ${mine ? 'mine' : ''}`}>
            {
                status ? <span className="tag is-warning userComment__status">{status}</span> : null
            }
            <div className="userComment__image">
                <Image src={user.profile.avatar ? user.profile.avatar.image_url : noImageUrl} alt='Profile Image' />
            </div>
            <div className="userComment__comment">
                <p><b>{user.name}:</b></p>
                <p className="u-text-wrap">
                    {comment}
                </p>
                <p className="u-margin-top-small has-text-info">{moment(datetime).utc().fromNow()}</p>
            </div>
        </div>
    )
}

UserComment.propTypes = {
    user: PropTypes.object.isRequired,
    status: PropTypes.string,
    comment: PropTypes.string.isRequired,
    datetime: PropTypes.string
}

export default UserComment
