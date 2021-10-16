import React, { useState } from 'react';
import Button from '@components/Button';
import Status from '../Status';
import { useDispatch } from 'react-redux';
import {
  prevStep,
  nextStep,
  setPhoto
} from '@services/Onboarding/onboardingSlice';
import {ReactComponent as ArrowBackIcon}  from '@assets/icons/arrow-ios-back-outline.svg'
import AddUserPhotoForm from '@forms/AddUserPhotoForm';

import styles from './Photo.module.scss';

const Photo = () => {
  const [file, saveFile] = useState(null);
  const dispatch = useDispatch();
  const loadPhoto = (file) => {
    saveFile(file);
  }
  const next = () => {
    if (file) {
      dispatch(setPhoto(file));
    }
    dispatch(nextStep());
  }
  return <div className={styles.photo}>
    <Status />
    <div className={styles.title}>Add a profile photo</div>
    <div className={styles.subtitle}>Adding a photo helps people recognise you, and increases the liklihood of collaborations.</div>
    <AddUserPhotoForm action={loadPhoto} />

    <div className={styles.actions}>
      <Button classes={styles.back} kind="secondary" size="lg" onClick={() => dispatch(prevStep())}><ArrowBackIcon /> Back</Button>
      <Button classes={styles.next} kind="fill" size="lg" onClick={next}>Next</Button>
    </div>
  </div>;
}

export default Photo;
