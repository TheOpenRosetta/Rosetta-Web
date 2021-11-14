import React, { useEffect } from 'react';
import Layout from '@components/Layout';
import Button from '@components/Button';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectData,
  fetchJury
} from '@services/Jury/jurySlice';

import styles from './Jury.module.scss';

import {ReactComponent as LikeIcon} from '@assets/customIcons/thumbs-up.svg';

const Jury = () => {
  const data = useSelector(selectData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJury());
  }, [dispatch]);

  return <div className={styles.jury}>
    <Layout navigation={false}>
      <div className={styles.title}>Recent Dispute</div>
      <div className={styles.list}>
        {
          data.map(item => <div className={styles.item} key={item.id}>
            <div className={styles.itemContent}>
              <div className={styles.itemTitle}>{item.title}</div>
              <div className={styles.itemText}>{item.text}</div>
              <div className={styles.rates}>
                <div className={`${styles.ratesItem} ${styles.ratesItemAgree}`}>
                  <LikeIcon /> Agree: <div className={styles.ratesItemNumber}>{item.agree}</div>
                </div>
                <div className={`${styles.ratesItem} ${styles.ratesItemDisagree}`}>
                  <LikeIcon style={{ transform: `rotate(180deg)` }} /> Disagree: <div className={styles.ratesItemNumber}>{item.disagree}</div>
                </div>
              </div>
            </div>
            <div className={styles.itemVotes}>
              <div className={styles.vote}>
                <div className={styles.voteTitle}>Fraud</div>
                <div className={styles.actions}>
                  <Button classes={styles.actionsAgree} type="button" size="sm" kind="fill" onClick={() => console.log("Agree with #", item.id)}>
                    <LikeIcon /> <span className={styles.actionsBtnText}>Agree</span>
                  </Button>
                  <Button classes={styles.actionsDisagree} type="button" size="sm" kind="outline" onClick={() => console.log("Disagree with #", item.id)}>
                    <LikeIcon style={{ transform: `rotate(180deg)` }} /><span className={styles.actionsBtnText}>Disagree</span>
                  </Button>
                </div>
              </div>
              <div className={styles.vote}>
                <div className={styles.voteTitle}>Mistakes</div>
                <div className={styles.actions}>
                  <Button classes={styles.actionsAgree} type="button" size="sm" kind="fill" onClick={() => console.log("Agree with #", item.id)}>
                    <LikeIcon /> <span className={styles.actionsBtnText}>Agree</span>
                  </Button>
                  <Button classes={styles.actionsDisagree} type="button" size="sm" kind="outline" onClick={() => console.log("Disagree with #", item.id)}>
                    <LikeIcon style={{ transform: `rotate(180deg)` }} /><span className={styles.actionsBtnText}>Disagree</span>
                  </Button>
                </div>
              </div>
              <div className={styles.vote}>
                <div className={styles.voteTitle}>Weak</div>
                <div className={styles.actions}>
                  <Button classes={styles.actionsAgree} type="button" size="sm" kind="fill" onClick={() => console.log("Agree with #", item.id)}>
                    <LikeIcon /> <span className={styles.actionsBtnText}>Agree</span>
                  </Button>
                  <Button classes={styles.actionsDisagree} type="button" size="sm" kind="outline" onClick={() => console.log("Disagree with #", item.id)}>
                    <LikeIcon style={{ transform: `rotate(180deg)` }} /><span className={styles.actionsBtnText}>Disagree</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
    </Layout>
  </div>
}

export default Jury;
