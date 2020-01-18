import React, { useEffect } from 'react';
import useForm, { FormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addThread, getThread, editThread } from '../../actions/threadActions';

import { resizeFile, validateImage } from '../../utils/imageManager';
import Alert from '../../utils/alert';

import TextField from '../form/TextField';
import Spinner from '../common/Spinner';

const ThreadEditForm = (props) => {
    const threadId = props.match.params.id;
    const dispatch = useDispatch();
    const loading = useSelector(state => state.common.loading);
    const selectedThread = useSelector(state => state.thread.selectedThread);
    const methods = useForm(); // initialise the hook
    const { register, setValue, handleSubmit } = methods;

    useEffect(() => {
        register({ name: 'mainImage' });

        if (threadId) {
            dispatch(getThread(threadId));
        }
    }, [register, threadId, dispatch])

    useEffect(() => {
        if(selectedThread){
            setValue("title", selectedThread.title);
            setValue("details", selectedThread.details);
        }
    }, [selectedThread, setValue])

    const onSubmit = async data => {
        if(threadId){
            dispatch(editThread(threadId, data));
        }
        else {
            let fd = new FormData();
            if (data.mainImage) {
                //Resize image here
                let resizedFile = await resizeFile(data.mainImage, 1024, data.mainImage.name);
                fd.append('photo', resizedFile, resizedFile.name);
            }
            fd.append('title', data.title);
            fd.append('details', data.details);
 
            dispatch(addThread(fd));
        }
    }

    const handleFileChange = e => {
        let file = e.target.files[0];
        if (file) {
            if (validateImage(file)) {
                setValue('mainImage', file);
            }
            else {
                Alert.error("対応していないファイルタイプです");
                e.target.value = null;
            }
        }
    }

    return (
        <div className="container">
            <h1>スレッド作成</h1>
            <FormContext {...methods} >
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="タイトル"
                        type="title"
                        placeholder="タイトルを入力してください"
                        name="title"
                        registerOptions={{ required: true, maxLength: 100 }}
                    />
                    <TextField
                        label="詳細"
                        type="textarea"
                        name="details"
                        rows={15}
                        registerOptions={{ required: true, minLength: 6, maxLength: 5000 }}
                    />
                    {
                        threadId ? null : (
                            <div className="field">
                            <label className="label">メイン画像</label>
                            <div className="control">
                                <input className="input"
                                    type="file"
                                    name="mainImage"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        )
                    }

                    <div className="field u-margin-top-small">
                        <div className="has-text-center">
                            <button className="button is-inline is-link" disabled={loading ? 'disabled' : ''}>{threadId ? '更新' : '投稿する'}</button>
                        </div>
                    </div>
                </form>
            </FormContext>
            {loading ? <Spinner cover={true} /> : null}
        </div>
    )
}

export default ThreadEditForm
