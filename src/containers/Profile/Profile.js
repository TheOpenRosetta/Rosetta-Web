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
import {
  //SearchFilters,
  SearchResults,
  SearchUsers
} from '@components/Search';

import month from '@dataset/month.json';
import half from '@dataset/half.json';
import three from '@dataset/three.json';
import year from '@dataset/year.json';

import { ReactComponent as FollowersIcon } from '@assets/customIcons/customer.svg';
import { ReactComponent as FollowingIcon } from '@assets/customIcons/followers.svg';
import { ReactComponent as CommunityIcon } from '@assets/customIcons/community.svg';

import AvatarImg from '@assets/avatar.png';
import 'react-tabs/style/react-tabs.css';
import styles from './Profile.module.scss';
import { ReactComponent as EditIcons } from '@assets/icons/edit_profile.svg';


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
  const [ShowEditModal, setShowEditModal] = useState(false);
  
  // function for making number digits to k
  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }
  

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

  // Open and Hide modal
  const activateEditModal = () => {
    console.log("!ShowEditModal", !ShowEditModal);
    setShowEditModal(!ShowEditModal);
  }

  if (status !== 'loaded') {
    return <div className={styles.profile}>
      <Header className={styles.profileHeader} />
      <div className={styles.profileTop}>
        <div className={styles.loading}><Loader /></div>
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
            <div className={styles.impact}>ImpactScore: <span>{kFormatter(userData.impactScore)}</span></div>
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
          <div className={styles.profileMain}>
            <TabList className={styles.tabsList}>
              <Tab className={styles.tab}>Overview</Tab>
              <Tab className={styles.tab}>Papers</Tab>
              <Tab className={styles.tab}>Portfolio</Tab>
              <Tab className={styles.tab}>Comments</Tab>
            </TabList>
            <Button classes={styles.btnEdit} type="button" size="md" kind="fill" onClick={() => activateEditModal()}>Edit profile</Button>
          </div>
        </div>
      </div>
      <div className={`container ${styles.profileContent}`}>
        <div className={styles.sidebar}>
          <div className={styles.stats}>
            <div className={styles.statsItem}>
              <FollowersIcon />
              {kFormatter(userData.stats.followers)}
              <span>followers</span>
            </div>
            <div className={styles.statsItem}>
              <FollowingIcon />
              {kFormatter(userData.stats.following)}
              <span>following</span>
            </div>
            <div className={styles.statsItem}>
              <CommunityIcon />
              {kFormatter(userData.stats.communities)}
              <span>communities</span>
            </div>
          </div>
          <div className={styles.sectionTitleAwards}>Awards</div>
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
                  <SearchResults />
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
          <TabPanel className={styles.tabPanel}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Comments</div>
              <div className={styles.papersContent}>
                {
                  // Add PaperPreview Component in loop
                }
              </div>
            </div>
          </TabPanel>
        </div>
      </div>
    </Tabs>

    {ShowEditModal
      ? <div className={styles.editProfileModal}>
        <div className={styles.editProfileModalInner}>
          <div className={styles.editProfileModalContent}>
            <div className={styles.editProfileModalHeader}>
              <div className={styles.editProfileModalHeaderTitle}>Edit profile</div>
              <Button classes={styles.btnEdit} type="button" size="md" kind="fill">Save</Button>
            </div>
            <div className={styles.editProfileModalBody}>
              <div className={styles.editProfileModalBodyAvatarr}>

                <Avatar src={userData.AvatarImg || AvatarImg} size="l" />

                <EditIcons />

              </div>
              <form className={styles.editProfileModalForm}>
                <div className={styles.editProfileModalFormGroup}>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className={styles.field}
                  />
                  <label htmlFor="firstName" className={styles.label}>First Name</label>
                </div>
                <div className={styles.editProfileModalFormGroup}>
                  <textarea
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className={styles.textarea}></textarea>
                  <label htmlFor="firstName" className={styles.label}>Bio</label>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
      : ""
    }

  </div>
}

export default Profile;
