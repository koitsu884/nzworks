import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <nav>
                <ul>
                    <li><Link to="/static/terms">利用規約</Link></li>
                    <li><Link to="/static/privacy">プライバシーポリシー</Link></li>
                    <li><Link to="/contact">お問い合わせ</Link></li>
                </ul>
            </nav>
            <p>Copyright &copy; {new Date().getFullYear()} NZWorks</p>
        </footer>
    )
}
