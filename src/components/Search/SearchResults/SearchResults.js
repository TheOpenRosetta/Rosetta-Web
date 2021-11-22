import React from 'react';
import { useSelector } from 'react-redux';
import PaperPreview from '@components/PaperPreview';
import {
  selectSearchResult,
  selectSearchText,
} from '@services/Search/searchSlice';
import styles from './SearchResults.module.scss';

const SearchResults = () => {
  const searchResult = useSelector(selectSearchResult);
  const searchText = useSelector(selectSearchText);

  if (searchResult && searchResult.length > 0) {
    return <div className={styles.results}>
      {
        searchResult.map(item => <div className={styles.resultsItem} key={item.id}>
          <PaperPreview data={item} />
        </div>)
      }
    </div>;
  }

  return <div className={`${styles.results} ${styles.resultsEmpty}`}>Papers with "{searchText}" in name don't found</div>;
}

export default SearchResults;
