import React from 'react'

export default function EmailSent() {
    let email = sessionStorage.getItem('email');

    return (
        <div className="container">
            <p>登録されたEメールアドレス{email ? `(${email})` : ''}に認証用URLを送信致しました。</p>
            <p>本文のリンクをクリックして、アカウントの認証を行ってください。</p>
            <br/>
            <p>※認証リンクは１時間のみ有効です</p>
            <br />
            <p>※通信状況によってはメールが届くまで5分以上かかる事がございます。もし更に長時間待っても届かない場合は、恐れ入りますが問い合わせフォームからご連絡ください。</p>
        </div>
    )
}
