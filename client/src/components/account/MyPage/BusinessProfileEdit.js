import React, { useEffect } from 'react';
import useForm, { FormContext } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../actions/userActions';

import TextField from '../../form/TextField';
import UserImageEditor from './UserImageEditor';
import AddressField from '../../form/AddressField';

const BusinessProfileEdit = (props) => {
    const methods = useForm();
    const dispatch = useDispatch();
    const { setValue, register, watch } = methods;
    const profile = useSelector(state => state.user.currentUser.profile);

    let selectedImage = watch('avatar');

    useEffect(() => {
        register({ name: 'avatar' });

        if (profile) {
            setValue('introduction', profile.introduction);
            setValue('phone', profile.phone);
            setValue('avatar', profile.avatar);
            setValue('address', profile.address);
            if (profile.location) {
                setValue('location', {
                    lat: profile.location.coordinates[1],
                    lng: profile.location.coordinates[0],
                });
            }
            setValue('companyWebsite', profile.companyWebsite);
        }
    }, [profile, setValue, register])

    const handleAvatarChange = image => {
        setValue('avatar', image);
    }

    const onSubmit = data => {
        let fd = { ...data };
        fd.user_type = "Business";
        if (fd.location) {
            fd.location = {
                type: "Point",
                coordinates: [fd.location.lng, fd.location.lat]
            };
        }
        dispatch(updateProfile(fd));
    }

    return (
        <div className="container">
            <FormContext {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="editSection">
                        <UserImageEditor onMainImageSelect={handleAvatarChange} selectedImageId={selectedImage ? selectedImage.image_id : null} />
                    </div>
                    <TextField
                        label="企業・雇用主紹介文(1000文字以内)"
                        type="textarea"
                        className="editSection"
                        name="introduction"
                        info="※紹介文は求人広告に表示されます"
                        registerOptions={{ minLength: 6, maxLength: 1000 }}
                    />
                    <div className="u-flex-responsive">
                        <div className="u-flex-grow">
                            <TextField
                                label="電話番号"
                                type="tel"
                                placeholder="電話番号を入力してください"
                                name="phone"
                                className="editSection"
                                registerOptions={{ maxLength: 12 }}
                            />
                            <TextField
                                label="ウェブサイト"
                                type="url"
                                placeholder="URLを入力してください"
                                name="companyWebsite"
                                className="editSection"
                                registerOptions={{ maxLength: 200 }}
                            />
                        </div>
                        <div className="u-margin-small u-flex-grow editSection">
                            <AddressField
                                label="所在地"
                                placeholder="会社の住所を入力してください"
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

export default BusinessProfileEdit;
