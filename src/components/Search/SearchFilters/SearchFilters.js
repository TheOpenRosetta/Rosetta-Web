import React, { useState } from 'react';
import styles from './SearchFilters.module.scss';

const SearchFilters = () => {
  const [study, setStudy] = useState('');
  const [date, setDate] = useState('');
  const [pubType, setPubType] = useState('');
  const [sortRelevance, setSortRelevance] = useState('');
  const [sortPrice, setSortPrice] = useState('');

  const searchAction = (param, value) => {
    switch (param) {
      case 'study':
        console.log(value);
        break;
      case 'date':
        console.log(value);
        break;
      case 'pubDate':
        console.log(value);
        break;
      default:
        break;
    }
  }

  const sortAction = (param, value) => {
    switch (param) {
      case 'relevance':
        console.log(value);
        break;
      case 'price':
        console.log(value);
        break;
      default:
        break;
    }
  }

  return <div className={styles.filters}>
  </div>;
}

export default SearchFilters;
