import React from 'react';
import { Link } from "react-router-dom";
import styles from './PaperPreview.module.scss';

const PaperPreview = () => {
  const data = {
    title: 'New Measurement for Impact in Academic Research.',
    authors: ['Paola Peynetti Velázquez', 'Mutheiwana Dombo', 'Paola Peynetti Velázquez'],
    date: 1633974335016,
    shortText: 'He option of phone and video visits has expanded access to vulnerable population during a time opportunities…',
    likes: 84,
    comments: 45,
    value: 1984,
    delta: 7,
    apy: 7.5,
  };
  return <div className={styles.paper}>
    <div className={styles.title}>
      <Link to="/">{data.title}</Link>
    </div>
    <div className={styles.subtitle}>
      <div className={styles.author}>{data.authors[0]},</div>
      {
        data.authors.length > 1 && <div className={styles.authorMore}>+{data.authors.length - 1} authors</div>
      }
      <div className={styles.date}>{data.authors[0]},</div>
    </div>
    <div className={styles.preview}>
      {data.shortText} <Link to="/">Expand</Link>
    </div>
    <div className={styles.footer}></div>
  </div>;
}

export default PaperPreview;
