import React, { useState } from 'react';
import Button from '@components/Button';
import { useFormik } from 'formik';

// TODO: remove after connection with API
import data from '@components/Publish/Citation/data.json';

import {ReactComponent as SearchIcon} from '@assets/icons/search-outline.svg';

import styles from './SearchCitationForm.module.scss';

const SearchCitationForm = ({ className: classes, add }) => {
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

  const addCitation = (id) => {
    const citation = result.filter(item => item.id === id)[0];
    add(citation);
  }

  return <form onSubmit={formik.handleSubmit} className={`${styles.form} ${classes}`}>
    <div className={styles.group}>
      <SearchIcon className={styles.icon} />
      <input
        id="search"
        name="search"
        type="text"
        placeholder="Search for citations"
        className={styles.field}
        onChange={formik.handleChange}
        value={formik.values.search}
      />
      <button className={styles.submit} type="submit">Search</button>
    </div>
    <div className={styles.result}>
      {
        result.length > 0 && <div className={styles.resultTitle}>Search result</div>
      }
      {
        result.length > 0 && result.map(item => (
          <div className={styles.resultItem} key={item.id}>
            <div className={styles.resultContent}>
              {item.authors.join(',')} ({item.year}). <span>{item.title}</span>. {item.published}. <span>{item.code}</span>
            </div>
            <div className={styles.resultActions}>
              <Button classes={styles.itemRemove} size="md" kind="primary" type="button" onClick={() => addCitation(item.id)}>Add</Button>
            </div>
          </div>
        ))
      }
    </div>
  </form>
}

export default SearchCitationForm;
