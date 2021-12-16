import React from 'react';

import styles from '../FeedItem.module.scss';

// dummy data
import bgImg from '@assets/dummy/eye.jpg';

const Funding = ({ data, className }) => (
  <div className={`${styles.itemFunding} ${className}`}>
    <div className={styles.fundingImg}>
      <img src={data.image || bgImg} alt={data.msg} />
    </div>
    <div className={styles.fundingContent}>
      <div className={styles.fundingTitle}>
        {data.author}
      </div>
      <div className={styles.fundingText}>
        {data.msg}
      </div>
    </div>
  </div>
);

export default Funding;
