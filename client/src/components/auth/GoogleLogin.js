import React from 'react'
import { API_BASE_URL } from '../../constants';

export default function GoogleLogin() {
    return (
        <div className="button-google">
            <a href={`${API_BASE_URL}/auth/google`}>
                <span className="icon button-google__logo">
                    <i className="fab fa-google"></i>
                </span>
                Google アカウントでログイン
                </a>
        </div>
    )
}
