import React, { useState } from 'react';
import Status from '../Status';
import Button from '@components/Button';
import SelectItemsForm from '@forms/SelectItemsForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSkills,
  setSkills,
  prevStep,
  nextStep
} from '@services/Onboarding/onboardingSlice';
import skillList from '@config/skills';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-ios-back-outline.svg';
import styles from './Skills.module.scss';

const Skills = () => {
  const dispatch = useDispatch();
  const [suggestList, setSuggestList] = useState(skillList);
  const [list, setList] = useState(useSelector(selectSkills));

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

  const next = () => {
    dispatch(setSkills(list));
    dispatch(nextStep());
  }

  return <div className={styles.skills}>
    <Status />
    <div className={styles.title}>Add your skills & expertise</div>
    <div className={styles.subtitle}>This helps people understand what your core competencies are when collaborating.</div>

    <SelectItemsForm
      name="Skill"
      className={styles.form}
      addToList={addToList}
      removeFromList={removeFromList}
      list={list}
      suggestList={suggestList}
    />

    <div className={styles.actions}>
      <Button classes={styles.back} kind="secondary" size="lg" onClick={() => dispatch(prevStep())}><ArrowBackIcon /> Back</Button>
      <Button classes={styles.next} kind="fill" size="lg" onClick={next}>Next</Button>
    </div>
  </div>;
}

export default Skills;
