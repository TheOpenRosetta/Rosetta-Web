import React from 'react';
import Player from '@components/Player';

import styles from '../FeedItem.module.scss';

// dummy data
import podcastFile from '@assets/dummy/podcast.mp3';

const Podcast = ({ data, className }) => (
  <div className={`${styles.itemPodcast} ${className}`}>
    <div className={styles.podcastText}>{data.msg}</div>
    <div className={styles.podcast}>
      <Player file={data.file || podcastFile} />
    </div>
  </div>
);

export default Podcast;
