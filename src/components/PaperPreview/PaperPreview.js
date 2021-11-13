import React from 'react';
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
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
      <Link to={`/paper/${data.id}`}>{data.title}</Link>
    </div>
    <div className={styles.subtitle}>
      {
        data.authors_names && <>
          <div className={styles.author}>{data.authors_names[0]},</div>
          {
            data.authors_names.length > 1 && <div className={styles.authorMore}>+{data.authors_names.length - 1} authors</div>
          }
        </>
      }
      { data.publisher && <div className={styles.author}>{data.publisher}</div> }
      <div className={styles.date}>{DateTime.fromISO(data.date).toFormat('dd LLL yyyy')}</div>
    </div>
    {
      data.preview && <div className={styles.preview}>
        {data.preview} <Link to={`/paper/${data.id}`}>Expand</Link>
      </div>
    }
    <div className={styles.footer}>
      <div className={styles.comments}>
        <Link to={`${data.id}/comments`}>
          <CommentIcon />
          {data.comments || 0}
        </Link>
      </div>
      <div className={styles.likes}>
        <button className={styles.likesBtn} onClick={like}>
          <LikeIcon />
          {data.likes || 0}
        </button>
      </div>
      { data.balance && <div className={styles.balance}>${data.balance}</div> }
      { data.delta && <div className={`${styles.delta} ${data.delta > 0 ? styles.deltaPlus : styles.deltaMinus}`}>({data.delta > 0 ? '+' : '-'}{percentFormat(data.delta)}%)</div> }
      { data.apy && <div className={styles.apy}>APY {percentFormat(data.apy)}%</div> }
    </div>
  </div>;
}

export default PaperPreview;
