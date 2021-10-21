import React, { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import { DateRange } from 'react-date-range';
import { Popover } from 'react-tiny-popover'
import Select from 'react-select';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './SearchFilters.module.scss';

const studies = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const pubTypes = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const sort = [
  { value: 'relevance', label: 'Sort by relevance' },
  { value: 'likes', label: 'Sort by likes' },
];

const prices = [
  { value: 'priceToLow', label: 'Price high to low' },
  { value: 'priceToHigh', label: 'Price low to high' },
];

const customStyles = {
  option: (provided, state) => ({
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

const SearchFilters = ({ action }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [study, setStudy] = useState(null);
  const [date, setDate] = useState([
    {
      startDate: null,
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [pubType, setPubType] = useState(null);
  const [sortRelevance, setSortRelevance] = useState(null);
  const [sortPrice, setSortPrice] = useState(null);

  useEffect(() => {
    const asArray = Object.entries({
      study,
      date,
      pubType,
      sortRelevance,
      sortPrice,
    });

    const filtered = asArray.filter(([key, value]) => value !== null);

    action(Object.fromEntries(filtered));
  }, [study, date, pubType, sortRelevance, sortPrice, action]);

  const searchAction = (param, value) => {
    switch (param) {
      case 'study':
        setStudy(value);
        break;
      case 'date':
        setDate([value.selection]);
        break;
      case 'pubDate':
        setPubType(value)
        break;
      default:
        break;
    }
  }

  const sortAction = (param, value) => {
    switch (param) {
      case 'sort':
        setSortRelevance(value);
        break;
      case 'price':
        setSortPrice(value);
        break;
      default:
        break;
    }
  }

  return <div className={styles.filters}>
    <div className={styles.filtersTitle}>Advance search</div>
    <div className={styles.fieldList}>
      <div className={styles.fieldItem}>
        <Select
          options={studies}
          styles={customStyles}
          placeholder="Field of study"
          onChange={(val) => searchAction('study', val)}
          className={styles.field}
        />
      </div>
      <div className={styles.fieldItem}>
        <Popover
          isOpen={isPopoverOpen}
          positions={['bottom', 'left']}
          padding={10}
          reposition={false}
          onClickOutside={() => setIsPopoverOpen(false)}
          content={({ position }) => (
            <div className={styles.calendar}>
              <MediaQuery minWidth={768}>
                <DateRange
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={date}
                  direction="horizontal"
                  onChange={item => searchAction('date', item)}
                />
              </MediaQuery>
              <MediaQuery maxWidth={767}>
                <DateRange
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={date}
                  direction="vertical"
                  onChange={item => searchAction('date', item)}
                />
              </MediaQuery>
            </div>
          )}
        >
          <div className={`${styles.field} ${styles.fieldPopover}`} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            Date range
            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-tj5bde-Svg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
          </div>
        </Popover>
      </div>
      <div className={styles.fieldItem}>
        <Select
          options={pubTypes}
          styles={customStyles}
          placeholder="Publication type"
          className={styles.field}
          onChange={(val) => searchAction('pubDate', val)}
        />
      </div>
      <div className={styles.fieldItem}>
        <Select
          options={sort}
          defaultValue={sort[0]}
          styles={customStyles}
          className={styles.field}
          onChange={(val) => sortAction('sort', val)}
        />
      </div>
      <div className={styles.fieldItem}>
        <Select
          options={prices}
          defaultValue={prices[0]}
          styles={customStyles}
          className={styles.field}
          onChange={(val) => sortAction('price', val)}
        />
      </div>
    </div>
  </div>;
}

export default SearchFilters;
