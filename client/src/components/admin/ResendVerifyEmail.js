import React, { useState } from 'react';
import client from '../../utils/client';
import Alert from '../../utils/alert';
import errorToStr from '../../utils/errorToStr';

const ResendVerifyEmail = () => {
    const [value, setValue] = useState('');

    const handleChange = e => {
        setValue(e.currentTarget.value);
    }

    const resendEmail = () => {
        let data={email:value};

        client.post('admin/resendVerifyEmail', data)
            .then(res => {
                Alert.success("Sent!!");
            })
            .catch(error => {
                Alert.error(errorToStr(error));
            })
    }

    return (
        <form>
            <div className="control u-flex">
                <input type="text" name="email" className="input u-margin-small" onChange={handleChange} />
                <button type="button" className="button is-primary u-margin-small" onClick={resendEmail} >Resend </button>
            </div>
        </form>
    )
}

export default ResendVerifyEmail
