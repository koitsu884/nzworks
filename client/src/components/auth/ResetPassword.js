import React, { useState, useEffect } from 'react';
import useForm, { FormContext } from 'react-hook-form';

import history from '../../history';

import TextField from '../form/TextField';
import client from '../../utils/client';
import Alert from '../../utils/alert';

export default function ResetPassword(props) {
    const methods = useForm();
    const [token, setToken] = useState(null);

    useEffect(() => {
        let token = props.match.params.token;
        if (!token) {
            console.log('No token');
            history.push('/')
        }
        else {
            setToken(token);
        }
    }, [props])

    const onSubmit = data => {
        client.post('auth/resetpassword', {password:data.password}, {params:{token: token}})
            .then(response => {
                setToken(null);
                Alert.success("パスワードを変更しました");
                history.push('/signin');
            })
            .catch(error => {
                Alert.error("パスワードリセットに失敗しました");
            })
    }


    return (
        <div className="userForm">
            <h1 className="heading">パスワードリセット</h1>
            <FormContext {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <TextField
                        label="パスワード"
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
                        <div className="control">
                            <button className="button is-link" type="submit">送信</button>
                        </div>
                    </div>
                </form>
            </FormContext>
        </div>
    )
}
