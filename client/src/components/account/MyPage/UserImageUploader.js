import React, {useState} from 'react';
import PropTypes from 'prop-types';

import client from '../../../utils/client';

import MultipleImageUploader from '../../common/MultipleImageUploader';
import { resizeFile } from '../../../utils/imageManager';

const modalStyle = {
    position:'fixed',
    top: 0,
    left: 0,
    width: '100vh',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,.5)',
    display: 'flex',
    justifyContents:'center',
    alignItems: 'center',
    zIndex: '1000'
}

const UserImageUploader = (props) => {
    const [selectedFiles, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

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
    
        for (var file of files) {
            let fd = new FormData();
            fd.append('photo', file, file.name);
            try{
                await client.post('user/images', fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch(error) {
                failed.push(file.name);
            }
        }
    
        if (failed.length > 0) {
            console.log("Faild to upload some files");
            console.log(failed);
        }
    }

    const onUpload = async () => {
        setUploading(true);
        await uploadImages(selectedFiles);
        console.log('Upload complete!!');
        setUploading(false);
        props.onUploaded();
    }

    return (
        <div className="userImageUploader">
            <h3>画像アップロードする（{props.maxNum}つまで）</h3>
            <MultipleImageUploader onImagesSelected={onImagesSelected} maxNum={props.maxNum} />
            {
                uploading 
                ? <div style={modalStyle}>画像をアップロード中です…</div>
                : <button type="button" onClick={onUpload} className="button is-primary" disabled={selectedFiles.length === 0}>アップロード</button>
            }
        </div>
    )
}

UserImageUploader.propTypes = {
    onUploaded: PropTypes.func,
    maxNum: PropTypes.number
}

export default UserImageUploader;
