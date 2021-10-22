import React from 'react';
import { Link } from "react-router-dom";
import Area from '@components/Area';
import { percentFormat } from '@utils/numbers';

import styles from './SearchSidebar.module.scss';

const risingList = [{
  title: 'New Measurement for Impact in Academic Research',
  paperId: 11,
  slug: 'impact_academic_research',
  balance: 1984,
  delta: 5,
  apy: 7.5
}, {
  title: 'New Measurement for Impact in Academic Research',
  paperId: 12,
  slug: 'impact_academic_research',
  balance: 1984,
  delta: 5,
  apy: 7.5
}, {
  title: 'New Measurement for Impact in Academic Research',
  paperId: 13,
  slug: 'impact_academic_research',
  balance: 1984,
  delta: 5,
  apy: 7.5
}, {
  title: 'New Measurement for Impact in Academic Research',
  paperId: 14,
  slug: 'impact_academic_research',
  balance: 1984,
  delta: 5,
  apy: 7.5
}, {
  title: 'New Measurement for Impact in Academic Research',
  paperId: 15,
  slug: 'impact_academic_research',
  balance: 1984,
  delta: 5,
  apy: 7.5
}, {
  title: 'New Measurement for Impact in Academic Research',
  paperId: 16,
  slug: 'impact_academic_research',
  balance: 1984,
  delta: 5,
  apy: 7.5
}, {
  title: 'New Measurement for Impact in Academic Research',
  paperId: 17,
  slug: 'impact_academic_research',
  balance: 1984,
  delta: 5,
  apy: 7.5
}];

const SearchSidebar = () => {
  // Header block
  const header = <div className={styles.header}>
    <div className={styles.headerTitle}>Fastest Rising papers</div>
  </div>;

  // Content block
  const content = <div className={styles.content}>
    {
      risingList.map(item => <div className={styles.paper} key={item.paperId}>
        <Link to={item.slug} className={styles.title}>{item.title}</Link>
        <div className={styles.paperFooter}>
          <div className={styles.balance}>${item.balance}</div>
          <div className={`${styles.delta} ${item.delta > 0 ? styles.deltaPlus : styles.deltaMinus}`}>({item.delta > 0 ? '+' : '-'}{percentFormat(item.delta)}%)</div>
          <div className={styles.apy}>APY {percentFormat(item.apy)}%</div>
        </div>
      </div>)
    }
  </div>;


  return <div className={styles.sidebar}>
    <Area header={header} content={content} />
  </div>
}

export default SearchSidebar;
