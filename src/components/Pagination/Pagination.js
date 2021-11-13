import * as React from 'react';
import { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';

import styles from './Pagination.module.scss';

const Pagination = ({ data, maxItems, itemsPerPage, currentPage, changePage, prev, next, className }) => {
  const dataLength = data ? (data.length === 0 ? maxItems : data.length) : (maxItems || 0);
  const indexOfLastPage = Math.ceil(dataLength / itemsPerPage);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const updatedPageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataLength / itemsPerPage); i += 1) {
      updatedPageNumbers.push(i);
    }
    setPageNumbers((prevPageNumbers) => prevPageNumbers.concat(updatedPageNumbers));
  }, [dataLength, itemsPerPage]);

  const filterPages = (visiblePages, totalPages) => visiblePages.filter((page) => page <= totalPages);

  const getVisibleDesktop = (page, total) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    }

    if (page % 5 >= 0 && page > 4 && page + 2 < total) {
      return [1, page - 1, page, page + 1, total];
    }

    if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
      return [1, total - 3, total - 2, total - 1, total];
    }

    return [1, 2, 3, 4, 5, total];
  };

  const getVisibleMobile = (page, total) => {
    if (total < 4) {
      return filterPages([1, 2, 3], total);
    }

    if (page % 5 >= 0 && page >= 4 && page + 2 <= total) {
      return [1, page, total];
    }

    if (page % 5 >= 0 && page >= 4 && page + 2 >= total) {
      return [1, total - 1, total];
    }

    return [1, 2, 3, total];
  };

  const handleClickNext = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= indexOfLastPage) {
      changePage(nextPage);
    }
  };

  const handleClickPrev = () => {
    const prevPage = currentPage - 1;

    if (prevPage >= 1) {
      changePage(prevPage);
    }
  };

  const handleClick = (event) => {
    const currentPageNum = Number(event.target.dataset.id);

    changePage(currentPageNum);
  };

  const renderPageNumbers = (someArray) => someArray.map((number, index, array) => (
    <li
      key={number.toString()}
      className={styles.el}
    >
      {array[index - 1] + 1 < number && (
        <button
          type="button"
          className={styles.dots}
        >
          {'...'}
        </button>
      )}
      <button
        type="button"
        data-id={number}
        onClick={handleClick}
        className={`${styles.item} ${currentPage === number ? styles.itemCurrent : "" }`}
      >
        {number}
      </button>
    </li>
  ));

  return (
    <div className={className}>
      <ul className={styles.pagination}>
        {currentPage !== 1 && (
          <li>
            <button
              type="button"
              className={styles.itemPrev}
              onClick={handleClickPrev}
            >{prev}
            </button>
          </li>
        )}
        <MediaQuery maxWidth={480}>
          {(renderPageNumbers(getVisibleMobile(currentPage, pageNumbers.length)))}
        </MediaQuery>
        <MediaQuery minWidth={481}>
          {(renderPageNumbers(getVisibleDesktop(currentPage, pageNumbers.length)))}
        </MediaQuery>
        {currentPage !== indexOfLastPage && (
          <li>
            <button
              type="button"
              className={styles.itemNext}
              onClick={handleClickNext}
            >{next}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
