import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            <h1 className="heading">ログイン</h1>
            <div className="field">
                <label className="label required">アカウントタイプ</label>
                <div className="tabs is-toggle control">
                    <ul>
                        <li className={userType === 'Personal' ? 'is-active' : ''} onClick={() => handleUserTypeChange('Personal')}>
                            <a href="# ">
                                <span>求職者</span>
                            </a>
                        </li>
                        <li className={userType === 'Business' ? 'is-active' : ''} onClick={() => handleUserTypeChange('Business')}>
                            <a href="# ">
                                <span>企業・雇用主</span>
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
                    <div className="field u-margin-top-small">
                        <div className="u-flex u-space-between">
                            <Link className="link" to="/auth/forgotpassword">パスワードを忘れた方</Link>
                            <button className="button is-inline is-link">ログイン</button>
                        </div>
                    </div>
                </form>
            </FormContext>
            <hr />
            <h4>もしくは</h4>
            <GoogleLogin userType={userType} signIn={true} />
        </div>
    )
}

export default Signin;
