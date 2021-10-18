import React, { useState } from 'react';
import Status from '../Status';
import Button from '@components/Button';
import Pagination from '@components/Pagination';
import PapersItem from './PapersItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  prevStep,
  nextStep,
  selectPapers,
  addIncorrectPaper,
  addShouldAttributedPaper
} from '@services/Onboarding/onboardingSlice';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-ios-back-outline.svg'
import styles from './Papers.module.scss';

// TEST
import AvatarImg from '@assets/avatar.png';
const user = {
  authorid: 101010,
  photo: AvatarImg,
  firstName: "Anthony",
  lastName: "Ryan",
  score: 10000,
}

const papersList = [1,1,1,1,1,1,1,1,1,1].map(() => ({
  title: "New Measurement for Impact in Academic Research",
  impactScore: 5.676,
  authors: ['Paola Peynetti Velázquez', 'G. Gupta'],
  timestamp: 1351351616,
  paperid: Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000
}));

const Papers = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(papersList.slice(0, 3));
  const attrPapers = useSelector(selectPapers);

  const changePage = (n) => {
    setPage(n);
    setData(papersList.slice((n - 1)*3, n*3)); // save data to state of shown papers
  }

  const processedPaper = (id) => {
    let paper = null;
    attrPapers.incorrectlyAttr.some(el => el === id) && (paper = 'incorrect');
    attrPapers.shouldAttr.some(el => el === id) && (paper = 'should');
    return paper;
  }

  return <div className={styles.papers}>
    <Status />
    <div className={styles.title}>Verify your papers</div>
    <div className={styles.photo}>
      <img src={user.photo} alt={`${user.firstName} ${user.lastName}`} />
    </div>
    <div className={styles.name}>{user.firstName} {user.lastName}</div>
    <div className={styles.score}>ImpactScore <span>{user.score}</span></div>
    <div className={styles.list}>
      {
        data.map((item) => <PapersItem
          data={item}
          className={styles.item}
          key={item.paperid}
          processedPaper={processedPaper}
          approve={() => dispatch(addShouldAttributedPaper(item.paperid))}
          remove={() => dispatch(addIncorrectPaper(item.paperid))}
        />)
      }
    </div>
    <Pagination data={papersList} maxItems={papersList.length} itemsPerPage={3} currentPage={page} changePage={changePage} prev="Previous" next="Next" className={styles.pagination} />

    <div className={styles.actions}>
      <Button classes={styles.back} kind="secondary" size="lg" onClick={() => dispatch(prevStep())}><ArrowBackIcon /> Back</Button>
      <Button classes={styles.next} kind="fill" size="lg" onClick={() => dispatch(nextStep())}>Next</Button>
    </div>
  </div>;
}

export default Papers;
