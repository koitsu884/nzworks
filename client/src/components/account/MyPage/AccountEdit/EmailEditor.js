import React from 'react';
import { useSelector } from 'react-redux';

const EmailEditor = (props) => {
    const email = useSelector(state => state.user.currentUser.email);

    return (
        <div className="editSection">
            <label className="label">メールアドレス</label>
            <div className="field">
                <div className="control">
                    <input className="input" type="text" value={email} disabled />
                </div>
            </div>
        </div>
    )
}

export default EmailEditor;