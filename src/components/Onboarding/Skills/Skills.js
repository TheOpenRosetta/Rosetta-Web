import React, { useState } from 'react';
import Status from '../Status';
import Button from '@components/Button';
import SelectItemsForm from '@forms/SelectItemsForm';
import { useDispatch } from 'react-redux';
import {
  prevStep,
  nextStep
} from '@services/Onboarding/onboardingSlice';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-ios-back-outline.svg';
import styles from './Skills.module.scss';

const suggestDefault = ['Some skill', 'Some skill', 'Some skill', 'Some skill'];

const Skills = () => {
  const [suggestList, setSuggestList] = useState(suggestDefault);
  const [list, setList] = useState([]);

  const addToSuggestList = (el) => {
    setSuggestList([...suggestList, el]);
  }

  const addToList = (el) => {
    const tempList = suggestList;
    const index = tempList.indexOf(el);
    if (index > -1) {
      tempList.splice(index, 1);
      setSuggestList(tempList || []);
    }
    setList([...list, el]);
  }

  const removeFromList = (el) => {
    const tempList = list;
    const index = tempList.indexOf(el);
    if (index > -1) {
      tempList.splice(index, 1);
      setList(tempList);
    }
    setSuggestList([...suggestList, el]);
  }

  const dispatch = useDispatch();
  return <div className={styles.skills}>
    <Status />
    <div className={styles.title}>Add your skills & expertise</div>
    <div className={styles.subtitle}>This helps people understand what your core competencies are when collaborating.</div>

    <SelectItemsForm
      name="Skill"
      className={styles.form}
      addToSuggestList={addToSuggestList}
      addToList={addToList}
      removeFromList={removeFromList}
      list={list}
      suggestList={suggestList}
    />

    <div className={styles.actions}>
      <Button classes={styles.back} kind="secondary" size="lg" onClick={() => dispatch(prevStep())}><ArrowBackIcon /> Back</Button>
      <Button classes={styles.next} kind="fill" size="lg" onClick={() => dispatch(nextStep())}>Next</Button>
    </div>
  </div>;
}

export default Skills;
