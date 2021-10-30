import React, { useState, useCallback } from 'react';
import Area from '@components/Area';
import Button from '@components/Button';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import {
  setFiles,
} from '@services/Publish/publishSlice';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-back-outline.svg';
import {ReactComponent as DownloadIcon}  from '@assets/icons/download-outline.svg';
import {ReactComponent as AttachIcon} from '@assets/icons/attach-outline.svg';
import {ReactComponent as CloseIcon} from '@assets/icons/close-outline.svg';
import {ReactComponent as CheckmarkIcon}  from '@assets/icons/checkmark-outline.svg'

import styles from './PublishPaperForm.module.scss';

const PublishPaperForm = ({ close }) => {
  const [errors, setErrors] = useState('');
  const [formStep, setFormStep] = useState(0);
  const [files, saveFiles] = useState([]);
  const dispatch = useDispatch();

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
    accept: '.doc, .docx, .epub, .html, .md, .odt, .txt, .xml, .tex',
  });

  const formik = useFormik({
    initialValues: {
      files: [],
    },
    onSubmit: () => {
      if (files.length === 0) {
        setErrors('Upload your files');
      } else if (errors.length === 0) {
        setFormStep(1);
      }
    },
  });

  const complete = () => {
    dispatch(setFiles(files));
  }

  const removeFile = file => () => {
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)
    saveFiles(newFiles)
  };

  const header = <div className={styles.header}>Upload Paper</div>

  const content = <div className={styles.content}>
    <form onSubmit={formik.handleSubmit} className={`${styles.form}`}>
      <div {...getRootProps()} className={styles.dropzone}>
        <div className={styles.dropzoneIcon}><AttachIcon /></div>
        <div className={styles.dropzoneTitle}>Click here to drag in file and upload</div>
        <div className={styles.dropzoneText}>or</div>
        <div className={styles.dropzoneBtn}>Click here to upload a entire dierectory</div>
        <input {...getInputProps()} />
      </div>
      {
        files.length > 0 && <div className={styles.list}>
          <div className={styles.listTitle}>Uploaded file</div>
          {
            files.map(file => (
              <div key={file.path} className={styles.listItem}>
                <span className={styles.listItemName}>{file.name}</span>
                <span className={styles.listItemBadge}>document</span>
                <button className={styles.listItemRemove} onClick={removeFile(file)}>
                  <CloseIcon/>
                </button>
              </div>
            ))
          }
        </div>
      }
      { errors && <div className={styles.dropzoneErrors}>{errors}</div> }
      <div className={styles.actions}>
        <Button classes={styles.cancel} size="md" kind="outline" type="reset" onClick={close}>Cancel</Button>
        <Button classes={styles.import} size="md" kind="fill" type="submit">
          <DownloadIcon /> Import
        </Button>
      </div>
    </form>
  </div>

  const confirmContent = <div className={styles.success}>
    <div className={styles.successContent}>
      <div className={styles.successContentIcon}><CheckmarkIcon /></div>
      <div className={styles.successContentTitle}>Import succeeded</div>
      <div className={styles.successContentText}>YSome metadata was found in the imported document that you may wish to apply to your Pub. You can always change these values later.</div>
    </div>
    <div className={`${styles.actions} ${styles.actionsSuccess}`}>
      <Button classes={styles.back} size="md" kind="link" type="button" onClick={() => setFormStep(0)}><ArrowBackIcon/>Back to files</Button>
      <Button classes={styles.cancel} size="md" kind="outline" type="reset" onClick={close}>Cancel</Button>
      <Button classes={styles.completed} size="md" kind="completed" type="button" onClick={complete}>
        Complete import <CheckmarkIcon />
      </Button>
    </div>
  </div>

  return <Area header={header} content={formStep ? confirmContent : content} headerClasses={styles.modalHeader} />
}

export default PublishPaperForm;
