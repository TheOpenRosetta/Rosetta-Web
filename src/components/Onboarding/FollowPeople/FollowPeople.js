import React, { useState } from 'react';
import Status from '../Status';
import Button from '@components/Button';
import FollowCard from '@components/FollowCard';
import { useDispatch } from 'react-redux';
import {
  prevStep,
  nextStep
} from '@services/Onboarding/onboardingSlice';

import styles from './FollowPeople.module.scss';

import AcademiaIcon from '@assets/followIcons/academia.png';
import BookIcon from '@assets/followIcons/book.png';
import ResearchIcon from '@assets/followIcons/research.png';
import CoauthorsIcon from '@assets/followIcons/coauthors.png';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-ios-back-outline.svg'
import {ReactComponent as ArrowForwardIcon}  from '@assets/icons/arrow-forward-outline.svg'

import AvatarImg from '@assets/avatar.png';

const follows = [
  { title: 'Follow your Research Gate Friends', icon: ResearchIcon, value: "researchGate" },
  { title: 'Follow your Academia Friends', icon: AcademiaIcon, value: "academia" },
  { title: 'Follow your email address book Friends ', icon: BookIcon, value: "bookAddress" },
  { title: 'Follow your co-authors', icon: CoauthorsIcon, value: "coauthors" }
];

const categories = [
  { title: 'Exploratory', value: 'exploratory' },
  { title: 'Theoretical', value: 'theoretical' },
  { title: 'Applied', value: 'applied' },
  { title: 'Quantitative', value: 'quantitative' },
  { title: 'Descriptive', value: 'descriptive' },
  { title: 'Qualitative', value: 'qualitative' }
];

const followUsers = [
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 111 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 112 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 113 },
  { firstName: 'Anila', lastName: 'Pandy', photo: AvatarImg, description: 'Founder at Gugugaga', authorid: 114 }
];

const FollowPeople = () => {
  const [cat, setCat] = useState(null);
  const dispatch = useDispatch();
  const onChangeValue = (event) => setCat(event.target.value);

  return <div className={styles.followPeople}>
    <Status />
    <div className={styles.title}>Let’s find some people you know</div>
    <div className={styles.followGroups}>
      {
        follows.map(item => <div className={styles.followItem} key={item.value}>
          <img src={item.icon} alt={item.value} />
          <div className={styles.followItemTitle}>{item.title}</div>
          <ArrowForwardIcon className={styles.followItemIcon}/>
        </div>)
      }
    </div>
    <div className={styles.categories}>
      <div className={styles.categoriesTitle}>Select Category:</div>
      <div className={styles.categoriesList} onChange={onChangeValue}>
        {
          categories.map(item => <label htmlFor={item.value} key={item.value} className={`${styles.categoriesItem} ${cat === item.value ? styles.categoriesItemActive : ''}`}>
            <input id={item.value} type="radio" value={item.value} name="gender" />
            {item.title}
          </label>)
        }
      </div>
    </div>
    <div className={styles.suggestions}>
      <div className={styles.suggestionsTitle}>Follow suggestion</div>
      <div className={styles.suggestionsList}>
        {
          followUsers.map(item => <FollowCard
            key={item.authorid}
            name={`${item.firstName} ${item.lastName}`}
            photo={item.photo}
            click={() => console.log(item.authorid)}
            description={item.description}
            className={styles.suggestionsItem}
          />)
        }
      </div>
    </div>

    <div className={styles.actions}>
      <Button classes={styles.back} kind="secondary" size="lg" onClick={() => dispatch(prevStep())}><ArrowBackIcon /> Back</Button>
      <Button classes={styles.next} kind="fill" size="lg" onClick={() => dispatch(nextStep())}>Next</Button>
    </div>
  </div>;
}

export default FollowPeople;
