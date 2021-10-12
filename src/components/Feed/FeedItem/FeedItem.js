import React from 'react';
import Area from '@components/Area';

import styles from './FeedItem.module.scss';

const FeedItem = ({ data, className }) => {
  const content = <>

  </>;
  const footer = <>

  </>;

  return <div className={`${styles.item} ${className}`}>
    <Area content={content} footer={footer} />
  </div>;
};

export default FeedItem;
