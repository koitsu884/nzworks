import React from 'react'
import { Link } from 'react-router-dom';
import AuthHeader from '../auth/AuthHeader';
import logo from '../../img/logo.png';

export default function Header() {
    return (
        <header className="header level">
            <Link to="/" className="header__logo level-left"><img src={logo} alt="Logo"/><h1 className="title">ニュージーワークス</h1></Link>
            <AuthHeader />
        </header>
    )
}
