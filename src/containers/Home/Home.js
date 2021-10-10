import React from 'react';
import Layout from '@components/Layout';
import Feed from '@components/Feed';
import PortfolioBlock from '@components/PortfolioBlock';
import WeeklyStats from '@components/WeeklyStats';

import styles from './Home.module.scss';

const Home = () => {
  return <Layout navigation={true}>
    <div className={styles.grid}>
      <main className={styles.main}>
        <Feed />
      </main>
      <aside>
        <PortfolioBlock />
        <WeeklyStats />
      </aside>
    </div>
  </Layout>
}

export default Home;
