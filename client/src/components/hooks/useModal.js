import {useState} from 'react';
import Modal from 'react-modal';

Modal.setAppElement("#root")

const useModal = () => {
    const [modalIsOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return [openModal, closeModal, modalIsOpen]
}

export default useModal;
