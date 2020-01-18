import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deleteThread } from '../../actions/threadActions';
import Image from '../common/Image';
import Alert from '../../utils/alert';
import history from '../../history';
import DeleteIcon from '../common/Icons/DeleteIcon';
import EditIcon from '../common/Icons/EditIcon';

const ThreadListItem = ({ thread }) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const renderUserInfo = (user) => {
        return (
            <div className="threadList__item__userInfo">
                {
                    user.profile.avatar ?
                        <figure className="image is-32x32 u-margin-small">
                            <Image className="is-rounded" src={user.profile.avatar.image_url} thumb={true} />
                        </figure>
                        : null
                }
                <p><b>{user.name}</b></p>
            </div>
        )
    }

    const handleDeleteClick = id => {
        Alert.confirm("この投稿を本当に削除しますか？")
            .then((result) => {
                if (result.value) {
                    dispatch(deleteThread(id));
                }
            })
    }

    const handleEditClick = id => {
        history.push('/thread/edit/' + id);
    }

    return (
        <div className="threadList__item">
            <Link to={`/thread/${thread._id}`} className="threadList__item__content">

                {
                    thread.mainImage ? (
                        <div className="threadList__item__image">
                            <Image src={thread.mainImage.image_url} thumb={true} />
                        </div>
                    ) : null
                }
                <div>
                    <h3>{thread.title}</h3>
                    {renderUserInfo(thread.user)}
                </div>
            </Link>
            {
                currentUser && currentUser._id === thread.user._id
                    ? (
                        <Fragment>
                            <div className="threadList__item__tool">
                                <EditIcon onClick={() => handleEditClick(thread._id)} className='is-medium fa-2x' />
                                <DeleteIcon onClick={() => handleDeleteClick(thread._id)} className='is-medium fa-2x' />
                            </div>
                            <span className="threadList__item__status tag is-warning is-medium">
                                自分の投稿
                        </span>
                        </Fragment>
                    )
                    : null
            }
        </div>
    )
}

ThreadListItem.propTypes = {
    thread: PropTypes.object.isRequired
}

export default ThreadListItem

