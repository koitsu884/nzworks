import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../../../actions/userActions';
import EmailEditor from './AccountEdit/EmailEditor';
import PasswordEditor from './AccountEdit/PasswordEditor';
import Alert from '../../../utils/alert';

function AccountEdit() {
    const dispatch = useDispatch();

    const handleDeleteAccount = () => {
        Alert.confirm("このアカウントを本当に削除しますか？")
        .then((result) => {
            if (result.value) {
                dispatch(deleteAccount());
            }
        })
    }

    return (
        <div className="container">
            <div className="u-margin-small">
                <EmailEditor />
                <PasswordEditor />
                <div className="u-margin-top-big">
                    <hr />
                    <button type="button" className="button is-danger" onClick={handleDeleteAccount}>アカウントを削除する</button>
                </div>
            </div>
        </div>
    )
}

export default AccountEdit;