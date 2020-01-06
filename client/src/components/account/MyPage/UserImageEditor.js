import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

import Alert from '../../../utils/alert';
import useModal from '../../hooks/useModal';
import { getUserImages, deleteUserImage } from '../../../actions/userActions';
import ImageSelector from '../../common/ImageSelector';
import UserImageUploader from './UserImageUploader';

const UserImageEditor = (props) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const [openModal, closeModal, modalIsOpen] = useModal();
    const { profile } = currentUser;
    let imageNum = profile.images ? profile.images.length : 0;

    const handleMainImageSelect = (image) => {
        props.onMainImageSelect(image);
    }

    const handleDeleteImage = image => {
        Alert.confirm('この写真を削除しますか？')
            .then((result) => {
                if (result.value) {
                    let isMain = profile.avatar && profile.avatar.image_id === image.image_id;
                    dispatch(deleteUserImage(image, isMain));
                }
            })
    }

    const handleImagesUploaded = () => {
        Alert.success("アップロードしました");
        dispatch(getUserImages());
        closeModal();
    }

    return (
        <div className="userImageEditor">
            <button type="button" className="button is-primary" onClick={openModal} disabled={imageNum >= 4}>画像をアップロードする(４つまで)</button>
            <h4>メイン画像選択</h4>
            <ImageSelector
                images={profile.images}
                onSelect={handleMainImageSelect}
                onDelete={handleDeleteImage}
                // initialSelection={profile.avatar}
                selectedImageId={props.selectedImageId}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Test"
                style={{ overlay: { zIndex: 1000}, content:{maxWidth: '65rem',  margin: 'auto'}}}
            >
                <UserImageUploader onUploaded={handleImagesUploaded} onCancel={closeModal} maxNum={4 - imageNum} />
            </Modal>
        </div>
    )
}

UserImageEditor.propTypes = {
    onMainImageSelect: PropTypes.func,
    selectedImageId: PropTypes.string
}

export default UserImageEditor;
