import React from 'react';
import Button from '@components/Button';
import { useSelector } from 'react-redux';
import {
  selectStep,
} from '@services/Publish/publishSlice';

import styles from './Status.module.scss';

import {ReactComponent as CheckmarkIcon}  from '@assets/icons/checkmark-outline.svg'

const steps = [
  "Upload paper",
  "Research Outputs",
  "Citations",
  "Co-authors",
  "Sign & Submit",
  "Complete"
];

const Status = () => {
  const step = useSelector(selectStep);

  return <div className={styles.status}>
    <div className={styles.steps}>
      {
        steps.map((item, index) => <div key={item} className={`${styles.step} ${step === index ? styles.stepActive : ''} ${step >= (index+1) ? styles.stepDone : ''}`} >
          <div className={styles.stepIndex}>
            {
             step > index ? <CheckmarkIcon/> : (index + 1)
            }
          </div>
          <div className={styles.stepTitle}>{item}</div>
        </div>)
      }
    </div>
    <Button classes={styles.btn} kind={step !== 6 ? 'disabled' : 'fill'} size='md' disabled={step !== 6}>Publish paper</Button>
  </div>;
}

export default Status;
