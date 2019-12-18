import React from 'react'
import EmailEditor from './AccountEdit/EmailEditor';
import PasswordEditor from './AccountEdit/PasswordEditor';

function AccountEdit() {
    return (
        <div className="container u-flex-responsive">
            <div className="u-margin-small">
                <EmailEditor />
                <PasswordEditor />
            </div>
        </div>
    )
}

export default AccountEdit;