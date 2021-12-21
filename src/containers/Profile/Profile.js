import React, { useState, useEffect } from 'react';
import {
  useParams,
} from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import { Popover } from 'react-tiny-popover'
// import {priceFormat, percentFormat} from '@utils/numbers';
import Header from '@components/Header';
import Button from '@components/Button';
import Avatar from '@components/Avatar';
import Activity from '@components/Activity';
import Loader from '@components/Loader';
import Chart from '@components/Chart';
import Pagination from '@components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserStatus,
  selectUserData,
  fetchUser,
} from '@services/User/userSlice';

import styles2 from '../../components/Search/SearchResults/SearchResults.module.scss';

import month from '@dataset/month.json';
import half from '@dataset/half.json';
import three from '@dataset/three.json';
import year from '@dataset/year.json';

import PaperPreview from '@components/PaperPreview';

import { ReactComponent as FollowersIcon } from '@assets/customIcons/customer.svg';
import { ReactComponent as FollowingIcon } from '@assets/customIcons/followers.svg';
import { ReactComponent as CommunityIcon } from '@assets/customIcons/community.svg';

// Dummy data
import AvatarImg from '@assets/dummy/user.png';

import 'react-tabs/style/react-tabs.css';
import styles from './Profile.module.scss';
import { ReactComponent as EditIcons } from '@assets/icons/edit_profile.svg';
import { ReactComponent as InfoIcon } from '@assets/icons/alert-circle-outline.svg';

import ArcticContributor from '@assets/award.png';

resetIdCounter();

const Profile = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // Tab index
  const [tabIndex, setTabIndex] = useState(0);
  const { username } = useParams();
  const status = useSelector(selectUserStatus);
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();
  const [key, setKey] = useState('month');
  const [data, setData] = useState([]);
  const [ShowEditModal, setShowEditModal] = useState(false);

  const [page, setPage] = useState(1);
  const [FeaturePage, setFeaturePage] = useState([]);

  // function for making number digits to k
  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
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

  // Sort feature array according to highest prbscore
  useEffect(() => {
    if (userData && userData.papers) {
      let modifyPaperWorks = userData.papers.slice(0, 2).sort((a, b) => {
        return b.prb_score - a.prb_score;
      });
      setFeaturePage(modifyPaperWorks)
    }
  }, [userData]);


  // Open and Hide modal
  const activateEditModal = () => {
    setShowEditModal(true);
  }

  // Hide modal
  const hideModal = () => {
    setShowEditModal(false);
  }

  if (status !== 'loaded') {
    return <div className={styles.profile}>
      <Header className={styles.profileHeader} />
      <div className={styles.profileTop}>
        <div className={styles.loading}><Loader darkMode /></div>
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
            <div className={styles.impact}>ImpactScore: <span>{kFormatter(Math.round(userData.impactScore))}</span></div>
            <div className={styles.infoActions}>
              <Button classes={styles.btnFollow} type="button" size="md" kind="fill">Follow</Button>
              <Button classes={styles.btnSponsor} type="button" size="md" kind="outline">Sponsor</Button>
            </div>
          </div>
          <div className={styles.profileMoney}>
            <div className={styles.moneyTitle}>Rosetta Tokens Available</div>
            <div className={styles.moneyRow}>
              <div className={styles.moneyCol}>
                <div className={styles.moneyValue}>${kFormatter(userData.onceOffTokens)}</div>
                <div className={styles.moneySubtitle}>Once off accrued tokens</div>
              </div>
              <div className={styles.moneyCol}>
                <div className={styles.moneyValue}>${Math.round(userData.impactScore * 0.354645437 / 5)}</div>
                <div className={styles.moneySubtitle}>
                  Monthly rewards to archive your papers
                  <Popover
                    isOpen={isPopoverOpen}
                    positions={['top', 'right', 'left', 'bottom']}
                    padding={10}
                    onClickOutside={() => setIsPopoverOpen(false)}
                    content={() => (
                      <div className={styles.tooltip}>Monthly rewards for archiving all your past papers at the current network activity</div>
                    )}
                  >
                    <InfoIcon onClick={() => setIsPopoverOpen(!isPopoverOpen)}/>
                  </Popover>
                </div>
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
              <Tab className={styles.tab}>Papers ({userData.papers.length})</Tab>
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

          <div className={styles.awardsContent}>
            <ul>
              <li> <img src={ArcticContributor} alt="Award"/> </li>
              <li> <img src={ArcticContributor} alt="Award"/> </li>
              <li> <img src={ArcticContributor} alt="Award"/> </li>
            </ul>
          </div>
        </div>
        <div className={styles.main}>
          <TabPanel className={styles.tabPanel}>
            {
              userData.bio && <div className={styles.section}>
                <div className={styles.sectionTitle}>Bio</div>
                <div className={styles.bioContent}>
                  <ul>
                    {
                      userData.bio.split(',').map((bioData, index) => {
                        return <li key={index}>{bioData}</li>;
                      })
                    }
                  </ul>
                </div>
              </div>
            }
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Featured Papers</div>
              <div className={styles.papersContent}>
                {
                  FeaturePage && FeaturePage.length > 0 && FeaturePage.map(item => <div className={styles2.resultsItem} key={item.id}>
                    <PaperPreview data={item} />
                  </div>)
                }
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitleActivity}>Activity </div>
              <Activity />
            </div>


          </TabPanel>
          <TabPanel className={styles.tabPanel}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Papers</div>
              <div className={styles.papersContent}>
                {
                  userData.papers && userData.papers.length > 0 && userData.papers.map(item => <div className={styles2.resultsItem} key={item.id}>
                    <PaperPreview data={item} />
                  </div>)
                }
                {userData.papers.length > 10 && <Pagination maxItems={userData.papers.length} itemsPerPage={10} currentPage={page} changePage={setPage} prev="Previous" next="Next" className={styles.pagination} />}
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
              <Button classes={styles.btnEdit} type="button" size="md" kind="fill" onClick={() => hideModal()}>Save</Button>
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
                    id="biouser"
                    name="bio"
                    type="text"
                    required
                    className={styles.textarea}></textarea>
                  <label htmlFor="bio" className={styles.label}>Bio</label>
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
