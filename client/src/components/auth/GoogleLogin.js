import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from '../../constants';

export default function GoogleLogin({ userType, signIn = false }) {
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
    }, [userType])

    const handleClick = (userType) => {
        if (userType || signIn) {
            window.open(`${API_BASE_URL}/auth/google?userType=${userType}`);
        }
        else {
            setError('アカウントタイプを選択してください');
        }
    }

    return (
        <div className="u-margin-small">
            <div className="button-google" onClick={() => handleClick(userType)}>
                <span className="icon button-google__logo">
                    <i className="fab fa-google"></i>
                </span>
                <span>Google アカウントでログイン</span>
            </div>
            {
                error ? <p className="has-text-danger">{error}</p> : null
            }
        </div>
    )
}
