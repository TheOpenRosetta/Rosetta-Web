import React from 'react';
import {
  useParams
} from "react-router-dom";
import Header from '@components/Header';
import Button from '@components/Button';
import Avatar from '@components/Avatar';

import AvatarImg from '@assets/avatar.png';
import {ReactComponent as PeopleIcon} from '@assets/icons/person-add-outline.svg';

import styles from './Paper.module.scss';

const authors = {
  total: 5,
  people: [
    {
      userId: 1,
      photo: AvatarImg,
      name: 'Anthony Rayan'
    },
    {
      userId: 2,
      photo: AvatarImg,
      name: 'Anthony Rayan'
    },
    {
      userId: 3,
      photo: AvatarImg,
      name: 'Anthony Rayan'
    }
  ],
}

const Paper = () => {
  const { paperId } = useParams();
  console.log(paperId);
  return <div className={styles.paper}>
    <Header className={styles.paperHeader} />
    <div className={styles.paperTop}>
      <div className="container">
        <div className={styles.paperTopContent}>
          <div className={styles.date}>Aug-31-2021</div>
          <div className={styles.title}>Arweave: A Protocol for Economically Sustainable Information Permanence</div>
          <div className={styles.authors}>By Sam Williams, Viktor Diordiiev, Lev Berman, India Raybould, Ivan Uemlianin</div>
          <div className={styles.version}>V1.1</div>
        </div>
        <div className={styles.paperActions}>

        </div>
        <div className={styles.paperBadge}>
          <div className={styles.paperBadgeTitle}>Price</div>
          <div className={styles.paperBadgePrice}>$1984 <span className={`${styles.paperBadgePricePercent}`}>(+7.00%)</span></div>
          <div className={styles.paperBadgeApy}>APY: 7.5%</div>
          <div className={styles.paperBadgeTitle}>Owned by</div>
          <ul className={styles.paperBadgeUsers}>
            {
              authors.people.map(item => <li key={`investor-${item.userId}`} className={styles.paperBadgeUsersItem}>
                <Avatar src={AvatarImg} title={item.name} kind="bordered" size="sm" classes={styles.avatar} />
              </li>)
            }
            <li className={styles.paperBadgeUsersMore}>
              <PeopleIcon />
            </li>
          </ul>
          <Button classes={styles.paperBadgeBtn} type="button" size="sm" kind="fill">Buy now</Button>
        </div>
      </div>
    </div>
    <div className="container">
      <div className={styles.paperContent}>
        <div className={styles.paperContentAbstract}>

        </div>
        <div className={styles.paperContentComments}>

        </div>
      </div>
      <div className={styles.paperIssues}>

      </div>
      <div className={styles.paperPagination}>

      </div>
    </div>
  </div>
}

export default Paper;
