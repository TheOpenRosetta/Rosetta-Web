import React, { useState, useEffect } from 'react';
import Layout from '@components/Layout';
import Area from '@components/Area';
import { SearchFilters, SearchResults, SearchUsers } from '@components/Search';

import styles from './Search.module.scss';

import AvatarImg from '@assets/avatar.png';

const users = [{
  authorid: 111,
  photo: AvatarImg,
  firstName: 'Anthony',
  lastName: 'Rayan',
  publications: 617,
  impactScore: 21168,
  categories: ['citations', 'physics'],
},{
  authorid: 112,
  photo: AvatarImg,
  firstName: 'Anthony',
  lastName: 'Rayan',
  publications: 617,
  impactScore: 21168,
  categories: ['citations', 'physics'],
},{
  authorid: 113,
  photo: AvatarImg,
  firstName: 'Anthony',
  lastName: 'Rayan',
  publications: 617,
  impactScore: 21168,
  categories: ['citations', 'physics'],
},
{
  authorid: 114,
  photo: AvatarImg,
  firstName: 'Anthony',
  lastName: 'Rayan',
  publications: 617,
  impactScore: 21168,
  categories: ['citations', 'physics'],
}];

const Search = ({ searchString }) => {
  const [result, setResult] = useState([]);
  const [risingPapers, setRisingPapers] = useState([]);

  useEffect(() => {
    console.log(searchString);
  }, [searchString])

  const changeFilters = (params) => {
    console.log(params);
  }

  return <Layout navigation={false}>
    <div className={styles.grid}>
      <div className={styles.total}>
        {result.length} results for "{searchString}"
      </div>
      <div className={styles.results}>
        <SearchFilters action={changeFilters} />
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
