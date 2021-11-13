import React from 'react';
import { DateTime } from 'luxon';

import styles from './PDFComments.module.scss';

const updateHash = (highlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

const PDFComments = ({ highlights = [] }) => {
  return <ul className={styles.comments}>
    {highlights.map((highlight, index) => (
      <li
        key={index}
        className={styles.commentsItem}
        onClick={() => {
          updateHash(highlight);
        }}
      >
        <div className={styles.commentsUserAvatar}>
          <img src={highlight.author.avatar} alt={highlight.author.name} />
        </div>
        <div className={styles.commentsItemContent}>
          <header className={styles.commentsItemHeader}>
            <div className={styles.commentsUserName}>{highlight.author.name}</div>
            <div className={styles.commentsItemDate}>{DateTime.fromMillis(highlight.date).toFormat('MMM dd, HH:MM')}</div>
          </header>
          <div className={styles.commentsItemBody}>
            {highlight.comment.text}
          </div>
        </div>
      </li>
    ))}
  </ul>
};

export default PDFComments;
