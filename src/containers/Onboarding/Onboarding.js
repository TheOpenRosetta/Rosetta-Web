import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectStep,
} from '@services/Onboarding/onboardingSlice';

import Start from '@components/Onboarding/Start';
import UserData from '@components/Onboarding/UserData';
import Identity from '@components/Onboarding/Identity';
import Papers from '@components/Onboarding/Papers';
import Wallet from '@components/Onboarding/Wallet';
import FollowPeople from '@components/Onboarding/FollowPeople';
import Photo from '@components/Onboarding/Photo';
import Skills from '@components/Onboarding/Skills';
import Discipline from '@components/Onboarding/Discipline';
import Leaders from '@components/Onboarding/Leaders';

import BgImg from '@assets/onboarding.jpeg';
import styles from './Onboarding.module.scss';

const Onboarding = () => {
  const step = useSelector(selectStep);

  return <div className={styles.grid}>
    <div className={styles.image}>
      <img src={BgImg} alt="Onboarding" />
    </div>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {step === 0 && <Start />}
        {step === 1 && <UserData />}
        {step === 2 && <Identity />}
        {step === 3 && <Papers />}

        {step === 4 && <Wallet />}
        {step === 5 && <FollowPeople />}
        {step === 6 && <Photo />}
        {step === 7 && <Skills />}
        {step === 8 && <Discipline />}
        {step === 9 && <Leaders />}
      </div>
    </div>
  </div>
}

export default Onboarding;
