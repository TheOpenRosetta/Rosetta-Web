import React from 'react';
import Layout from '@components/Layout';
import Button from '@components/Button';
import Area from '@components/Area';
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import styles from './Help.module.scss';

resetIdCounter();

const Help = () => {

  // Header block
  const header = <div className={styles.header}>
    <div className={styles.title}>Explore Question & Answers</div>
    <Button kind="fill" size="sm">Ask a question</Button>
  </div>;

  // Content block
  const content = <div className={styles.content}>
    <Tabs className={styles.tabs} selectedTabClassName={styles.tabActive}>
      <TabList className={styles.tabsList}>
        <Tab className={styles.tab}>New</Tab>
        <Tab className={styles.tab}>Popular</Tab>
      </TabList>

      <TabPanel className={styles.tabPanel}>
        <h2>New content</h2>
      </TabPanel>
      <TabPanel className={styles.tabPanel}>
        <h2>Popular content</h2>
      </TabPanel>
    </Tabs>
  </div>;

  return <Layout navigation={true}>
    <Area header={header} content={content} />
  </Layout>
}

export default Help;
