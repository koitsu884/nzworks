import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

import Alert from '../../../utils/alert';
import { getUserImages, deleteUserImage } from '../../../actions/userActions';
import ImageSelector from '../../common/ImageSelector';
import UserImageUploader from './UserImageUploader';

Modal.setAppElement("#root")

const UserImageEditor = (props) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    // const uploadingCount = useSelector(state =>  state.user.uploadingPhotoCount);
    const [modalIsOpen, setModalOpen] = useState(false);
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

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className="userImageEditor">
            <button type="button" className="button is-primary" onClick={openModal} disabled={imageNum >= 4}>画像をアップロードする(４つまで)</button>
            <h4>メイン画像選択</h4>
            <ImageSelector
                images={profile.images}
                onSelect={handleMainImageSelect}
                onDelete={handleDeleteImage}
                initialSelection={profile.avatar}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Test"
                style={{ overlay: { zIndex: 1000 } }}
            >
                <UserImageUploader onUploaded={handleImagesUploaded} maxNum={4 - imageNum} />
                <button className="button is-danger is-small u-margin-auto" type="button" onClick={closeModal}>キャンセル</button>
            </Modal>
        </div>
    )
}

UserImageEditor.propTypes = {
    onMainImageSelect: PropTypes.func
}

export default UserImageEditor;
