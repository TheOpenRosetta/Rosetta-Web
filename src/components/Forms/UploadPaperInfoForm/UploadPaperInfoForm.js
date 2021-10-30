import React, { useState, useRef } from 'react';
import Button from '@components/Button';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import {
  setPaperAttrs
} from '@services/Publish/publishSlice';

import {ReactComponent as EditIcon} from '@assets/icons/edit-2-outline.svg';
import {ReactComponent as NextIcon} from '@assets/icons/arrow-forward-outline.svg';
import {ReactComponent as LinkIcon} from '@assets/icons/link-2-outline.svg';

import styles from './UploadPaperInfoForm.module.scss';

const UploadPaperInfoForm = ({ className: classes }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [githubError, setGithubError] = useState('');
  const githubRef = useRef();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const formik = useFormik({
     initialValues: {
       title: '',
       description: '',
       github: '',
       note: 'By simon ware',
     },
     onSubmit: (values) => {
       dispatch(setPaperAttrs(values));
     },
   });

   const githubSave = () => {
     const re = /(github.com)(\/)([^:\/\s]+)/g;
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
  { formik.values.github && <div className={styles.github}>{formik.values.github}</div>}
    <div className={styles.linksRow}>
      <div className={styles.note}>
        <div className={styles.noteContent} suppressContentEditableWarning spellCheck={false} contentEditable={edit} onChange={formik.handleChange}>{formik.values.note}</div>
        <button className={styles.noteBtn} onClick={() => setEdit(!edit)} type="button"><EditIcon /></button>
      </div>
      <button className={styles.linksItem} type="button" onClick={openModal}>
        <LinkIcon /> Add github link
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
        <Button classes={styles.btnSave} size="md" kind="fill" type="button" onClick={githubSave}>Save</Button>
      </div>
    </Modal>
  </form>
}

export default UploadPaperInfoForm;
