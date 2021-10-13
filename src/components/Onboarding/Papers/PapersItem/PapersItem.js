import React from 'react';
import Button from '@components/Button';

import {ReactComponent as CloseIcon}  from '@assets/icons/close-outline.svg'
import styles from './PapersItem.module.scss';

const PapersItem = ({ data, className }) => {
  return <div className={`${styles.papersItem} ${className}`}>
    <div className={styles.content}>
      <div className={styles.score}><span className={styles.scoreHeading}>ImpactScore</span> <span className={styles.scoreValue}>{data.impactScore}</span></div>
      <div className={styles.title}>{data.title}</div>
      <div className={styles.authors}>{data.authors[0]}, {data.authors[1]} {data.timestamp}</div>
    </div>
    <div className={styles.actions}>
      <Button classes={styles.btn} kind="fill" size="sm">I am the author</Button>
      <Button classes={styles.close} kind="bordered" size="sm"><CloseIcon/></Button>
    </div>
  </div>;
}

export default PapersItem;
