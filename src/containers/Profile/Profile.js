import React, { useState, useEffect } from 'react';
import {
  useParams
} from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
// import {priceFormat, percentFormat} from '@utils/numbers';
import Header from '@components/Header';
import Button from '@components/Button';
import Avatar from '@components/Avatar';
import Loader from '@components/Loader';
import Chart from '@components/Chart';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserStatus,
  selectUserData,
  fetchUser
} from '@services/User/userSlice';

import month from '@dataset/month.json';
import half from '@dataset/half.json';
import three from '@dataset/three.json';
import year from '@dataset/year.json';

import {ReactComponent as FollowersIcon} from '@assets/customIcons/customer.svg';
import {ReactComponent as FollowingIcon} from '@assets/customIcons/followers.svg';
import {ReactComponent as CommunityIcon} from '@assets/customIcons/community.svg';

import AvatarImg from '@assets/avatar.png';
import 'react-tabs/style/react-tabs.css';
import styles from './Profile.module.scss';

resetIdCounter();

const Profile = () => {
  // Tab index
  const [tabIndex, setTabIndex] = useState(0);
  const { username } = useParams();
  const status = useSelector(selectUserStatus);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchUser({ username }));
  }, [dispatch, username]);

  if (status !== 'loaded') {
    return <div className={styles.profile}>
      <Header className={styles.profileHeader} />
      <div className={styles.profileTop}>
        <div className={styles.loading}><Loader/></div>
      </div>
    </div>
  }

  return <div className={styles.profile}>
    <Header className={styles.profileHeader} />
    <div className={styles.profileTop}>
      <div className="container">
        <div className={styles.profileTopContent}>
          <div className={styles.profileAvatar}>
            <Avatar src={userData.AvatarImg || AvatarImg} title={userData.name} kind="bordered" size="xl" classes={styles.avatar} />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.name}>{userData.name}</div>
            <div className={styles.status}>{userData.status}</div>
            <div className={styles.committed}>Academic Fraud Committed: <span>{userData.fraudCommitted ? 'yes' : 'no'}</span></div>
            <div className={styles.impact}>ImpactScore: <span>{userData.impactScore}</span></div>
            <div className={styles.infoActions}>
              <Button classes={styles.btnFollow} type="button" size="md" kind="fill">Follow</Button>
              <Button classes={styles.btnSponsor} type="button" size="md" kind="outline">Sponsor</Button>
            </div>
          </div>
          <div className={styles.profileMoney}>
            <div className={styles.moneyTitle}>Rosetta Tokens Available</div>
            <div className={styles.moneyRow}>
              <div className={styles.moneyCol}>
                <div className={styles.moneyValue}>${userData.onceOffTokens}</div>
                <div className={styles.moneySubtitle}>Once off accrued tokens</div>
              </div>
              <div className={styles.moneyCol}>
                <div className={styles.moneyValue}>${userData.monthlyTokens}</div>
                <div className={styles.moneySubtitle}>Monthly Ongoing Tokens</div>
              </div>
            </div>
            <div className={styles.moneyAction}>
              <Button classes={styles.btnClaim} type="button" size="sm" kind="fill">Claim both</Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Tabs className={styles.tabs} selectedTabClassName={styles.tabActive} defaultIndex={tabIndex} onSelect={index => setTabIndex(index)}>
      <div className={styles.profileBar}>
        <div className="container">
          <div className={styles.main}>
            <TabList className={styles.tabsList}>
              <Tab className={styles.tab}>Overview</Tab>
              <Tab className={styles.tab}>Papers</Tab>
              <Tab className={styles.tab}>Portfolio</Tab>
            </TabList>
          </div>
        </div>
      </div>
      <div className={`container ${styles.profileContent}`}>
        <div className={styles.sidebar}>
          <div className={styles.stats}>
            <div className={styles.statsItem}>
              <FollowersIcon />
              {userData.stats.followers}
              <span>followers</span>
            </div>
            <div className={styles.statsItem}>
              <FollowingIcon />
              {userData.stats.following}
              <span>following</span>
            </div>
            <div className={styles.statsItem}>
              <CommunityIcon />
              {userData.stats.communities}
              <span>communities</span>
            </div>
          </div>
        </div>
        <div className={styles.main}>
          <TabPanel className={styles.tabPanel}>
            {
              userData.bio && <div className={styles.section}>
                <div className={styles.sectionTitle}>Bio</div>
                <div className={styles.bioContent}>{userData.bio}</div>
              </div>
            }
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Featured Papers</div>
              <div className={styles.papersContent}>
                {
                  // Add PaperPreview Component in loop
                }
              </div>
            </div>
          </TabPanel>
          <TabPanel className={styles.tabPanel}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Papers</div>
              <div className={styles.papersContent}>
                {
                  // Add PaperPreview Component in loop
                }
              </div>
            </div>
          </TabPanel>
          <TabPanel className={styles.tabPanel}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Earnings</div>
              <div className={styles.chartContent}>
                <div className={styles.graph}>
                  <div className={styles.graphFrames}>
                    <button className={`${styles.graphToggle} ${key === 'month' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('month')}>1m</button>
                    <button className={`${styles.graphToggle} ${key === 'three' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('three')}>3m</button>
                    <button className={`${styles.graphToggle} ${key === 'half' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('half')}>6m</button>
                    <button className={`${styles.graphToggle} ${key === 'year' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('year')}>1y</button>
                  </div>
                  <Chart data={data} />
                </div>
              </div>
            </div>
          </TabPanel>
        </div>
      </div>
    </Tabs>
  </div>
}

export default Profile;
