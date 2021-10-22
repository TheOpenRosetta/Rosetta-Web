import React, {useCallback, useState}  from 'react';
import {useDropzone} from 'react-dropzone';

import {ReactComponent as AddPhotoIcon} from '@assets/addPhoto.svg';

import styles from './AddUserPhotoForm.module.scss';

const AddUserPhotoForm = ({ action, className }) => {
  const [photo, setPhoto] = useState(null);
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setPhoto(URL.createObjectURL(file));
    action(file);
  }, [action])
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/jpg, image/jpeg, image/png, image/gif',
    maxFiles: 1
  })

  return <div {...getRootProps()} className={`${styles.dropzone} ${className}`}>
    <div className={styles.dropzoneImg} style={{backgroundImage: `url(${photo})`}}>
      {
        !photo && <AddPhotoIcon/>
      }
    </div>
    <div className={styles.dropzoneTitle}>Upload your image</div>
    <div className={styles.dropzoneText}>Drag and drop or blowse to choose a file</div>
    <input {...getInputProps()} />
    <div className={styles.dropzoneText}>PNG, JPG AND GIF Files are allowed</div>
  </div>
}

export default AddUserPhotoForm;
