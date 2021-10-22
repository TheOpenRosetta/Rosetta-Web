import React from 'react';
import {
  useHistory
} from "react-router-dom";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  addSearchText,
} from '@services/Search/searchSlice';
import {ReactComponent as SearchIcon} from '@assets/icons/search-outline.svg';

import styles from './SearchForm.module.scss';

const SearchForm = ({ className: classes }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
     initialValues: {
       search: '',
     },
     onSubmit: (values) => {
       dispatch(addSearchText(values.search));
       history.push("/search");
     },
   });

  return <form onSubmit={formik.handleSubmit} className={`${styles.form} ${classes}`}>
    <SearchIcon className={styles.icon} />
    <input
      id="search"
      name="search"
      type="text"
      placeholder="Search for authors"
      className={styles.field}
      onChange={formik.handleChange}
      value={formik.values.search}
    />
    <button className={styles.submit} type="submit">Search</button>
  </form>
}

export default SearchForm;
