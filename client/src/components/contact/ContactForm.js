import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import useForm, { FormContext } from 'react-hook-form';
import history from '../../history';

import useModal from '../hooks/useModal';
import TextField from '../form/TextField';

import client from '../../utils/client';
import ContactPreview from './ContactPreview';
import Alert from '../../utils/alert';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        maxHeight: '90vh',
        width: '90%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        zIndex: 100
    }
};

const ContactForm = props => {
    const user = useSelector(state => state.user.currentUser);
    const [formData, setFormData] = useState({});
    const methods = useForm(); // initialise the hook
    const { setValue, handleSubmit } = methods;
    const [openModal, closeModal, modalIsOpen] = useModal();

    useEffect(() => {
        if(user){
            setValue('email', user.email);
            setValue('name', user.name);
        }
    }, [user])

    const onSubmit = data => {
        setFormData(data);
        openModal();
    }

    const sendEmail = () => {
        client.post('/feedback', formData)
            .then(res => {
                Alert.success("メッセージを送信しました");
                history.push('/');
            })
            .catch(error => {
                Alert.error(error);
            })
    }

    return (
        <div className="userForm">
            <h1 className="heading">お問い合わせ</h1>
            <div className="u-margin-bottom-small">
                <p>ニュージーワークスにご関心をお持ちいただき誠にありがとうございます。<br />
                    以下のお問い合わせフォームより、ご意見やご相談などお問合わせください。<br />
                    お問合せ内容の確認後、担当者よりご連絡させていただきます。
                </p>
            </div>
            <FormContext {...methods} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="件名"
                        type="text"
                        placeholder="件名を入力してください"
                        name="title"
                        registerOptions={{ required: true, maxLength: 100 }}
                    />
                    <TextField
                        label="お名前"
                        type="text"
                        placeholder="名前を入力してください"
                        name="name"
                        registerOptions={{ required: true, maxLength: 100 }}
                    />
                    <TextField
                        label="メールアドレス"
                        type="email"
                        placeholder="Ｅメールアドレスを入力してください"
                        name="email"
                        registerOptions={{ required: true, maxLength: 100 }}
                    />
                    <TextField
                        label="本文"
                        type="textarea"
                        name="message"
                        rows={15}
                        cols={20}
                        registerOptions={{ required: true, maxLength: 10000 }}
                    />
                    <div className="field u-margin-small">
                        <button className="button is-link is-large u-margin-auto">送信</button>
                    </div>
                </form>
            </FormContext>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
            >
                <div>以下の内容で送信します。よろしいですか？</div>
                <hr />
                <ContactPreview formData={formData} />
                <hr />
                <div className="field is-grouped">
                    <div className="control">
                        <button type="submit" onClick={sendEmail} className="button is-link">OK</button>
                    </div>
                    <div className="control">
                        <button type="button" className="button is-link is-light" onClick={closeModal}>キャンセル</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ContactForm
