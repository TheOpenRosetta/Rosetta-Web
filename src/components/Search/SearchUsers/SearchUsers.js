import React from 'react';
import { Link } from "react-router-dom";
import Avatar from '@components/Avatar';
import styles from './SearchUsers.module.scss';
import { FindCommonAuthors } from '../../../utils/common';
import { useSelector } from 'react-redux';
import {selectSearchResult} from '@services/Search/searchSlice';

import DummyUserPhoto from '@assets/dummy/user.png';

const SearchUsers = () => {
  const searchResult = useSelector(selectSearchResult);
  const commonAuthors = FindCommonAuthors(searchResult, 'authors_names', 'authors_ids');

  return <div className={styles.users}>
    {
      commonAuthors.map((author, index) => <Link to={`/user/${author.authors_names.split(" ").join("_")}_${author.authors_ids}`} key={author.authors_ids + "" + index} className={styles.usersItem}>
        <div className={styles.photo}>
          <Avatar src={DummyUserPhoto} title={author.authors_names} size="sm" />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{author.authors_names}</div>
          <div className={styles.text}>{author.occurrence} times occurrence</div>
        </div>
      </Link>)
    }
  </div>;
}

export default SearchUsers;
