import React from 'react';
import Area from '@components/Area';

import styles from './Feed.module.scss';

const Feed = ({ data }) => {
  const header = <div className={styles.header}>Home</div>;
  return <div className={styles.feed}>
    <Area header={header} />
  </div>;
}

export default Feed;
