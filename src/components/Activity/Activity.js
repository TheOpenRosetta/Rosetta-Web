import React from 'react';
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import styles from './Activity.module.scss';

resetIdCounter();

const month = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

const data = [
  {
    year: 2021,
    actions: {
      written: [],
      citations: [],
      replicated: [],
      answered: [],
    }
  },
  {
    year: 2020,
    actions: {
      written: [],
      citations: [],
      replicated: [],
      answered: [],
    }
  },
  {
    year: 2019,
    actions: {
      written: [],
      citations: [],
      replicated: [],
      answered: [],
    }
  }
]

const Activiy = () => <div className={styles.activity}>
  <Tabs className={styles.tabs} selectedTabClassName={styles.tabActive}>
    <TabList className={styles.tabsList}>
      {
        data.map(item => <Tab className={styles.tab} key={item.year}>{`${item.year}`}</Tab>)
      }
    </TabList>

    {
      data.map((item) => <TabPanel className={styles.tabPanel} selectedClassName={styles.tabPanelActive} key={item.year}>
        <div className={styles.activityBoard}>
          <div className={`${styles.activityBoardCol} ${styles.activityBoardColTitle}`}>
            <div className={styles.activityBoardRow}>Papers Written</div>
            <div className={styles.activityBoardRow}>Citations</div>
            <div className={styles.activityBoardRow}>Papers Replicated</div>
            <div className={styles.activityBoardRow}>Questions Answered</div>
          </div>
          <div className={`${styles.activityBoardCol} ${styles.activityBoardColValues}`}>
            <div className={styles.activityBoardHeader}>
              {month.map(item => <div className={styles.activityBoardHeaderItem} key={item}>{item}</div>)}
            </div>
            <div className={`${styles.activityBoardRow} ${styles.activityBoardRowColors}`}>{[...Array(52).keys()].map((item) => {
                return <span className={styles.activityCell} key={item} data-value={Math.floor(Math.random()*4)} />
            })}</div>
            <div className={`${styles.activityBoardRow} ${styles.activityBoardRowColors}`}>{[...Array(52).keys()].map((item) => {
                return <span className={styles.activityCell} key={item} data-value={Math.floor(Math.random()*4)} />
            })}</div>
            <div className={`${styles.activityBoardRow} ${styles.activityBoardRowColors}`}>{[...Array(52).keys()].map((item) => {
                return <span className={styles.activityCell} key={item} data-value={Math.floor(Math.random()*4)} />
            })}</div>
            <div className={`${styles.activityBoardRow} ${styles.activityBoardRowColors}`}>{[...Array(52).keys()].map((item) => {
                return <span className={styles.activityCell} key={item} data-value={Math.floor(Math.random()*4)} />
            })}</div>
          </div>
        </div>
      </TabPanel>)
    }
  </Tabs>
</div>;

export default Activiy;
