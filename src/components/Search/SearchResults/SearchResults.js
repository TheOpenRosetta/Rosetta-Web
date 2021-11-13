import React from 'react';
import { useSelector } from 'react-redux';
import PaperPreview from '@components/PaperPreview';
import {
  selectSearchResult,
} from '@services/Search/searchSlice';
import styles from './SearchResults.module.scss';

const SearchResults = () => {
  const searchResult = useSelector(selectSearchResult);

  if (searchResult && searchResult.length > 0) {
    return <div className={styles.results}>
      {
        searchResult.map(item => <div className={styles.resultsItem} key={item.id}>
          <PaperPreview data={item} />
        </div>)
      }
    </div>;
  }

  return '';
}

export default SearchResults;
