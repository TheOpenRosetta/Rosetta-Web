import React from 'react';
import { Link } from "react-router-dom";
import styles from './SearchUsers.module.scss';
import { FindCommonAuthors } from '../../../utils/common';
import { dummySearchResults } from './dummydata';
const SearchUsers = () => {
  const commonAuthors = FindCommonAuthors(dummySearchResults, 'authors_names');
  console.log(commonAuthors);
  return <div className={styles.users}>
    {
      commonAuthors.map(author => <Link to={`/user/${author.id}`} className={styles.usersItem} key={author.id}>
        <div className={styles.info}>
          <div className={styles.name}>{author.authors_names}</div>
          <div className={styles.publications}>{author.occurrence} times occurrence</div>
        </div>
      </Link>)
    }
  </div>;
}

export default SearchUsers;