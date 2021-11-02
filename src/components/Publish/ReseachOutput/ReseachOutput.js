import React, { useState, useCallback } from 'react';
import Button from '@components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import {
  selectStep,
  prevStep,
  setReseachFiles,
} from '@services/Publish/publishSlice';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-back-outline.svg';
import {ReactComponent as NextIcon} from '@assets/icons/arrow-forward-outline.svg';
import {ReactComponent as DownloadIcon}  from '@assets/icons/download-outline.svg';
import {ReactComponent as CloseIcon} from '@assets/icons/close-outline.svg';

import {ReactComponent as VideoIcon} from '@assets/icons/video-outline.svg';
import {ReactComponent as ImageIcon} from '@assets/icons/image-outline.svg';
import {ReactComponent as FileIcon} from '@assets/icons/file-outline.svg';

import styles from './ReseachOutput.module.scss';

const ReseachOutput = () => {
  const step = useSelector(selectStep);
  const dispatch = useDispatch();
  const [files, saveFiles] = useState([]);
  const [errors, setErrors] = useState('');

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length === 0) {
      setErrors('');
    }

    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === 'file-too-large') {
          setErrors(`Error: ${err.message}`);
        }

        if (err.code === 'file-invalid-type') {
          setErrors(`Error: ${err.message}`);
        }
      });
    });

    if (fileRejections.length === 0) {
      saveFiles(acceptedFiles)
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.jpg,.jpeg,.png,.gif,.mp4,.mov',
    maxFiles: 6,
  });

  const removeFile = file => () => {
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)
    saveFiles(newFiles)
  };

  const mediaIcon = (type) => {
    switch (type) {
      case 'video':
        return <VideoIcon />
      case 'image':
        return <ImageIcon />
      default:
        return <FileIcon />
    }
  }


  return <div className={styles.reseach}>
    <div className={styles.upload}>
      <div className={styles.heading}>Upload research output</div>
      <div {...getRootProps()} className={styles.dropzone}>
        <div className={styles.dropzoneIcon}><DownloadIcon /></div>
        <div className={styles.dropzoneTitle}>Drag and drop file</div>
        <div className={styles.dropzoneText}>or</div>
        <div className={styles.dropzoneBtn}>Browse file</div>
        <input {...getInputProps()} />
      </div>
    </div>
    <div className={styles.uploaded}>
      <div className={styles.heading}>Uploaded file</div>
      <div className={styles.results}>
        {
          files.length > 0 && <div className={styles.list}>
            {
              files.map(file => (
                <div key={file.path} className={styles.listItem}>
                  <span className={styles.listItemName}>{mediaIcon(file.type.split('/')[0])} {file.name}</span>
                  <span className={styles.listItemBadge}>{file.type.split('/')[0]}</span>
                  <button className={styles.listItemRemove} onClick={removeFile(file)}>
                    <CloseIcon/>
                  </button>
                </div>
              ))
            }
          </div>
        }
        { errors && <div className={styles.dropzoneErrors}>{errors}</div> }
      </div>
      <div className={styles.actions}>
        <Button classes={styles.btnPrev} size="md" kind="link" type="reset" onClick={() => dispatch(prevStep())}><ArrowBackIcon/> Previous</Button>
        <Button classes={styles.btnNext} size="md" kind="link" type="button" onClick={() => dispatch(setReseachFiles(files))}>Next <NextIcon/></Button>
      </div>
    </div>
  </div>;
}

export default ReseachOutput;
