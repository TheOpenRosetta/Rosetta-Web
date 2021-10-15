import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectStep,
} from '@services/Onboarding/onboardingSlice';
import styles from './Status.module.scss';

import {ReactComponent as CheckmarkIcon}  from '@assets/icons/checkmark-outline.svg'

const steps = [
  { title: 'Check Past Rewards' },
  { title: 'Create Rosetta Wallet' },
  { title: 'Profile Creation' },
  { title: 'Publish & Earn' }
]

const Status = () => {
  const step = useSelector(selectStep);

  const condition = (i) => {
    // Strong logic of progress bar with multisteps inside of steps
    if (1 <= step && step < 6 && i === 0) {
      return true;
    } else if (6 <= step && step < 9 && i <= 1) {
      return true;
    } else if (step >= 9 && i <= 2) {
      return true
    } else {
      return false;
    }
  }

  return <div className={styles.progress} data-step={step}>
    {
      steps.map((stepsItem, index) => <div className={`${styles.step} ${condition(index) ? styles.done : ''}`} key={stepsItem.title}>
        <span className={styles.dot}>
          {
            condition(index) ? <span><CheckmarkIcon/></span> : <span>{index + 1}</span>
          }
        </span>
        <div className={styles.title}>{stepsItem.title}</div>
      </div>)
    }
  </div>;
}

export default Status;
