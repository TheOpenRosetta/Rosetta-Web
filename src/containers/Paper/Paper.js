import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import {
  useParams,
  Link
} from "react-router-dom";
import Modal from 'react-modal';
import Chart from '@components/Chart';
import DisputeStory from '@components/DisputeStory';
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

import month from '@dataset/month.json';
import half from '@dataset/half.json';
import three from '@dataset/three.json';
import year from '@dataset/year.json';

import AvatarImg from '@assets/avatar.png';
import PrizeImg from '@assets/prize.png';

import {ReactComponent as ChevronIcon} from '@assets/icons/chevron-up-outline.svg';
import {ReactComponent as GiftIcon} from '@assets/icons/gift-outline.svg';
import {ReactComponent as DollarIcon} from '@assets/icons/bx-dollar.svg';

import {ReactComponent as ClockIcon} from '@assets/icons/clock-outline.svg';
import {ReactComponent as ShareIcon} from '@assets/icons/share-outline.svg';

import {ReactComponent as HashIcon} from '@assets/icons/hash-outline.svg';
import {ReactComponent as MessageIcon} from '@assets/icons/message-circle-outline.svg';
import {ReactComponent as AlertIcon} from '@assets/icons/alert-circle-outline.svg';
import {ReactComponent as CloseIcon} from '@assets/icons/close-outline.svg';

import styles from './Paper.module.scss';

const Paper = () => {
  const { paperId } = useParams();
  const dispatch = useDispatch();
  const paper = useSelector(selectPaper);
  // Dispute history modal
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [previewError, setPreviewError] = useState(false);
  const [key, setKey] = useState('month');
  const [data, setData] = useState([]);

  const [priceHistory, setPriceHistory] = useState(false);
  const [reward, setReward] = useState(false);

  useEffect(() => {
    dispatch(fetchPaper({ id: paperId }));
  }, [paperId, dispatch]);

  useEffect(() => {
    switch (key) {
      case 'month':
        setData([...month.data]);
        break;
      case 'three':
        setData([...three.data]);
        break;
      case 'half':
        setData([...half.data]);
        break;
      default:
        setData([...year.data]);
        break;
    }
  }, [key]);

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
          <div className={styles.version}>V{paper.version}  <Link to='/' className={styles.versionLink}> (See previous versions)</Link></div>
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
            <div className={styles.paperBadgeActions}>
              <Button classes={`${styles.paperBadgeBtn} ${styles.paperBadgeBtnBuy}`} type="button" size="sm" kind="fill">Buy</Button>
              <Button classes={`${styles.paperBadgeBtn} ${styles.paperBadgeBtnSell}`} type="button" size="sm" kind="fill">Sell</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className={styles.paperContent}>
        <div className={styles.paperAbstract}>
          <div className={styles.paperAbstractTitle}>Abstract</div>
          <div className={styles.paperAbstractText}>Authors earn Rosetta rewards based on the ImpactScore of the paper. This ensures that all authors that produce <Link to="/">Read more</Link></div>

          <div className={styles.dropdown}>
            <header className={styles.dropdownHeader} onClick={() => setPriceHistory(!priceHistory)}>
              <div className={styles.dropdownHeaderIcon}><DollarIcon /></div>
              <div className={styles.dropdownHeaderTitle}>Price history</div>
              <div className={styles.dropdownHeaderStatus}><ChevronIcon style={{ transform: `rotate(${reward ? '0deg' : '180deg'})` }}/></div>
            </header>
            {
              priceHistory && <div className={styles.dropdownBody}>
                <div className={styles.graph}>
                  <div className={styles.graphFrames}>
                    <button className={`${styles.graphToggle} ${key === 'month' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('month')}>1m</button>
                    <button className={`${styles.graphToggle} ${key === 'three' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('three')}>3m</button>
                    <button className={`${styles.graphToggle} ${key === 'half' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('half')}>6m</button>
                    <button className={`${styles.graphToggle} ${key === 'year' ? styles.graphToggleActive : ''}`} type="button" onClick={() => setKey('year')}>1y</button>
                  </div>
                  <Chart data={data} />
                </div>
              </div>
            }
          </div>

          <div className={styles.dropdown}>
            <header className={styles.dropdownHeader} onClick={() => setReward(!reward)}>
              <div className={styles.dropdownHeaderIcon}><GiftIcon /></div>
              <div className={styles.dropdownHeaderTitle}>Reward pools</div>
              <div className={styles.dropdownHeaderStatus}><ChevronIcon style={{ transform: `rotate(${reward ? '0deg' : '180deg'})` }}/></div>
            </header>
            {
              reward && <div className={styles.dropdownBody}>
                <div className={styles.rewards}>
                  <div className={styles.rewardsItem}>
                    <div className={styles.rewardsItemTitle}>Replication</div>
                    <div className={styles.rewardsItemContent}>
                      <div className={styles.rewardsItemContentIcon}>
                        <img src={PrizeImg} alt="Prize icon"/>
                      </div>
                      <div className={styles.rewardsItemContentTitle}>$9,333</div>
                    </div>
                  </div>
                  <div className={styles.rewardsItem}>
                    <div className={styles.rewardsItemTitle}>Critical discussion</div>
                    <div className={styles.rewardsItemContent}>
                      <div className={styles.rewardsItemContentIcon}>
                        <img src={PrizeImg} alt="Prize icon"/>
                      </div>
                      <div className={styles.rewardsItemContentTitle}>$1,363</div>
                    </div>
                  </div>
                  <div className={styles.rewardsItem}>
                    <div className={styles.rewardsItemTitle}>Translations</div>
                    <div className={styles.rewardsItemContent}>
                      <div className={styles.rewardsItemContentIcon}>
                        <img src={PrizeImg} alt="Prize icon"/>
                      </div>
                      <div className={styles.rewardsItemContentTitle}>$333</div>
                    </div>
                  </div>
                </div>
                <div className={styles.rewardsActions}>
                  <Button classes={styles.rewardsBtn} type="button" size="md" kind="disabled">Reward</Button>
                  <Button classes={styles.rewardsBtn} type="button" size="md" kind="bordered" onClick={openModal}><ClockIcon/> Dispute History</Button>
                </div>
              </div>
            }
          </div>

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

    <Modal
      isOpen={modalIsOpen}
      className="modal"
      onRequestClose={closeModal}
      contentLabel="Dispute history"
    >
      <div className={styles.modal}>
        <button className={styles.modalClose} onClick={closeModal}>
          <CloseIcon />
        </button>
        <DisputeStory paper={paper} />
      </div>
    </Modal>
  </div>
}

export default Paper;
