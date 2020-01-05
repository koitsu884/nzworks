import React, { useState, useEffect, Fragment } from 'react';
import useForm, { FormContext } from 'react-hook-form';
import TextField from '../form/TextField';
import Icon from '../common/Icon';
import Alert from '../../utils/alert';

const MAX_FILE_SIZE = 1048576; //1 MB

export default function ApplyForm({ onSubmit, email, title }) {
    const methods = useForm(); // initialise the hook
    const { handleSubmit, setValue } = methods;

    const [selectedCV, setCV] = useState(null);
    const [selectedCL, setCL] = useState(null);

    useEffect(() => {
        setValue('email', email);
        setValue('title', title);
    }, [email, title])

    const handleFileChange = event => {
        let file = event.target.files[0];
        if(file.size > MAX_FILE_SIZE){
            Alert.error("ファイルサイズが大きすぎます！<br/><br/>１MB以下のファイルを選択してください。")
            return; 
        }
        if(event.target.name === 'cv'){
            setCV(file)
        }
        else if (event.target.name ==='cl'){
            setCL(file)
        }
    }

    const submitFormData = data => {
        let fd = {...data};
        let attachments = [];
        if(selectedCV) attachments.push(selectedCV);
        if(selectedCL) attachments.push(selectedCL);
        fd.attachments = attachments;
        onSubmit(fd);
    }

    return (
        <div>
            <FormContext {...methods} >
                <form onSubmit={handleSubmit(submitFormData)}>
                    <TextField
                            label="件名"
                            type="text"
                            placeholder="件名を入力してください"
                            name="title"
                            className="field u-margin-small"
                            registerOptions={{ required: true, maxLength: 100 }}
                    />
                    <div className="u-flex-responsive">
                        <TextField
                            label="氏名"
                            type="text"
                            placeholder="氏名を入力してください"
                            name="name"
                            className="field u-margin-small"
                            registerOptions={{ required: true, maxLength: 100 }}
                        />
                        <TextField
                            label="返信用メールアドレス"
                            type="email"
                            placeholder="メールアドレスを入力してください"
                            name="email"
                            className="field u-margin-small"
                            info="広告主が返信する際に利用する為、アドレスに間違いが無いか必ずご確認ください"
                            registerOptions={{ required: true, maxLength: 100 }}
                        />
                    </div>

                    <TextField
                        label="メッセージ"
                        type="textarea"
                        name="message"
                        className="field u-margin-small"
                        rows={15}
                        cols={20}
                        registerOptions={{ required: true, maxLength: 5000 }}
                    />
                    <div className="u-flex-responsive">
                        <div className="field u-margin-small">
                            <label className="label">CV アップロード</label>
                            <label className="file-label">
                                <input
                                    className="file-input"
                                    type="file"
                                    name="cv"
                                    onChange={handleFileChange}
                                    accept=".doc,.docx,.txt,.pdf"
                                />
                                <span className="file-cta">
                                    <span className="file-icon">
                                        <i className="fas fa-upload"></i>
                                    </span>
                                    <span className="file-label">
                                        ファイルを選択してください
                                </span>
                                </span>

                            </label>
                            <div>
                                {selectedCV ? (
                                    <Fragment >
                                        <span>{selectedCV.name}</span>
                                        <Icon onClick={() => setCV(null)} iconNameClass='fa-times-circle' iconSizeClass='is-medium' modifierClasses='fa-lg' />
                                    </Fragment>
                                ) : 'No file'}
                            </div>
                        </div>
                        <div className="field u-margin-small">
                            <label className="label">カバーレター</label>
                            <label className="file-label">
                                <input
                                    className="file-input"
                                    type="file"
                                    name="cl"
                                    onChange={handleFileChange}
                                    accept=".doc,.docx,.txt,.pdf"
                                />
                                <div className="file-cta">
                                    <span className="file-icon">
                                        <i className="fas fa-upload"></i>
                                    </span>
                                    <span className="file-label">
                                        ファイルを選択してください
                                </span>
                                </div>
                            </label>
                            <div>
                                {selectedCL ? (
                                    <Fragment >
                                        <span>{selectedCL.name}</span>
                                        <Icon onClick={() => setCL(null)} iconNameClass='fa-times-circle' iconSizeClass='is-medium' modifierClasses='fa-lg' />
                                    </Fragment>
                                ) : 'No file'}
                            </div>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button type="submit" className="button is-link">送信</button>
                        </div>
                    </div>
                </form>
            </FormContext>
        </div>
    )
}
