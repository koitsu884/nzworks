import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const EmailEditor = (props) => {
    const email = useSelector(state => state.user.currentUser.email);

    return (
        <Fragment>
            <label className="label">メールアドレス</label>
            <div className="fieldd">
                <div className="control">
                    <input className="input" type="text" value={email} disabled />
                </div>
            </div>
        </Fragment>
    )
}

export default EmailEditor;