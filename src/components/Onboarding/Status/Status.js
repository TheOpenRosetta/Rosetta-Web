import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectStep,
} from '@services/Onboarding/onboardingSlice';
import styles from './Status.module.scss';

const steps = [
  { title: 'Check Past Rewards' },
  { title: 'Create Rosetta Wallet' },
  { title: 'Profile Creation' },
  { title: 'Publish & Earn' }
]

const Status = () => {
  const step = useSelector(selectStep);

  return <div className={styles.progress} data-step={step}>
    {
      steps.map(step => <div className={styles.step} key={step.title}>
        <span className={styles.dot} />
        <div className={styles.title}>{step.title}</div>
      </div>)
    }
  </div>;
}

export default Status;
