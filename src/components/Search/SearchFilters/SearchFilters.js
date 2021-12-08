import React, { useState } from 'react';
import InputRange from 'react-input-range';
import { Popover } from 'react-tiny-popover'
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './SearchFilters.module.scss';

import {ReactComponent as DescIcon} from '@assets/icons/arrowhead-up-outline.svg';
import {ReactComponent as AscIcon} from '@assets/icons/arrowhead-down-outline.svg';

import 'react-input-range/lib/css/index.css';

// import studyFields from '@config/studyFields';

import {
  selectSearchSort,
  selectSearchFilters,
  changeFilter,
  changeSort
} from '@services/Search/searchSlice';

const pubTypes = [
  { value: 'journal', label: 'Journal' },
  { value: 'patent', label: 'Patent' },
  { value: 'conference', label: 'Conference' },
  { value: 'thesis', label: 'Thesis' },
  { value: 'repository', label: 'Repository' },
  { value: 'book', label: 'Book' },
  { value: 'bookchapter', label: 'Bookchapter' },
  { value: 'dataset', label: 'Dataset' }
];

const sort = [
  { value: 'n_citation', label: 'Sort by citations' },
  { value: 'date', label: 'Sort by date' },
  { value: 'title', label: 'Sort by title' },
  { value: 'volume', label: 'Sort by volume' },
];

const direction = [
  { value: 'asc', label: <AscIcon className={styles.direction} /> },
  { value: 'desc', label: <DescIcon className={styles.direction} /> },
];

const customStyles = {
  option: (provided) => ({
    ...provided,
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '160%'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  control: () => ({
    display: 'flex',
    padding: '5px 7px',
  }),
  container: () => ({
    border: '1px solid #F2F3F7',
    borderRadius: 4,
    width: '100%'
  }),
  input: (provided) => ({
    ...provided,
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '160%',
    position: 'absolute'
  }),
  placeholder: () => ({
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '160%',
    whiteSpace: 'nowrap'
  }),
  singleValue: () => ({
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '160%',
    whiteSpace: 'nowrap'
  })
}

const SearchFilters = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const dispatch = useDispatch();
  const sortState = useSelector(selectSearchSort);
  const filtersState = useSelector(selectSearchFilters);
  const [range, setRange] = useState(filtersState.dates);

  const searchAction = (param, value) => {
    dispatch(changeFilter({
      [param]: value
    }));
  };

  const sortAction = (param, option) => {
    dispatch(changeSort({
      [param]: option.value
    }));
  };

  return <div className={styles.filters}>
    <div className={styles.filtersTitle}>Advance search</div>
    <div className={styles.fieldList}>
      <div className={styles.fieldItem}>
        <Popover
          isOpen={isPopoverOpen}
          positions={['bottom', 'left']}
          align="start"
          padding={10}
          reposition={false}
          onClickOutside={() => setIsPopoverOpen(false)}
          content={() => (
            <div className={styles.calendar}>
              <InputRange
                maxValue={2022}
                minValue={1800}
                value={range}
                onChange={value => setRange(value)}
                onChangeComplete={value => searchAction('date', value)}
              />
            </div>
          )}
        >
          <div className={`${styles.field} ${styles.fieldPopover}`} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            Year range
            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-tj5bde-Svg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
          </div>
        </Popover>
      </div>
      <div className={styles.fieldItem}>
        <Select
          options={pubTypes}
          styles={customStyles}
          placeholder="Publication type"
          isMulti
          className={styles.field}
          onChange={(val) => searchAction('pubDate', val)}
        />
      </div>
      <div className={`${styles.fieldItem} ${styles.fieldItemSort}`}>
        <Select
          options={sort}
          defaultValue={sort.find(item => item.value === sortState.type)}
          styles={customStyles}
          className={styles.field}
          onChange={(val) => sortAction('type', val)}
        />
      </div>
      <div className={`${styles.fieldItem} ${styles.fieldItemDirection}`}>
        <Select
          options={direction}
          defaultValue={direction.find(item => item.value === sortState.direction)}
          styles={customStyles}
          className={styles.field}
          onChange={(val) => sortAction('direction', val)}
        />
      </div>
    </div>
  </div>;
}

export default SearchFilters;
