import React from 'react';
import { Link } from "react-router-dom";
import styles from './SearchUsers.module.scss';
import { FindCommonAuthors } from '../../../utils/common';
import { useSelector } from 'react-redux';
import {selectSearchResult} from '@services/Search/searchSlice';

const SearchUsers = () => {
  const searchResult = useSelector(selectSearchResult);
  const commonAuthors = FindCommonAuthors(searchResult, 'authors_names', 'authors_ids');

  return <div className={styles.users}>
    {
      commonAuthors.map((author, index) => <Link to={`/user/${author.authors_names.split(" ").join("_")}_${author.authors_ids}`} key={author.authors_ids + "" + index} className={styles.usersItem}>
        <div className={styles.info}>
          <div className={styles.name}>{author.authors_names}</div>
          <div className={styles.publications}>{author.occurrence} times occurrence</div>
        </div>
      </Link>)
    }
  </div>;
}

export default SearchUsers;