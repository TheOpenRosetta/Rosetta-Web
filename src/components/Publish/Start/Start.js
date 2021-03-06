import React, { useState } from 'react';
import Modal from 'react-modal';
import UploadPaperForm from '@forms/UploadPaperForm';
import UploadPaperInfoForm from '@forms/UploadPaperInfoForm';
import { useSelector } from 'react-redux';
import {
  selectFiles,
} from '@services/Publish/publishSlice';

import styles from './Start.module.scss';

import {ReactComponent as DownloadIcon}  from '@assets/icons/download-outline.svg'

Modal.setAppElement('#root');

const Start = () => {
  const files = useSelector(selectFiles);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return <div className={styles.start}>
    <div className={styles.heading}>Upload Paper</div>
    {
      files.length > 0 ? <>
          <UploadPaperInfoForm />
      </> : <>
        <div className={styles.zone} onClick={openModal}>
          <div className={styles.zoneIcon}><DownloadIcon /></div>
          <div className={styles.zoneTitle}>Import any files</div>
          <div className={styles.zoneText}>docx, .epub, .html, .md, .odt, .txt, .xml, or .tex</div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          className="modal"
          onRequestClose={closeModal}
          contentLabel="Upload Paper"
        >
          <UploadPaperForm close={closeModal} />
        </Modal>
      </>
    }
  </div>;
}

export default Start;
