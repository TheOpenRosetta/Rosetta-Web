import React from 'react';
import PaperPreview from '@components/PaperPreview';
import {ReactComponent as PaperIcon} from '@assets/lightIcons/Document.svg';

import styles from '../FeedItem.module.scss';

const Paper = ({ data, className }) => (
  <div className={`${styles.itemPaper} ${className}`}>
    <div className={styles.paperText}>
      <PaperIcon/> {data.msg}
    </div>
    <div className={styles.paperContent}>
      <PaperPreview data={data.paper} />
    </div>
  </div>
);

export default Paper;
