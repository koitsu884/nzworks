import React, { useEffect } from 'react';
import useForm, { FormContext } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../actions/userActions';

import TextField from '../../form/TextField';
import UserImageEditor from './UserImageEditor';

const ProfileEdit = (props) => {
    const dispatch = useDispatch();
    const methods = useForm();
    const { setValue, register, watch } = methods;
    const profile = useSelector(state => state.user.currentUser.profile);

    let selectedImage = watch('avatar');

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
                    <div className="editSection">
                        <UserImageEditor onMainImageSelect={handleAvatarChange} selectedImageId={selectedImage ? selectedImage.image_id : null} />
                    </div>
                    {/* <TextField
                        label="自己主紹介文(1000文字以内)"
                        type="textarea"
                        name="introduction"
                        className="editSection"
                        info="※紹介文は求人応募時に、メッセージに含む事ができます"
                        registerOptions={{ minLength: 6, maxLength: 1000 }}
                    /> */}
                    <TextField
                        label="電話番号"
                        type="tel"
                        placeholder="電話番号を入力してください"
                        name="phone"
                        className="editSection"
                        registerOptions={{ maxLength: 12 }}
                    />
                    <div className="control editSection">
                        <button className="button is-link is-large">変更を保存</button>
                    </div>
                </form>
            </FormContext>
        </div>
    )
}

export default ProfileEdit;
