import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import Alert from '../../utils/alert';

export default function MultipleImageUploader(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    // multiple: props.multiple,
    onDrop: acceptedFiles => {
      let maxNum = props.maxNum ? props.maxNum : 4;
      // let maxSize = props.maxSize ? props.maxSize : 800;
      acceptedFiles = acceptedFiles.concat(files);
      acceptedFiles.forEach((file, index) => {
        file.key = `photo_${index}.${file.name.substr(file.name.lastIndexOf('.') + 1)}`;
      })

      if (acceptedFiles.length > maxNum) {
        Alert.error(`アップロードできる画像は${maxNum}個までです`)
        return;
      }

      //Setting previews
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      //Callback function
      props.onImagesSelected(acceptedFiles);
    }
  });

  const thumbs = files.map((file, index) => (
    <div className="imageUploader__preview__item" key={file.key}>
      <img
        src={file.preview}
        alt="preview"
        className="imageUploader__preview__item__image"
      />
      <span className="icon is-danger" onClick={() => {
        let updatedFiles = files.filter(value => value.key !== file.key)
        setFiles(updatedFiles);
        props.onImagesSelected(updatedFiles);
      }}>
        <i className="fas fa-window-close"></i>
        </span>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="imageUploader">
      <div {...getRootProps({ className: 'imageUploader__dropzone' })}>
        <input {...getInputProps()} />
        <p>クリックして画像を選択<br />（あるいはここにファイルをドロップ）</p>
      </div>
      <aside className="imageUploader__preview">
        {thumbs}
      </aside>
    </section>
  );
}