import React, { useEffect } from 'react';
import useForm, { FormContext } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../actions/userActions';

import TextField from '../../form/TextField';
import UserImageEditor from './UserImageEditor';

const ProfileEdit = (props) => {
    const dispatch = useDispatch();
    const methods = useForm();
    const { setValue, register} = methods;
    const profile = useSelector(state => state.user.currentUser.profile);

    useEffect(() => {
        register({ name: 'avatar' });

        if (profile) {
            setValue('introduction', profile.introduction);
            setValue('phone', profile.phone);
            setValue('avatar', profile.avatar);
        }
    }, [profile, setValue, register])

    const handleAvatarChange = image => {
        setValue('avatar', image);
    }

    const onSubmit = data => {
        let fd = { ...data };
        fd.user_type = "Personal";
        dispatch(updateProfile(fd));
    }

    return (
        <div className="container">
            <FormContext {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <UserImageEditor onMainImageSelect={handleAvatarChange} />
                    <TextField
                        label="自己主紹介文(1000文字以内)"
                        type="textarea"
                        name="introduction"
                        registerOptions={{ minLength: 6, maxLength: 1000 }}
                    />
                    <p className="help is-info u-margin-bottom-medium">※紹介文は求人応募時に、メッセージに含む事ができます</p>
                    <div className="u-flex-responsive">
                        <div className="u-margin-small u-flex-grow">
                            <TextField
                                label="電話番号"
                                type="tel"
                                placeholder="電話番号を入力してください"
                                name="phone"
                                registerOptions={{ maxLength: 12 }}
                            />
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-link is-large">変更を保存</button>
                    </div>
                </form>
            </FormContext>
        </div>
    )
}

export default ProfileEdit;
