import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import Modal from 'react-modal';
import Button from '@components/Button';
import Area from '@components/Area';
import SearchForm from '@forms/SearchForm';

import {ReactComponent as SearchIcon} from '@assets/icons/search-outline.svg';
import {ReactComponent as CloseIcon} from '@assets/icons/close-outline.svg';
import styles from './HeaderSearch.module.scss';

Modal.setAppElement('#root');

const HeaderSearch = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const header = <div className={styles.header}>
    <div className={styles.modalTitle}>Search</div>
    <button onClick={closeModal} className={styles.closeBtn}><CloseIcon /></button>
  </div>;
  const content = <div className={styles.content}>
    <SearchForm className={styles.searchFormModal} closeForm={() => setIsOpen(false)} />
  </div>;

  return <>
    <MediaQuery minWidth={1024}>
      <SearchForm className={styles.searchForm} />
    </MediaQuery>
    <MediaQuery maxWidth={1023}>
      <Button size="md" kind="link" classes={styles.searchBtn} onClick={openModal}>
        <SearchIcon />
      </Button>
      <Modal
        isOpen={modalIsOpen}
        className="modal"
        onRequestClose={closeModal}
        contentLabel="Search form"
      >
        <Area header={header} content={content} />
      </Modal>
    </MediaQuery>
  </>
}

export default HeaderSearch;
