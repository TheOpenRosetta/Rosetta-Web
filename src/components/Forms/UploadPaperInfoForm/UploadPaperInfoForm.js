import React, { useState, useRef, useCallback } from 'react';
import Button from '@components/Button';
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import Modal from 'react-modal';
import {
  setPaperAttrs
} from '@services/Publish/publishSlice';

import {ReactComponent as AttachIcon} from '@assets/icons/attach-outline.svg';
import {ReactComponent as CloseIcon} from '@assets/icons/close-outline.svg';
import {ReactComponent as AddFileIcon} from '@assets/icons/file-add-outline.svg';
import {ReactComponent as NextIcon} from '@assets/icons/arrow-forward-outline.svg';
import {ReactComponent as LinkIcon} from '@assets/icons/link-2-outline.svg';

import 'react-tabs/style/react-tabs.css';
import styles from './UploadPaperInfoForm.module.scss';

resetIdCounter();

const UploadPaperInfoForm = ({ className: classes }) => {
  const dispatch = useDispatch();
  const [supplementaryMaterial, setSupplementaryMaterial] = useState(null);

  // Forms in tabs
  const [errors, setErrors] = useState('');
  const [materials, saveMaterials] = useState([]);
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
      saveMaterials(acceptedFiles)
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.zip',
  });

  const complete = () => {
    if (tabIndex) {
      if (transactionRef.current.value) {
        setSupplementaryMaterial({
          transactionID: transactionRef.current.value,
        });
        closeSupModal();
      } else {
        setTransactionError('Required field');
      }
    } else {
      if (materials.length > 0) {
        setSupplementaryMaterial({
          files: materials,
        });
        closeSupModal();
      } else {
        setErrors('Minimum 1 file');
      }
    }
  }

  const removeFile = file => () => {
    const newFiles = [...materials]
    newFiles.splice(newFiles.indexOf(file), 1)
    saveMaterials(newFiles)
  };

  // Tab index
  const [tabIndex, setTabIndex] = useState(0);

  // transactionID link
  const [transactionError, setTransactionError] = useState('');
  const transactionRef = useRef();

  // github link
  const [githubError, setGithubError] = useState('');
  const githubRef = useRef();

  // The first modal of uploading paper
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Modal of load supplementary material
  const [supModalIsOpen, setSupIsOpen] = useState(false);
  const openSupModal = () => setSupIsOpen(true);
  const closeSupModal = () => setSupIsOpen(false);

  const formik = useFormik({
     initialValues: {
       title: '',
       description: '',
       github: '',
     },
     onSubmit: (values) => {
       const result = {
         ...values,
         ...supplementaryMaterial
       }
       dispatch(setPaperAttrs(result));
     },
   });

   const githubSave = () => {
     const re = /(github.com)(\/)([^:/\s]+)/g;
     if (re.test(githubRef.current.value)) {
       setGithubError('');
       formik.setFieldValue('github', githubRef.current.value);
       closeModal();
     } else {
       setGithubError('It\'s not github link');
     }
   }

  return <form onSubmit={formik.handleSubmit} className={`${styles.form} ${classes}`}>
    <input
      id="title"
      name="title"
      type="text"
      placeholder="Add title of this pub"
      required
      className={`${styles.field} ${styles.fieldTitle}`}
      onChange={formik.handleChange}
      value={formik.values.title}
    />
    <input
      id="description"
      name="description"
      type="text"
      required
      placeholder="Add a description for this pub"
      className={styles.field}
      onChange={formik.handleChange}
      value={formik.values.description}
    />
  { formik.values.github && <div className={styles.github}>{formik.values.github}</div> }
  { supplementaryMaterial && <div className={styles.github}>Added supplementary materials</div> }
    <div className={styles.linksRow}>
      <button className={styles.linksItem} type="button" onClick={openModal}>
        <LinkIcon /> Add github link
      </button>
      <button className={styles.linksItem} type="button" onClick={openSupModal}>
        <AddFileIcon /> Supplementary material
      </button>
    </div>
    <div className={styles.heading}>Import succeeded</div>
    <div className={styles.text}>In this work we present the Arweave protocol, a new blockchain-like data structure called the blockweave. The protocol is designed to provide  and  on-chain data storage in a sustainable manner. The blockweave forms the underlying data structure of the permaweb - the array of data, websites, and decentralised applications hosted on the blockweave, accessible on normal web browsers.</div>

    <div className={styles.actions}>
      <Button classes={styles.btnNext} size="md" kind="link" type="submit">Next <NextIcon/></Button>
    </div>

    <Modal
      isOpen={modalIsOpen}
      className="modal"
      onRequestClose={closeModal}
      contentLabel="Upload Paper"
    >
      <div className={styles.modal}>
        <input
          id="github"
          name="github"
          type="text"
          ref={githubRef}
          placeholder="Add github link"
          className={styles.field}
          defaultValue=""
        />
      { githubError && <div className={styles.githubError}>{githubError}</div> }
      <div className={styles.modalActions}>
        <Button classes={styles.cancel} size="md" kind="outline" type="reset" onClick={closeModal}>Cancel</Button>
        <Button classes={styles.btnSave} size="md" kind="fill" type="button" onClick={githubSave}>Save</Button>
      </div>
      </div>
    </Modal>

    <Modal
      isOpen={supModalIsOpen}
      className="modal"
      onRequestClose={closeSupModal}
      contentLabel="Supplementary material"
    >
      <div className={styles.modal}>
        <div className={styles.modalTitle}>For upload supplementary material you can select file on your computer or provide the Arweave Transaction ID for your already uploaded file</div>
        <Tabs className={styles.tabs} selectedTabClassName={styles.tabActive} defaultIndex={tabIndex} onSelect={index => setTabIndex(index)}>
          <TabList className={styles.tabsList}>
            <Tab className={styles.tab}>File</Tab>
            <Tab className={styles.tab}>Transaction ID</Tab>
          </TabList>

          <TabPanel className={styles.tabPanel}>
            <div {...getRootProps()} className={styles.dropzone}>
              <div className={styles.dropzoneIcon}><AttachIcon /></div>
              <div className={styles.dropzoneTitle}>Click here to drag in file and upload</div>
              <div className={styles.dropzoneText}>or</div>
              <div className={styles.dropzoneBtn}>Click here to upload a entire dierectory</div>
              <input {...getInputProps()} />
            </div>
            {
              materials.length > 0 && <div className={styles.list}>
                <div className={styles.listTitle}>Uploaded file</div>
                {
                  materials.map(file => (
                    <div key={file.path} className={styles.listItem}>
                      <span className={styles.listItemName}>{file.name}</span>
                      <button className={styles.listItemRemove} onClick={removeFile(file)}>
                        <CloseIcon/>
                      </button>
                    </div>
                  ))
                }
              </div>
            }
            { errors && <div className={styles.dropzoneErrors}>{errors}</div> }
          </TabPanel>
          <TabPanel className={styles.tabPanel}>
            <input
              id="transaction"
              name="transaction"
              type="text"
              ref={transactionRef}
              placeholder="Add transaction ID"
              className={styles.field}
              defaultValue=""
            />
            { transactionError && <div className={styles.githubError}>{transactionError}</div> }
          </TabPanel>
        </Tabs>

        <div className={styles.modalActions}>
          <Button classes={styles.cancel} size="md" kind="outline" type="reset" onClick={closeSupModal}>Cancel</Button>
          <Button classes={styles.btnSave} size="md" kind="fill" type="button" onClick={complete}>Save</Button>
        </div>
      </div>
    </Modal>
  </form>
}

export default UploadPaperInfoForm;
