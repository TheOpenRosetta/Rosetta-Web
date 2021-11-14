import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from '@components/Layout';
import {priceFormat, percentFormat} from '@utils/numbers';
import Chart from '@components/Chart';

import month from '@dataset/month.json';
import half from '@dataset/half.json';
import three from '@dataset/three.json';
import year from '@dataset/year.json';

import { useSelector } from 'react-redux';
import {
  selectUser,
} from '@services/Auth/authSlice';

import {ReactComponent as TicketIcon} from '@assets/customIcons/ticket.svg';

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
  const userData = useSelector(selectUser);
  const [key, setKey] = useState('month');
  const [data, setData] = useState([]);

  useEffect(() => {
    switch (key) {
      case 'month':
        setData([...month.data]);
        break;
      case 'three':
        setData([...three.data]);
        break;
      case 'half':
        setData([...half.data]);
        break;
      default:
        setData([...year.data]);
        break;
    }
  }, [key]);

  return <Layout format="full" navigation={true}>
    <div className={styles.portfolio}>
      <aside className={styles.profile}>
        <div className={styles.user}>
          <img className={styles.photo} src={userData.avatar} alt={userData.name} />
          <div className={styles.userInfo}>
            <div className={styles.name}>{userData.name}</div>
            <div className={styles.description}>{user.description}</div>
          </div>
        </div>
        <div className={styles.groups}>
          <div className={`${styles.group} ${styles.balance}`}>
            <div className={styles.groupValue}>${priceFormat(userData.balance)}</div>
            <div className={styles.groupText}>Portfolio balance</div>
          </div>
          <div className={`${styles.group} ${styles.yield}`}>
            <div className={styles.groupValue}>${priceFormat(userData.monthlyYield)}</div>
            <div className={styles.groupText}>Monthly yield</div>
          </div>
          <div className={`${styles.group} ${styles.papersOwned}`}>
            <div className={styles.groupValue}>{userData.papers}</div>
            <div className={styles.groupText}>Papers Owned</div>
          </div>
        </div>
      </aside>
      <div className={styles.data}>
        <div className={styles.graph}>
          <div className={styles.graphFrames}>
            <button className={`${styles.graphToggle} ${key === 'month' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('month')}>1m</button>
            <button className={`${styles.graphToggle} ${key === 'three' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('three')}>3m</button>
            <button className={`${styles.graphToggle} ${key === 'half' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('half')}>6m</button>
            <button className={`${styles.graphToggle} ${key === 'year' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('year')}>1y</button>
          </div>
          <Chart data={data} />
        </div>
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
