import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { selectThreadComment, deleteComment } from '../../actions/threadActions';

import Alert from '../../utils/alert';
import useModal from '../hooks/useModal';
import ThreadCommentList from './ThreadCommentList';
import ThreadCommentForm from './ThreadCommentForm';

const modalStyle = {
    maxWidth: '50rem',
    height: '40rem',
    padding: '2rem',
    margin: 'auto'
}

const ThreadCommentArea = ({ commentList, threadId, currentUserId, threadOwnerId }) => {
    const [openModal, closeModal, modalIsOpen] = useModal();
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    const handleAddComment = () => {
        setEditMode(false);
        openModal();
    }

    const handleEditComment = (commentId, comment) => {
        dispatch(selectThreadComment(commentId, comment));
        setEditMode(true);
        openModal();
    }

    const handleDeleteComment = (commentId) => {
        Alert.confirm("このコメントを本当に削除しますか？")
            .then((result) => {
                if (result.value) {
                    dispatch(deleteComment(threadId, commentId));
                }
            })
    }

    return (
        <div>
            <h2 className="heading--label-primary">コメント</h2>
            <ThreadCommentList
                commentList={commentList}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
                currentUserId={currentUserId}
                threadOwnerId={threadOwnerId}
            />

            {
                currentUserId ?
                    <button type="button" className="button is-primary u-margin-medium" onClick={handleAddComment}>コメントを追加する</button>
                    : null
            }

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className='modalContent'
                style={{ overlay: { zIndex: 1000 }, content: modalStyle }}
            >
                <ThreadCommentForm
                    threadId={threadId}
                    onCancel={closeModal}
                    onUpdate={closeModal}
                    editMode={editMode}
                />
            </Modal>
        </div>
    )
}

ThreadCommentArea.propTypes = {
    threadId: PropTypes.string.isRequired,
    commentList: PropTypes.array.isRequired,
    currentUserId: PropTypes.string,
    threadOwnerId: PropTypes.string,
}

export default ThreadCommentArea
