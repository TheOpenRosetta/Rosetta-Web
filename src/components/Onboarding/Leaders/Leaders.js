import React from 'react';
import Status from '../Status';
import Button from '@components/Button';
import FollowCard from '@components/FollowCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFollowUsers,
  selectUsers,
  prevStep,
  nextStep
} from '@services/Onboarding/onboardingSlice';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-ios-back-outline.svg'

import styles from './Leaders.module.scss';

// TEST
import AvatarImg from '@assets/avatar.png';
const followUsers = [
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 111 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 112 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 113 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 114 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 115 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 116 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 117 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 118 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 119 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 110 }
];

const Leaders = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  return <div className={styles.leaders}>
    <Status />
    <div className={styles.title}>Choose some key thought leaders from those new industries</div>
    <div className={styles.subtitle}>Choose some interests that you’d like to follow, and stay in the loop.</div>
    <div className={styles.leadersList}>
      {
        followUsers.map(item => <FollowCard
          key={item.authorid}
          name={`${item.firstName} ${item.lastName}`}
          photo={item.photo}
          followed={users.some(u => u === item.authorid)}
          click={() => dispatch(setFollowUsers(item.authorid))}
          description={item.description}
          className={styles.leadersItem}
        />)
      }
    </div>


    <div className={styles.actions}>
      <Button classes={styles.back} kind="secondary" size="lg" onClick={() => dispatch(prevStep())}><ArrowBackIcon /> Back</Button>
      <Button classes={styles.next} kind="fill" size="lg" onClick={() => dispatch(nextStep())}>Next</Button>
    </div>
  </div>;
}

export default Leaders;
