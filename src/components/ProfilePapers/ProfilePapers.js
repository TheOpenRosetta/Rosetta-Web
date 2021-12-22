import React, { useState, useEffect } from 'react';
import Pagination from '@components/Pagination';
import PaperPreview from '@components/PaperPreview';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserData,
  getPapers
} from '@services/User/userSlice';

import styles2 from '../../components/Search/SearchResults/SearchResults.module.scss';
import styles from './ProfilePapers.module.scss';

const ProfilePapers = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {
    author_id,
    papers,
    papersCount
  } = useSelector(selectUserData);

  useEffect(() => {
    dispatch(getPapers({
      id: author_id,
      start: page
    }))
  }, [dispatch, page, author_id]);

  return <>
    {
      papers && papers.length > 0 && papers.map(item => <div className={styles2.resultsItem} key={item.id}>
        <PaperPreview data={item} />
      </div>)
    }
    {papersCount > 10 && <Pagination maxItems={papersCount} itemsPerPage={10} currentPage={page} changePage={setPage} prev="Previous" next="Next" className={styles.pagination} />}
  </>
};

export default ProfilePapers;
