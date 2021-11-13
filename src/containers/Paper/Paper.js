import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import {
  useParams,
  Link
} from "react-router-dom";

import PDFViewer from '@components/PDFViewer';
import PDFComments from '@components/PDFComments';
import Header from '@components/Header';
import Button from '@components/Button';
import Avatar from '@components/Avatar';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectPaper,
  setHighlights,
  fetchPaper,
} from '@services/Paper/paperSlice';

// import pdfFile from '../../schemas/test_doc.pdf';

import AvatarImg from '@assets/avatar.png';
// import {ReactComponent as PeopleIcon} from '@assets/icons/person-add-outline.svg';
import {ReactComponent as ShareIcon} from '@assets/icons/share-outline.svg';

import {ReactComponent as HashIcon} from '@assets/icons/hash-outline.svg';
import {ReactComponent as MessageIcon} from '@assets/icons/message-circle-outline.svg';
import {ReactComponent as AlertIcon} from '@assets/icons/alert-circle-outline.svg';

import styles from './Paper.module.scss';

const Paper = () => {
  const { paperId } = useParams();
  const dispatch = useDispatch();
  const paper = useSelector(selectPaper);

  const [previewError, setPreviewError] = useState(false);

  // const [table, setShowTable] = useState(false);
  // const [priceHistory, setPriceHistory] = useState(false);
  // const [reward, setReward] = useState(false);

  useEffect(() => {
    dispatch(fetchPaper({ id: paperId }));
  }, [paperId, dispatch]);

  return <div className={styles.paper}>
    <Header className={styles.paperHeader} />
    <div className={styles.paperTop}>
      <div className="container">
        <div className={styles.paperTopContent}>
          <div className={styles.date}>{DateTime.fromISO(paper.date).toFormat('MMM-dd-yyyy')}</div>
          <div className={styles.title}>{paper.title}</div>
          {
            paper.authors.length > 0 && <div className={styles.authors}>By {paper.authors.map(item => item.name).join(', ')}</div>
          }
          <div className={styles.version}>V{paper.version}</div>
          <div className={styles.paperActionWrapper}>
            <button className={styles.paperAction} type="button" onClick={() => {}}><ShareIcon /></button>
            <button className={styles.paperAction} type="button" onClick={() => {}}><MessageIcon /></button>
            <button className={styles.paperAction} type="button" onClick={() => {}}><HashIcon /></button>
            <button className={styles.paperAction} type="button" onClick={() => {}}><AlertIcon /></button>
          </div>
          <div className={styles.paperBadge}>
            <div className={styles.paperBadgeTitle}>Price</div>
            <div className={styles.paperBadgePrice}>$1984 <span className={`${styles.paperBadgePricePercent}`}>(+7.00%)</span></div>
            <div className={styles.paperBadgeApy}>APY: 7.5%</div>
            <div className={styles.paperBadgeTitle}>Owned by</div>
            <ul className={styles.paperBadgeUsers}>
              {
                paper.authors.map(item => <li key={`investor-${item.id}`} className={styles.paperBadgeUsersItem}>
                  <Avatar src={AvatarImg} title={item.name} kind="bordered" size="sm" classes={styles.avatar} />
                </li>)
              }
            </ul>
            <Button classes={styles.paperBadgeBtn} type="button" size="sm" kind="fill">Buy now</Button>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className={styles.paperContent}>
        <div className={styles.paperAbstract}>
          <div className={styles.paperAbstractTitle}>Abstract</div>
          <div className={styles.paperAbstractText}>Authors earn Rosetta rewards based on the ImpactScore of the paper. This ensures that all authors that produce <Link to="/">Read more</Link></div>
          <div className={`${styles.paperPreview} ${previewError || !paper.url ? styles.paperPreviewError : ''}`}>
            <PDFViewer setPreviewError={setPreviewError} url={paper.url} highlights={paper.highlights} setHighlights={(data) => dispatch(setHighlights(data))} />
          </div>
        </div>
        <div className={styles.paperComments}>
          <div className={styles.paperCommentsTitle}>Comments</div>
          {
            paper.highlights.length === 0 ?
              <div className={styles.paperCommentsEmpty}>No comments yet</div>
              :
              <PDFComments highlights={paper.highlights} />
          }
        </div>
      </div>
    </div>
  </div>
}

export default Paper;
