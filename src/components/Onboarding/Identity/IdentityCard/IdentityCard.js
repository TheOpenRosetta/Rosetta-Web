import React from 'react';
import Button from '@components/Button';
import { DateTime } from "luxon";
import {priceFormat} from '@utils/numbers';
import styles from './IdentityCard.module.scss';

const IdentityCard = ({ data, claimed, toggleClaimed }) => {
  return <div className={styles.card}>
    <header className={styles.header}>
      <div className={styles.photo}>
        <img className={styles.avatar} src={data.photo} alt={`${data.firstName}_${data.lastName}`}/>
      </div>
      <div className={styles.user}>
        <div className={styles.row}>
          <div className={styles.info}>
            <div className={styles.name}>{data.firstName} {data.lastName}</div>
            <div className={styles.institute}>{data.institute}</div>
          </div>
          {
            claimed ?
            <Button classes={styles.btn} kind="bordered" size="sm" onClick={() => toggleClaimed(data.authorid)}>Unclaim</Button>
            :
            <Button classes={styles.btn} kind="outline" size="sm" onClick={() => toggleClaimed(data.authorid)}>Claim</Button>
          }
        </div>
        <div className={styles.row}>
          <div className={styles.tokens}>
            <div className={styles.tokensValue}>${priceFormat(data.tokens.once)}</div>
            <div className={styles.tokensSubtitle}>Once off accrued tokens:</div>
          </div>
          <div className={styles.tokens}>
            <div className={styles.tokensValue}>${priceFormat(data.tokens.monthly)}</div>
            <div className={styles.tokensSubtitle}>Monthly Ongoing Tokens:</div>
          </div>
        </div>
      </div>
    </header>
    <div className={styles.body}>
      <ul className={styles.papers}>
        {
          data.papers.map((item, index) => <li className={styles.paper} key={item.impactScore + index}>
          <div className={styles.score}>ImpactScore <span>{item.impactScore}</span></div>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.authors}>{item.authors[0]}, {item.authors[1]} {DateTime.fromMillis(item.timestamp).toFormat('dd LLL yyyy')}</div>
        </li>)
        }
      </ul>
    </div>
  </div>;
}

export default IdentityCard;
