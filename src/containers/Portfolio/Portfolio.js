import React from 'react';
import { Link } from "react-router-dom";
import Layout from '@components/Layout';
import {priceFormat, percentFormat} from '@utils/numbers';

import {ReactComponent as TicketIcon} from '@assets/ticket.svg';

import styles from './Portfolio.module.scss';

import AvatarImg from '@assets/avatar.png';

const user = {
  authorid: 111,
  photo: AvatarImg,
  firstName: 'Anthony',
  lastName: 'Ryan',
  description: 'Open academic. Working on what I love.',
  balance: 50000,
  monthlyYield: 15000,
  papers: [{
    paperId: 11,
    slug: 'impact_academic_research',
    title: 'New Measurement for Impact in Academic Research',
    tokens: {
      goal: 194,
      current: 15
    },
    balance: 50000,
    delta: 500
  },
  {
    paperId: 22,
    slug: 'impact_academic_research',
    title: 'New Measurement for Impact in Academic Research',
    tokens: {
      goal: 194,
      current: 15
    },
    balance: 50000,
    delta: 500
  },
  {
    paperId: 33,
    slug: 'impact_academic_research',
    title: 'New Measurement for Impact in Academic Research',
    tokens: {
      goal: 194,
      current: 15
    },
    balance: 50000,
    delta: 500
  }]
}

const Portfolio = () => {
  return <Layout format="full" navigation={true}>
    <div className={styles.portfolio}>
      <aside className={styles.profile}>
        <div className={styles.user}>
          <img className={styles.photo} src={user.photo} alt={`${user.firstName} ${user.lastName}`} />
          <div className={styles.userInfo}>
            <div className={styles.name}>{user.firstName} {user.lastName}</div>
            <div className={styles.description}>{user.description}</div>
          </div>
        </div>
        <div className={styles.groups}>
          <div className={`${styles.group} ${styles.balance}`}>
            <div className={styles.groupValue}>${priceFormat(user.balance)}</div>
            <div className={styles.groupText}>Portfolio balance</div>
          </div>
          <div className={`${styles.group} ${styles.yield}`}>
            <div className={styles.groupValue}>${priceFormat(user.monthlyYield)}</div>
            <div className={styles.groupText}>Monthly yield</div>
          </div>
          <div className={`${styles.group} ${styles.papersOwned}`}>
            <div className={styles.groupValue}>{user.papers.length}</div>
            <div className={styles.groupText}>Papers Owned</div>
          </div>
        </div>
      </aside>
      <div className={styles.data}>
        <div className={styles.graph}></div>
        <div className={styles.papers}>
          {
            user.papers.map(paper => <div className={styles.paper} key={paper.paperId}>
              <div className={styles.paperInfo}>
                <Link to={paper.slug} className={styles.paperTitle}>{paper.title}</Link>
                <div className={styles.paperBalance}>${priceFormat(user.balance)} <span className={`${styles.delta} ${paper.delta > 0 ? styles.deltaPlus : styles.deltaMinus}`}>({paper.delta > 0 ? "+" : "-"}{percentFormat(paper.delta)}%)</span></div>
              </div>
              <div className={styles.paperTokens}>
                <TicketIcon /> <span className={styles.paperTokensCurrent}>{paper.tokens.current}/</span><span className={styles.paperTokensGoal}>{paper.tokens.goal} Tokens</span>
              </div>
            </div>)
          }
        </div>
      </div>
    </div>
  </Layout>
}

export default Portfolio;
