import React from 'react';
import Area from '@components/Area';
import Avatar from '@components/Avatar';
import { priceFormat } from '@utils/numbers';

import AvatarImg from '@assets/avatar.png';
import {ReactComponent as PeopleIcon} from '@assets/icons/person-add-outline.svg';
import styles from './WeeklyStats.module.scss';

const WeeklyStats = () => {
  // TODO: get the data from API (in account info)
  const data = {
    read: {
      total: 540,
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
    },
    investors: {
      total: 32,
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
  };

  // Block Header
  const header = <div className={styles.header}>
    <div className={styles.title}>Weekly Stats</div>
  </div>;

  // Block Content
  const content = <div className={styles.content}>
    <div className={styles.block}>
      <span className={styles.blockCount}>{priceFormat(data.read.total)}</span>
      <span className={styles.blockSubtitle}>Total people read</span>
      <ul className={styles.blockUsers}>
        {
          data.read.people.map(item => <li key={item.userId} className={styles.blockUsersItem}>
            <Avatar src={AvatarImg} title={item.name} kind="bordered" size="sm" classes={styles.avatar} />
          </li>)
        }
        <li className={styles.blockUsersMore}>
          <PeopleIcon />
        </li>
      </ul>
    </div>
    <div className={styles.block}>
      <span className={styles.blockCount}>{priceFormat(data.investors.total)}</span>
      <span className={styles.blockSubtitle}>New investors</span>
      <ul className={styles.blockUsers}>
        {
          data.investors.people.map(item => <li key={`investor-${item.userId}`} className={styles.blockUsersItem}>
            <Avatar src={AvatarImg} title={item.name} kind="bordered" size="sm" classes={styles.avatar} />
          </li>)
        }
        <li className={styles.blockUsersMore}>
          <PeopleIcon />
        </li>
      </ul>
    </div>
  </div>

  return <Area header={header} content={content} classes={styles.area} />
}

export default WeeklyStats;
