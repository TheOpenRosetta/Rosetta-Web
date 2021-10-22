import React from 'react';
import { Link } from "react-router-dom";
import { percentFormat } from '@utils/numbers';
import styles from './PaperPreview.module.scss';

import {ReactComponent as CommentIcon} from '@assets/customIcons/coma.svg';
import {ReactComponent as LikeIcon} from '@assets/customIcons/thumbs-up.svg';

const PaperPreview = ({ data }) => {
  const like = () => {
    console.log('LIKE');
  }

  return <div className={styles.paper}>
    <div className={styles.title}>
      <Link to={`/paper/${data.slug}`}>{data.title}</Link>
    </div>
    <div className={styles.subtitle}>
      <div className={styles.author}>{data.authors[0]},</div>
      {
        data.authors.length > 1 && <div className={styles.authorMore}>+{data.authors.length - 1} authors</div>
      }
      <div className={styles.date}>{data.timestamp}</div>
    </div>
    <div className={styles.preview}>
      {data.preview} <Link to={`/paper/${data.slug}`}>Expand</Link>
    </div>
    <div className={styles.footer}>
      <div className={styles.comments}>
        <Link to={`${data.slug}/comments`}>
          <CommentIcon />
          {data.comments}
        </Link>
      </div>
      <div className={styles.likes}>
        <button className={styles.likesBtn} onClick={like}>
          <LikeIcon />
          {data.likes}
        </button>
      </div>
      <div className={styles.balance}>${data.balance}</div>
      <div className={`${styles.delta} ${data.delta > 0 ? styles.deltaPlus : styles.deltaMinus}`}>({data.delta > 0 ? '+' : '-'}{percentFormat(data.delta)}%)</div>
      <div className={styles.apy}>APY {percentFormat(data.apy)}%</div>
    </div>
  </div>;
}

export default PaperPreview;
