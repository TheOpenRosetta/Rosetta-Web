import React, { useState, useEffect } from 'react';
import Area from '@components/Area';
import Loader from '@components/Loader';
import Button from '@components/Button';
import Modal from 'react-modal';
import SearchCitationForm from '@forms/SearchCitationForm';
import { useDispatch } from 'react-redux';
import {
    prevStep,
    setCitationIds
} from '@services/Publish/publishSlice';

import data from './data.json';

import styles from './Citation.module.scss';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-back-outline.svg';
import {ReactComponent as NextIcon} from '@assets/icons/arrow-forward-outline.svg';
import {ReactComponent as CloseIcon} from '@assets/icons/close-outline.svg';

Modal.setAppElement('#root');

const Citation = () => {
  const dispatch = useDispatch();
  const [citations, setCitations] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [error, setError] = useState('');

  // Getting citations from server
  useEffect(() => {
    // TODO: make API request instead of timeeout
    const citation = data.list.map(item => {
      return {
        ...item,
        weight: 10,
      }
    });
    setCitations(citation);
  }, []);

  const changeCitation = (value, id) => {
    const newCitation = citations.map(item => {
      item.id === id && (item.weight = Number(value));
      return item;
    })
    setCitations(newCitation);
  }

  const removeCitation = (id) => {
    const newCitation = citations.filter(item => item.id !== id);
    setCitations(newCitation);
  }

  const add = (item) => {
    const newItem = {
      ...item,
      weight: 10,
    }
    setCitations([...citations, newItem]);
  }

  const next = () => {
    const sumWeight = citations.reduce((prev, cur) => {
      prev += cur.weight;
      return prev;
    }, 0);

    sumWeight < 100 && setError('Summary weight can\'t be less than 100%');
    sumWeight > 100 && setError('Summary weight can\'t be more than 100%');

    const citationsIds = citations.reduce((prev, cur) => { prev.push(cur.id); return prev }, []);
    sumWeight === 100 && dispatch(setCitationIds(citationsIds));
  }

  const header = <div className={styles.modalHeader}>
    <div className={styles.modalTitle}>Citation</div>
    <button onClick={closeModal} className={styles.closeBtn}><CloseIcon /></button>
  </div>

  const content = <div className={styles.modalContent}>
    <SearchCitationForm add={add} />
  </div>

  return <>
    <div className={styles.citation}>
      <div className={styles.heading}>Citation</div>
      {
        !citations && <Loader />
      }
      {
        citations && (citations.length > 0 ?
          <div className={styles.citationList}>
            <div className={styles.citationListHeader}>
              <div className={styles.headerContent}>Automatic detected citation</div>
              <div className={styles.headerActions}>Weight</div>
            </div>
            {
              citations.map((item) => <div className={styles.item} key={item.id}>
                <div className={styles.itemContent}>
                  {item.authors.join(',')} ({item.year}). <span>{item.title}</span>. {item.published}. <span>{item.code}</span>
                </div>
                <div className={styles.itemActions}>
                  <Button classes={styles.itemRemove} size="md" kind="secondary" type="button" onClick={() => removeCitation(item.id)}><CloseIcon /></Button>
                  <div className={styles.itemField}>
                    <input type="number" step="1" min="0" max="100" value={item.weight} onChange={(e) => changeCitation(e.target.value, item.id)} />
                  </div>
                </div>
              </div>)
            }
          </div> :
          <div className={styles.citationsListEmpty}>No citations found</div>)
      }
      {
        error && <div className={styles.error}>{error}</div>
      }
      <Button classes={styles.add} size="md" kind="fill" type="button" onClick={openModal}>Add citation</Button>

      <Modal
        isOpen={modalIsOpen}
        className="modal"
        onRequestClose={closeModal}
        contentLabel="Citation"
      >
        <Area header={header} content={content} />
      </Modal>

      <div className={styles.actions}>
        <Button classes={styles.btnPrev} size="md" kind="link" type="reset" onClick={() => dispatch(prevStep())}><ArrowBackIcon/> Previous</Button>
        <Button classes={styles.btnNext} size="md" kind="link" type="button" onClick={next}>Next <NextIcon/></Button>
      </div>
    </div>
  </>;
}

export default Citation;
