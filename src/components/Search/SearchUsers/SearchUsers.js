import React from 'react';
import Avatar from '@components/Avatar';
import { Link } from "react-router-dom";
import styles from './SearchUsers.module.scss';
import { priceFormat } from '@utils/numbers';

const SearchUsers = ({ users }) => {
  return <div className={styles.users}>
    {
      users.map(user => <Link to={`/user/${user.authorid}`} className={styles.usersItem} key={user.authorid}>
        <div className={styles.photo}>
          <Avatar src={user.photo} title={user.lastName} size="sm" />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{user.firstName} {user.lastName}</div>
          <div className={styles.text}>
            {user.publications} Publications. {priceFormat(user.impactScore)}. {user.categories.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('.')}
          </div>
        </div>
      </Link>)
    }
  </div>;
}

export default SearchUsers;
