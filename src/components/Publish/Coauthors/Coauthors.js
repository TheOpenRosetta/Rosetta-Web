import React, { useState } from 'react';
import Area from '@components/Area';
import Button from '@components/Button';
import CoauthorsForm from '@forms/CoauthorsForm';
import Modal from 'react-modal';
import AddCoAuthorForm from '@forms/AddCoAuthorForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  prevStep,
  selectCoAuthors,
  setCoAuthors
} from '@services/Publish/publishSlice';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-back-outline.svg';
import {ReactComponent as NextIcon} from '@assets/icons/arrow-forward-outline.svg';
import {ReactComponent as PlusIcon}  from '@assets/icons/plus-outline.svg';
import {ReactComponent as CloseIcon} from '@assets/icons/close-outline.svg';

import styles from './Coauthors.module.scss';

const Coauthors = () => {
  const defaultCoAuthors = useSelector(selectCoAuthors);
  const dispatch = useDispatch();
  const [authors, setAuthors] = useState(defaultCoAuthors);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [error, setError] = useState('');

  const addAuthor = (item) => {
    const coauthor = {
      ...item,
      weight: 50,
    }

    if (authors.filter(el => el.email === item).length > 0) {
      setError('Author with the email is added already');
    } else {
      setAuthors([...authors, coauthor]);
      setError('');
    }
    closeModal();
  }

  const removeAuthor = (email) => {
    const newAuthorsList = authors.filter(item => item.email !== email);
    setAuthors(newAuthorsList);
    setError('');
  }

  const changeWeight = (value, email) => {
    const newAuthorsList = authors.map(item => {
      item.email === email && (item.weight = Number(value));
      return item;
    });
    setAuthors([...newAuthorsList]);
    setError('');
  }

  const next = () => {
    if(authors.length === 0) {
      dispatch(setCoAuthors(authors));
      return;
    }

    const sumWeight = authors.reduce((prev, cur) => {
      prev += cur.weight;
      return prev;
    }, 0);

    sumWeight === 100 && dispatch(setCoAuthors(authors));
    sumWeight < 100 && setError('Summary weight can\'t be less than 100%');
    sumWeight > 100 && setError('Summary weight can\'t be more than 100%');
  }

  const header = <div className={styles.modalHeader}>Add new author</div>
  const content = <AddCoAuthorForm close={closeModal} add={addAuthor} />;

  return <div className={styles.coauthors}>
    <div className={styles.search}>
      <div className={styles.heading}>Co-authors</div>
      <CoauthorsForm add={addAuthor} />
      <Button classes={styles.btnNew} size="md" kind="secondary" type="button" onClick={openModal}>Add new author <PlusIcon/></Button>
    </div>
    <div className={styles.added}>
      <div className={styles.heading}>Added</div>
      <div className={styles.results}>
        {
          authors.length > 0 && <div className={styles.list}>
            <div className={styles.listHeader}>
              <div className={styles.listHeaderName}>Author name</div>
              <div className={styles.listHeaderWeight}>Weight</div>
            </div>
            {
              authors.map(item => (
                <div key={item.email} className={styles.listItem}>
                  <div className={styles.listItemName}>
                    {item.firstName} {item.lastName} <span>({item.email})</span>
                  </div>
                  <div className={styles.listItemField}>
                    <input type="number" step="1" min="0" max="100" value={item.weight} onChange={(e) => changeWeight(e.target.value, item.email)} />
                  </div>
                  <Button classes={styles.listItemRemove} size="md" kind="link" type="button" onClick={() => removeAuthor(item.email)}>
                    <CloseIcon />
                  </Button>
                </div>
              ))
            }
          </div>
        }
        {
          error && <div className={styles.error}>{error}</div>
        }
      </div>
      <div className={styles.actions}>
        <Button classes={styles.btnPrev} size="md" kind="link" type="reset" onClick={() => dispatch(prevStep())}><ArrowBackIcon/> Previous</Button>
        <Button classes={styles.btnNext} size="md" kind="link" type="button" onClick={next}>Next <NextIcon/></Button>
      </div>
    </div>
    <Modal
      isOpen={modalIsOpen}
      className="modal"
      onRequestClose={closeModal}
      contentLabel="Add co-authors"
    >
      <Area header={header} content={content} headerClasses={styles.modalHeader} contentClasses={styles.modalContent} />
    </Modal>
  </div>;
}

export default Coauthors;
