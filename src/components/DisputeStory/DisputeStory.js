import React from 'react';
import { DateTime } from 'luxon';
import CommentForm from '@forms/CommentForm';

import styles from './DisputeStory.module.scss';

import {ReactComponent as AlertIcon} from '@assets/icons/alert-circle-outline.svg';

const DisputeStory = ({ paper }) => {
  return <>
    <div className={styles.date}>{DateTime.fromISO(paper.date).toFormat('MMM-dd-yyyy')}</div>
    <div className={styles.title}>{paper.title}</div>
    {
      paper.authors.length > 0 && <div className={styles.authors}>By {paper.authors.map(item => item.name).join(', ')}</div>
    }
    <div className={styles.version}>V{paper.version}</div>
    <div className={styles.separator}>
      <hr/>
      <span><AlertIcon /> 0 Disputes</span>
    </div>
    <div className={styles.form}>
      <CommentForm />
    </div>
    <div className={styles.comments}>

    </div>
  </>
}

export default DisputeStory;
