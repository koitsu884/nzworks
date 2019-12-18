import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { signIn } from '../../actions/authActions';
import useForm, { FormContext } from 'react-hook-form';

import TextField from '../form/TextField';
import GoogleLogin from '../auth/GoogleLogin';

function Signin(props) {
    const dispatch = useDispatch();
    const methods = useForm(); // initialise the hook
    const { register, setValue, errors, handleSubmit } = methods;
    let userType = methods.watch('user_type');

    useEffect(() => {
        register({ name: 'user_type' }, { required: true });
    }, [register])

    const handleUserTypeChange = userType => {
        setValue('user_type', userType);
    }

    const onSubmit = data => {
        dispatch(signIn(data.email, data.password));
    }


    return (
        <div className="userForm">
            <h1 className="u-margin-bottom-medium">ログイン</h1>
            <div className="field">
            <label className="label">アカウントタイプ</label>
            <div className="tabs is-toggle control">
                <ul>
                    <li className={userType === 'Business' ? 'is-active' : ''} onClick={() => handleUserTypeChange('Business')}>
                        <a href="# ">
                            <span>雇用者側</span>
                        </a>
                    </li>
                    <li className={userType === 'Personal' ? 'is-active' : ''} onClick={() => handleUserTypeChange('Personal')}>
                        <a href="# ">
                            <span>求職者側</span>
                        </a>
                    </li>
                </ul>
            </div>
            {errors['user_type'] && <p className="help is-danger">アカウントタイプを選んでください</p>}
        </div>
            <FormContext {...methods} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Email"
                        type="email"
                        placeholder="Ｅメールアドレスを入力してください"
                        name="email"
                        registerOptions={{ required: true, maxLength: 100 }}
                    />
                    <TextField
                        label="パスワード"
                        type="password"
                        placeholder="パスワードを入力してください"
                        name="password"
                        registerOptions={{ required: true, minLength: 6, maxLength: 50 }}
                    />
                    <div className="control">
                        <button className="button is-link">ログイン</button>
                    </div>
                </form>
            </FormContext>
            {
                userType === 'Personal' ? (
                    <Fragment>
                        <hr />
                        <h4>もしくは</h4>
                        <GoogleLogin />
                    </Fragment>
                ) : null
            }
        </div>
    )
}

export default Signin;
