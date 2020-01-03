import React, { useState } from 'react';
import client from '../../utils/client';
import Alert from '../../utils/alert';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [sent, setFlag] = useState(false);

    const handleChange = e => {
        setEmail(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        client.post('auth/forgotpassword', { email: email })
            .then(result => {
                setFlag(true);
            })
            .catch(error => {
                Alert.error(error);
            })
    }

    const renderForm = () => {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                <p className="u-margin-bottom-medium">登録しているメールアドレスを入力してください</p>
                    <div className="field">
                        <div className="control">
                            <input className="input" onChange={handleChange} type="email" value={email} placeholder="メールアドレスを入力してください" />
                        </div>
                    </div>
                    <div class="field u-margin-top-small">
                        <div class="control">
                            <button class="button is-link" type="submit" disabled={!email}>リセットリンクを送信する</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="userForm">
            <h1 className="heading">パスワードリセット</h1>
            {
                sent ? (
                    <div>
                        <p>パスワードリセットリンクを送信しました。</p>
                        <p className="u-margin-top-medium">メールボックスをご確認ください。</p>
                    </div>
                )
                    : renderForm()
            }
        </div>
    )
}
