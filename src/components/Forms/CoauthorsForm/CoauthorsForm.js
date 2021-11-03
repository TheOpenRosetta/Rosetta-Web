import React, { useState } from 'react';
import Button from '@components/Button';
import { useFormik } from 'formik';

// TODO: remove after connection with API
import data from './data.json';

import {ReactComponent as SearchIcon} from '@assets/icons/search-outline.svg';
import {ReactComponent as PlusIcon}  from '@assets/icons/plus-outline.svg';

import styles from './CoauthorsForm.module.scss';

const CoauthorsForm = ({ className: classes, add }) => {
  const [result, setResult] = useState([]);
  const formik = useFormik({
     initialValues: {
       search: '',
     },
     onSubmit: (values) => {
       searchRequest(values.search);
     },
   });

  const searchRequest = () => {
    // make connection with API
    setResult(data.list);
  }

  const addCoauthor = (item) => {
    add(item);
  }

  return <form onSubmit={formik.handleSubmit} className={`${styles.form} ${classes}`}>
    <div className={styles.group}>
      <SearchIcon className={styles.icon} />
      <input
        id="search"
        name="search"
        type="text"
        placeholder="Search for co-authors"
        className={styles.field}
        onChange={formik.handleChange}
        value={formik.values.search}
      />
      <button className={styles.submit} type="submit">
        <SearchIcon className={styles.icon} />
        <span>Search</span>
      </button>
    </div>
    <div className={styles.result}>
      {
        result.length > 0 && <div className={styles.resultTitle}>Search result ({result.length} authors)</div>
      }
      {
        result.length > 0 && result.map(item => (
          <div className={styles.resultItem} key={item.email}>
            <div className={styles.resultContent}>
              {item.firstName} {item.lastName} <span>({item.email})</span>
            </div>
            <div className={styles.resultActions}>
              <Button classes={styles.resultItemAdd} size="md" kind="link" type="button" onClick={() => addCoauthor(item)}>
                <PlusIcon />
              </Button>
            </div>
          </div>
        ))
      }
    </div>
  </form>
}

export default CoauthorsForm;
