import React, {useState} from 'react';
import PropTypes from 'prop-types';

import client from '../../../utils/client';

import MultipleImageUploader from '../../common/MultipleImageUploader';
import { resizeFile } from '../../../utils/imageManager';

const UserImageUploader = (props) => {
    const [selectedFiles, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [count, setCount] = useState(null);

    const onImagesSelected = async (selectedFiles) => {
        let resizedFiles = [];
        let maxSize = 1024;
        for (var file of selectedFiles) {
            let resizedFile = await resizeFile(file, maxSize, file.name);
            resizedFiles.push(resizedFile);
        }

        setFiles( resizedFiles );
    }

    const uploadImages = async files => {
        if(!files || files.length === 0) return;
    
        let failed = [];
        let count = 1;
    
        for (var file of files) {
            let fd = new FormData();
            console.log(file);
            fd.append('photo', file, file.name);
            setCount(count);
            try{
                await client.post('user/images', fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch(error) {
                failed.push(file.name);
            }
            count++;
        }
    
        if (failed.length > 0) {
            console.log("Faild to upload some files");
            console.log(failed);
        }
    }

    const onUpload = async () => {
        setUploading(true);
        await uploadImages(selectedFiles);
        setUploading(false);
        props.onUploaded();
    }

    return (
        <div className="userImageUploader has-text-centered">
            <h3>画像アップロードする（{props.maxNum}つまで）</h3>
            <MultipleImageUploader onImagesSelected={onImagesSelected} maxNum={props.maxNum} />
            {
                uploading 
                ? <div className='modal'><div className="modal__message">{count}枚目の画像をアップロード中です…</div></div>
                : null
            }
            <hr />
            <div className="buttons u-margin-auto">
                <button type="button" onClick={onUpload} className="button is-primary" disabled={selectedFiles.length === 0 || uploading}>アップロード</button>
                <button className="button is-danger" type="button" onClick={props.onCancel}>キャンセル</button>
            </div>
        </div>
    )
}

UserImageUploader.propTypes = {
    onUploaded: PropTypes.func,
    onCancel: PropTypes.func,
    maxNum: PropTypes.number
}

export default UserImageUploader;
