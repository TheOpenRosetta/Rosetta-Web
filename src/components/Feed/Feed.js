import React from 'react';
import Area from '@components/Area';
// import FeedItem from './FeedItem';

import styles from './Feed.module.scss';

const Feed = () => {
  // const data = [
  //   {
  //     type: "paper",
  //     postId: 1111,
  //     author: {
  //       photo: '',
  //       name: 'Anthony Rayan',
  //       nickname: 'anthony'
  //     },
  //     timestamp: 1633974335016,
  //   },
  //   {
  //     type: "text",
  //     postId: 1223,
  //     author: {
  //       photo: '',
  //       name: 'Anthony Rayan',
  //       nickname: 'anthony'
  //     },
  //     timestamp: 1633974727314,
  //   },
  //   {
  //     type: "text",
  //     postId: 1223,
  //     author: {
  //       photo: '',
  //       name: 'Anthony Rayan',
  //       nickname: 'anthony'
  //     },
  //     timestamp: 1633974727314,
  //   }
  // ];
  const header = <div className={styles.header}>Home</div>;
  // const content = <div className={styles.feedList}>
  //   <FeedItem className={styles.feedItem} />
  // </div>
  return <div className={styles.feed}>
    <Area header={header} />
  </div>;
}

export default Feed;
