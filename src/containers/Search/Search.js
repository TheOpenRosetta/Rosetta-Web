import React, { useState, useEffect } from 'react';
import Layout from '@components/Layout';
import Area from '@components/Area';
import { SearchFilters, SearchResults, SearchUsers } from '@components/Search';

import styles from './Search.module.scss';

const Search = ({ searchString }) => {
  const [result, setResult] = useState([]);
  const [users, setUsers] = useState([]);
  const [risingPapers, setRisingPapers] = useState([]);

  // useEffect()

  const newSearch = (params) => {
    console.log(params);
  }

  return <Layout navigation={false}>
    <div className={styles.grid}>
      <div className={styles.total}>
        {result.length} results for "{searchString}"
      </div>
      <div className={styles.results}>
        <SearchFilters action={newSearch} />
        <SearchUsers users={users} />
        <SearchResults result={result} />
      </div>
      <div className={styles.rising}>
        <Area />
      </div>
    </div>
  </Layout>
}

export default Search;
