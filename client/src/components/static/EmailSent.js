import React from 'react'

export default function EmailSent() {
    return (
        <div className="container">
            <p>登録されたEメールアドレスに認証用URLを送信致しました。</p>
            <p>本文のリンクをクリックして、アカウントの認証を行ってください。</p>
            <br/>
            <p>※認証リンクは１時間のみ有効です</p>
        </div>
    )
}
