import React from 'react'

const PasswordEditor = () => {
    const onClick = () => {
        console.log("open modal");
    }

    return (
        <div className="field">
            <label className="label">パスワード</label>
            <button type="button" onClick={onClick} className="control button is-primary">パスワード変更</button>
        </div>
    )
}

export default PasswordEditor
