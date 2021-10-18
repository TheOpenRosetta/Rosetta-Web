import React from 'react';
import Button from '@components/Button';

import {ReactComponent as CloseIcon}  from '@assets/icons/close-outline.svg'
import styles from './PapersItem.module.scss';

const PapersItem = ({ data, className, processedPaper, approve, remove }) => {
  const flag = processedPaper(data.paperid);
  return <div className={`${styles.papersItem} ${className}`}>
    <div className={styles.content}>
      <div className={styles.score}><span className={styles.scoreHeading}>ImpactScore</span> <span className={styles.scoreValue}>{data.impactScore}</span></div>
      <div className={styles.title}>{data.title}</div>
      <div className={styles.authors}>{data.authors[0]}, {data.authors[1]} {new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(data.timestamp)}</div>
    </div>
    <div className={styles.actions}>
      { flag === 'should' && <Button classes={styles.btn} kind="disabled" size="sm">I am the author</Button> }
      { flag === 'incorrect' && <Button classes={styles.close} kind="disabled" size="sm"><CloseIcon/></Button> }
      {
        !flag && <>
          <Button classes={styles.btn} onClick={approve} kind="fill" size="sm">I am the author</Button>
          <Button classes={styles.close} onClick={remove} kind="bordered" size="sm"><CloseIcon/></Button>
        </>
      }
    </div>
  </div>;
}

export default PapersItem;
