import React from 'react';
import { useFormik } from 'formik';
import {ReactComponent as SearchIcon} from '@assets/icons/search-outline.svg';

import styles from './SearchForm.module.scss';

const SearchForm = ({ className: classes }) => {
  const formik = useFormik({
     initialValues: {
       author: '',
     },
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });

  return <form onSubmit={formik.handleSubmit} className={`${styles.form} ${classes}`}>
    <SearchIcon className={styles.icon} />
    <input
      id="author"
      name="author"
      type="text"
      placeholder="Search for authors"
      className={styles.field}
      onChange={formik.handleChange}
      value={formik.values.author}
    />
    <button className={styles.submit} type="submit">Search</button>
  </form>
}

export default SearchForm;
