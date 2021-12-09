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
  selectSearchSort,
  selectSearchFilters,
  selectKeyParam
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
  const keyParam = useSelector(selectKeyParam);
  const searchText = useSelector(selectSearchText);
  const { type: sortType, direction: sortDirection } = useSelector(selectSearchSort);
  const filters = useSelector(selectSearchFilters);

  useEffect(() => {
    if (searchText) {
      dispatch(fetchSearch({ keyParam, q: searchText, start: (page - 1), sort: { type: sortType, direction: sortDirection }, filters }));
    }
  }, [searchText, keyParam, page, dispatch, sortType, sortDirection, filters]);

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
            <SearchFilters />
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
