import React, { useState, useEffect } from 'react';
import Layout from '@components/Layout';
import Area from '@components/Area';
import Pagination from '@components/Pagination';
//import SearchSidebar from './SearchSidebar';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSearchText,
  selectSearchCount,
  selectSearchStatus,
  fetchSearch,

} from '@services/Search/searchSlice';
import {
  SearchFilters,
  SearchResults,
  SearchUsers
} from '@components/Search';

import styles from './Search.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const status = useSelector(selectSearchStatus);
  const count = useSelector(selectSearchCount);
  const searchText = useSelector(selectSearchText);

  useEffect(() => {
    dispatch(fetchSearch({ q: searchText, start: (page - 1) }));
  }, [searchText, page, dispatch]);

  const changeFilters = (params) => {
    console.log(params);
  }

  return <Layout navigation={false}>
    <div className={styles.grid}>
      <div className={styles.results}>
        <Area
          header={
            <div className={styles.total}>
              {count} results for {searchText ? `"${searchText}"` : 'All Papers'}
            </div>
          }
          content={
            <SearchFilters action={changeFilters} />
          }
        />
        <SearchUsers/>
        { status === 'loading' && 'Loading...' }
        { status === 'loaded' && <SearchResults /> }
        { count > 10 && <Pagination maxItems={count} itemsPerPage={10} currentPage={page} changePage={setPage} prev="Previous" next="Next" className={styles.pagination} /> }
      </div>
      <div className={styles.rising}>
        {
          //<SearchSidebar />
        }
      </div>
    </div>
  </Layout>
}

export default Search;
