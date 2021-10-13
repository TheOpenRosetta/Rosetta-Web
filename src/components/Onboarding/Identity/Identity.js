import React, { useState } from 'react';
import Button from '@components/Button';
import Pagination from '@components/Pagination';
import MediaQuery from 'react-responsive';
import Status from '../Status';
import IdentityCard from './IdentityCard';
import { useDispatch } from 'react-redux';
import {
  prevStep,
  nextStep
} from '@services/Onboarding/onboardingSlice';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-ios-back-outline.svg'

import styles from './Identity.module.scss';

// TEST
import AvatarImg from '@assets/avatar.png';
const card = {
  authorid: 101010,
  photo: AvatarImg,
  firstName: "Anthony",
  lastName: "Ryan",
  institute: "Harvard University",
  tokens: {
    monthly: 10000,
    once: 50000
  },
  papers: [{
    title: "New Measurement for Impact in Academic Research",
    impactScore: 5.676,
    authors: ['Paola Peynetti Velázquez', 'G. Gupta'],
    timestamp: 1351351616
  },
  {
    title: "New Measurement for Impact in Academic Research",
    impactScore: 5.676,
    authors: ['Paola Peynetti Velázquez', 'G. Gupta'],
    timestamp: 1351351616
  },
  {
    title: "New Measurement for Impact in Academic Research",
    impactScore: 5.676,
    authors: ['Paola Peynetti Velázquez', 'G. Gupta'],
    timestamp: 1351351616
  }]
}

const cards = [1,2,3,4,5,6,7,8,9,10,11].fill(card);

const Identity = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(cards.slice(0, 2));

  const changePage = (n) => {
    setPage(n);
    setData(cards.slice((n - 1)*2, n*2));
  }

  return <div className={styles.content}>
    <Status />
    <div className={styles.title}>Verify your identity</div>
    <div className={styles.subtitle}>We found other authors with names similar to yours. Please pick the right one. Fraudulent claims are considered as theft, and will penalised accordingly.</div>
    <MediaQuery minWidth={768}>
      <div className={styles.cards}>
        {
          data.map((item, index) => <div className={styles.card} key={item.authorid + index}>
            <IdentityCard data={item} />
          </div>)
        }
      </div>
      <Pagination data={cards} maxItems={cards.length} itemsPerPage={2} currentPage={page} changePage={changePage} prev="Previous" next="Next" className={styles.pagination} />
    </MediaQuery>

    <MediaQuery maxWidth={767}>
      <div className={styles.cards}>
        {
          <div className={styles.card}>
            <IdentityCard data={cards[page - 1]} />
          </div>
        }
      </div>
      <Pagination data={cards} maxItems={cards.length} itemsPerPage={1} currentPage={page} changePage={changePage} prev="Previous" next="Next" className={styles.pagination} />
    </MediaQuery>

    <label className={styles.checkboxContainer}>
      <input type="checkbox" />
      <span className={styles.checkbox}></span>
      I am not in this list
    </label>

    <div className={styles.actions}>
      <Button classes={styles.back} kind="secondary" size="lg" onClick={() => dispatch(prevStep())}><ArrowBackIcon /> Back</Button>
      <Button classes={styles.next} kind="fill" size="lg" onClick={() => dispatch(nextStep())}>Next</Button>
    </div>
  </div>;
}

export default Identity;
