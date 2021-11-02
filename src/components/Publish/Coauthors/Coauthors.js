import React, { useState } from 'react';
import Button from '@components/Button';
import CoauthorsForm from '@forms/CoauthorsForm';
import { useDispatch } from 'react-redux';
import {
  prevStep,
  setReseachFiles,
} from '@services/Publish/publishSlice';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-back-outline.svg';
import {ReactComponent as NextIcon} from '@assets/icons/arrow-forward-outline.svg';
import {ReactComponent as CloseIcon} from '@assets/icons/close-outline.svg';

import styles from './Coauthors.module.scss';

const Coauthors = () => {
  const dispatch = useDispatch();
  const [authors, setAuthors] = useState([]);

  const addAuthor = (item) => {
    const coauthor = {
      ...item,
      weight: 50,
    }
    setAuthors([...authors, coauthor]);
  }

  const removeAuthor = (email) => {
    const newAuthorsList = authors.filter(item => item.email !== email);
    setAuthors(newAuthorsList);
  }

  return <div className={styles.coauthors}>
    <div className={styles.search}>
      <div className={styles.heading}>Co-authors</div>
      <CoauthorsForm add={addAuthor} />
    </div>
    <div className={styles.added}>
      <div className={styles.heading}>Added</div>
      <div className={styles.results}>
        {
          authors.length > 0 && <div className={styles.list}>
            {
              authors.map(item => (
                <div key={item.email} className={styles.listItem}>
                  <span className={styles.listItemName}>{item.firstName} {item.lastName} ({item.email})</span>
                  <button className={styles.listItemRemove} onClick={() => removeAuthor(item.email)}>
                    <CloseIcon />
                  </button>
                </div>
              ))
            }
          </div>
        }
      </div>
      <div className={styles.actions}>
        <Button classes={styles.btnPrev} size="md" kind="link" type="reset" onClick={() => dispatch(prevStep())}><ArrowBackIcon/> Previous</Button>
        <Button classes={styles.btnNext} size="md" kind="link" type="button" onClick={() => {}}>Next <NextIcon/></Button>
      </div>
    </div>
  </div>;
}

export default Coauthors;
