import React from 'react';
import Modal from 'react-modal';
import useForm, { FormContext } from 'react-hook-form';

import client from '../../../../utils/client';
import Alert from '../../../../utils/alert';
import useModal from '../../../hooks/useModal';
import TextField from '../../../form/TextField';



const PasswordEditor = () => {
    const [openModal, closeModal, modalIsOpen] = useModal();
    const methods = useForm(); // initialise the hook
    const { handleSubmit } = methods;

    const onSubmit = data => {
        client.put('auth/password', {password: data.password})
        .then(res => {
            Alert.success("パスワードを変更しました");
        })
        .catch(errors => {
            console.log(errors);
            Alert.error("パスワードの変更に失敗しました")
        })
        .finally(() => {
            closeModal();
        })
    }

    return (
        <div className="editSection">
            <div className="field">
                <label className="label">パスワード</label>
                <button type="button" onClick={openModal} className="control button is-primary">パスワード変更</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Test"
                style={{ overlay: { zIndex: 1000 }, content: { maxWidth: '65rem', margin: 'auto' } }}
            >
                <div className="userForm">
                    <h1 className="heading">パスワード変更</h1>
                    <FormContext {...methods} >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                label="新しいパスワード"
                                type="password"
                                placeholder="パスワードを入力してください"
                                name="password"
                                registerOptions={{ required: true, minLength: 6, maxLength: 50 }}
                            />
                            <TextField
                                label="パスワード確認"
                                type="password"
                                placeholder="パスワードをもう一度入力してください"
                                name="password2"
                                customErrorMessage="パスワードが一致しません"
                                registerOptions={{
                                    required: true,
                                    validate: (value) => {
                                        return value === methods.watch('password');
                                    }
                                }}
                            />
                            <div className="field u-margin-top-small">
                                <div className="buttons">
                                    <button type="submit" className="button is-link">変更</button>
                                    <button type="button" onClick={closeModal} className="button is-danger">キャンセル</button>
                                </div>
                            </div>
                        </form>
                    </FormContext>
                </div>
            </Modal>
        </div>
    )
}

export default PasswordEditor;
