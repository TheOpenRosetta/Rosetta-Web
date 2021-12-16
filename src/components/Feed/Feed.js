import React from 'react';
import Area from '@components/Area';
import FeedItem from './FeedItem';
import feedData from '@dataset/feed.json';

import styles from './Feed.module.scss';

const Feed = () => {
  const header = <div className={styles.header}>Home</div>;
  const content = feedData.feed && feedData.feed.length > 0 && <div className={styles.feedList}>
    {
      feedData.feed.map(item => <FeedItem className={styles.feedItem} key={item.timestamp} data={item} />)
    }
  </div>

  const noContent = <div className={styles.feedList}>
    <div className={styles.empty}>Feed is empty yet</div>
  </div>

  return <div className={styles.feed}>
    <Area header={header} content={content || noContent} />
  </div>;
}

export default Feed;
