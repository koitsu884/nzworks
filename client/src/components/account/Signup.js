import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { signUp } from '../../actions/authActions';
import useForm, { FormContext } from 'react-hook-form';

import TextField from '../form/TextField';
import GoogleLogin from '../auth/GoogleLogin';

function Signup(props) {
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
        let fd = Object.assign({}, data);
        fd.profile = { user_type: fd.user_type };
        fd.password2 = undefined;
        fd.user_type = undefined;
        dispatch(signUp(fd));
    }


    return (
        <div className="userForm">
            <h1 className="heading">アカウント作成</h1>
            <FormContext {...methods} >
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <TextField
                        label={userType === 'Business' ? '表示名（会社名、雇用者名等）' : '表示名'}
                        type="text"
                        placeholder="サイト内で使用する名前を入力してください"
                        name="name"
                        registerOptions={{ required: true, maxLength: 100 }}
                    />
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
                            <button className="button is-link">登録</button>
                        </div>
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

export default Signup;
