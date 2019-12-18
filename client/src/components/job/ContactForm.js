import React, { useState } from 'react'

export default function ContactForm({ job, onCancelClick }) {
    const [selectedFile, setFile] = useState(null);

    return (
        <form>
            <h2>応募フォーム</h2>
            <h3>RE:{job.title}</h3>
            <div class="field">
                <label class="label">氏名</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input is-success" type="text" placeholder="Text input" value="bulma" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </div>
                <p class="help is-success">This username is available</p>
            </div>

            <div class="field">
                <label class="label">Eメール</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input is-danger" type="email" placeholder="Email input" value="hello@" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <p class="help is-danger">This email is invalid</p>
            </div>
            <div className="field">
                <label className="label">メッセージ</label>
                <div className="control">
                    <textarea className="textarea" rows="20" cols="100"></textarea>
                </div>
            </div>
            <div className="field">
                <label className="label">CV アップロード</label>
                <div className="control file has-name">
                    <label class="file-label">
                        <input class="file-input" type="file" name="resume" onChange={event => setFile(event.target.files[0])} />
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                ファイルを選択してください
                    </span>
                        </span>
                        <span class="file-name">
                            {selectedFile ? selectedFile.name : 'No file'}
                        </span>
                    </label>
                </div>
            </div>
{/* 
            <div class="file has-name">
                <label class="file-label">
                    <input class="file-input" type="file" name="resume" onChange={event => setFile(event.target.files[0])} />
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            ファイルを選択してください
                    </span>
                    </span>
                    <span class="file-name">
                        {selectedFile ? selectedFile.name : 'No file'}
                    </span>
                </label>
            </div> */}
            <div className="field is-grouped">
                <div className="control">
                    <button type="button" className="button is-link">送信</button>
                </div>
                <div className="control">
                    <button type="button" className="button is-link is-light" onClick={onCancelClick}>キャンセル</button>
                </div>
            </div>
        </form>
    )
}
