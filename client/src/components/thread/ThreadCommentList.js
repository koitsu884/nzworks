import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import UserComment from '../common/UserComment';
import EditIcon from '../common/Icons/EditIcon';
import DeleteIcon from '../common/Icons/DeleteIcon';


const ThreadCommentList = ({ currentUserId, threadOwnerId, onEdit, onDelete, commentList }) => {
    const handleEditClick = (commentId, comment) => {
        onEdit(commentId, comment);
    }

    const handleDeleteClick = commentId => {
        console.log(commentId);
        onDelete(commentId);
    }

    return (
        <div className="threadCommentList">
            {
                commentList.length > 0
                    ?
                    commentList.map(comment => {
                        let mine = currentUserId === comment.user._id;
                        let commentStatus = threadOwnerId === comment.user._id ? '投稿者' : null;
                        return (
                            <Fragment key={comment._id}>
                                <div className="threadCommentList__item u-flex u-align-items">
                                    <UserComment user={comment.user} comment={comment.comment} datetime={comment.created_at} status ={commentStatus} />
                                </div>
                                {
                                    mine ? (
                                        <div className="threadCommentList__item__tool">
                                            <EditIcon onClick={() => handleEditClick(comment._id, comment.comment)} className='is-medium fa-2x u-margin-small' />
                                            <DeleteIcon onClick={() => handleDeleteClick(comment._id)} className='is-medium fa-2x u-margin-small' />
                                        </div>
                                    ) : null
                                }
                            </Fragment>
                        )
                    })
                    : <div>まだコメントがありません</div>
            }
        </div>
    )
}

ThreadCommentList.propTypes = {
    commentList: PropTypes.array.isRequired,
    currentUserId: PropTypes.string,
    threadOwnerId: PropTypes.string,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
}

export default ThreadCommentList
