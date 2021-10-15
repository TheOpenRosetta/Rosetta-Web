import React from 'react';
import Button from '@components/Button';
import Status from '../Status';
import { useDispatch } from 'react-redux';
import {
  prevStep,
  nextStep
} from '@services/Onboarding/onboardingSlice';

import styles from './Finish.module.scss';

const Finish = () => {
  const publishAction = () => {
    alert("Publish");
  }

  const exploreAction = () => {
    alert("Explore");
  }

  return <div className={styles.photo}>
    <Status />
    <div className={styles.title}>Ready to publish your first paper?</div>
    <div className={styles.subtitle}>Start exploring, or publish your first paper on Rosetta.</div>

    <div className={styles.actions}>
      <Button classes={styles.btn} kind="fill" size="lg" onClick={publishAction}>Publish</Button>
      <Button classes={styles.btn} kind="secondary" size="lg" onClick={exploreAction}>Explore</Button>
    </div>
  </div>;
}

export default Finish;
