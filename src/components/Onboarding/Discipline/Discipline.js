import React, { useState } from 'react';
import Status from '../Status';
import Button from '@components/Button';
import SelectItemsForm from '@forms/SelectItemsForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDisciplines,
  selectDisciplines,
  selectOnboardingError,
  selectPublishData,
  createUser,
  prevStep
} from '@services/Onboarding/onboardingSlice';
import disciplinesList from '@config/disciplines';

import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-ios-back-outline.svg';
import styles from './Discipline.module.scss';

const Discipline = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectOnboardingError);
  const publishData = useSelector(selectPublishData);
  const [suggestList, setSuggestList] = useState(disciplinesList);
  const [list, setList] = useState(useSelector(selectDisciplines));

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

  const next = () => {
    dispatch(setDisciplines(list));
    dispatch(createUser({
      ...publishData,
      disciplines: [...list]
    }));
  }

  return <div className={styles.discipline}>
    <Status />
    <div className={styles.title}>Select your discipline</div>
    <div className={styles.subtitle}>This helps people find you when searching for the right collaborators.</div>

    <SelectItemsForm
      name="Discipline"
      className={styles.form}
      addToSuggestList={addToSuggestList}
      addToList={addToList}
      removeFromList={removeFromList}
      list={list}
      suggestList={suggestList}
    />

    {
      error && <div className={styles.error}>{error}</div>
    }

    <div className={styles.actions}>
      <Button classes={styles.back} kind="secondary" size="lg" onClick={() => dispatch(prevStep())}><ArrowBackIcon /> Back</Button>
    <Button classes={styles.next} kind="fill" size="lg" onClick={next}>Create profile</Button>
    </div>
  </div>;
}

export default Discipline;
