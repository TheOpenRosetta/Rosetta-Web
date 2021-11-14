import React from 'react';
import Area from '@components/Area';
import { Link } from "react-router-dom";
import {ReactComponent as ArrowIcon} from '@assets/icons/diagonal-arrow-right-up-outline.svg';
import { priceFormat } from '@utils/numbers';

import { useSelector } from 'react-redux';
import {
  selectUser,
} from '@services/Auth/authSlice';

import styles from './PortfolioBlock.module.scss';

const PortfolioBlock = () => {
  const data = useSelector(selectUser);

  // Block Header
  const header = <div className={styles.header}>
    <div className={styles.title}>Portfolio</div>
    <Link to='/portfolio' className={styles.link}>See portfolio <ArrowIcon/></Link>
  </div>;

  // Block Content
  const content = <div className={styles.content}>
    <div className={styles.balance}>
      <span className={styles.balanceCount}>${priceFormat(data.balance)}</span>
      <span className={styles.balanceSubtitle}>Balance</span>
    </div>
    <div className={styles.yieldPayment}>
      <span className={styles.yieldPaymentCount}>${priceFormat(data.monthlyYield)}</span>
      <span className={styles.yieldPaymentSubtitle}>Monthly Yield Payment</span>
    </div>
  </div>

  return <Area header={header} content={content} classes={styles.block} />
}

export default PortfolioBlock;
