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
    const { setValue, register } = methods;
    const profile = useSelector(state => state.user.currentUser.profile);

    useEffect(() => {
        register({ name: 'avatar' });

        if (profile) {
            setValue('introduction', profile.introduction);
            setValue('phone', profile.phone);
            setValue('avatar', profile.avatar);
            setValue('address', profile.address);
            if(profile.location)
            {
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
                    <UserImageEditor onMainImageSelect={handleAvatarChange} />
                    <TextField
                        label="企業・雇用主紹介文(1000文字以内)"
                        type="textarea"
                        name="introduction"
                        registerOptions={{ minLength: 6, maxLength: 1000 }}
                    />
                    <p className="help is-info u-margin-bottom-medium">※紹介文は求人広告に表示されます</p>
                    <div className="u-flex-responsive">
                        <div className="u-margin-small u-flex-grow">
                            <TextField
                                label="電話番号"
                                type="tel"
                                placeholder="電話番号を入力してください"
                                name="phone"
                                registerOptions={{ maxLength: 12 }}
                            />
                            <TextField
                                label="ウェブサイト"
                                type="url"
                                placeholder="URLを入力してください"
                                name="companyWebsite"
                                registerOptions={{ maxLength: 200 }}
                            />
                        </div>
                        <div className="u-margin-small u-flex-grow">
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
