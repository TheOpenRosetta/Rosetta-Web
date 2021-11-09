import React, { useState } from 'react';
import {
  useHistory
} from "react-router-dom";
import Button from '@components/Button';
import Status from '../Status';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  selectPublishData,
} from '@services/Onboarding/onboardingSlice';

import styles from './Finish.module.scss';

const Finish = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const publishData = useSelector(selectPublishData);
  const publishAction = () => {
    axios.post(`https://rosetta.eastus.cloudapp.azure.com/api/v1/onboarduser/`, publishData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })
      .then((response) => {
        const { data } = response;
        if (data.statusCode === 200) {
          history.push("/");
        } else {
          setError(data.message);
        }
      })
      .catch(function (error) {
        setError(error.message);
      });
  }

  const exploreAction = () => {
    alert("Explore");
  }

  return <div className={styles.finish}>
    <Status />
    <div className={styles.title}>Ready to publish your first paper?</div>
    <div className={styles.subtitle}>Start exploring, or publish your first paper on Rosetta.</div>

    <div className={styles.actions}>
      <Button classes={styles.btn} kind="fill" size="lg" onClick={publishAction}>Publish</Button>
      <Button classes={styles.btn} kind="secondary" size="lg" onClick={exploreAction}>Explore</Button>
    </div>

    {
      error && <div className={styles.error}>{error}</div>
    }
  </div>;
}

export default Finish;
