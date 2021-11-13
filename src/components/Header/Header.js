import React, { useState } from 'react';
import Modal from 'react-modal';
import Logo from '@components/Logo';
import Avatar from '@components/Avatar';
import Button from '@components/Button';
import { Popover } from 'react-tiny-popover';
import HeaderSearch from './HeaderSearch';
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import {
  selectStatus,
  selectUser,
  logout
} from '@services/Auth/authSlice';

import styles from './Header.module.scss';
import {ReactComponent as ArrowUpIcon} from '@assets/icons/arrow-ios-upward-outline.svg';
import {ReactComponent as ArrowDownIcon} from '@assets/icons/arrow-ios-downward-outline.svg';

Modal.setAppElement('#root');

const Header = ({ className }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return <header className={`${styles.header} ${className}`}>
    <div className="container">
      <div className={styles.grid}>
        <Logo />
        <HeaderSearch />
        <div className={styles.user}>
          {
            status ? <>
              <Popover
                isOpen={isPopoverOpen}
                positions={['bottom', 'left']}
                padding={10}
                onClickOutside={() => setIsPopoverOpen(false)}
                align="end"
                content={<div className={styles.popoverContent}>
                  <Button element={Link} to={`/user/${user.id}`} size="sm" kind="secondary" classes={styles.menuLink}>Profile</Button>
                  <Button size="sm" kind="outline" classes={styles.logout} onClick={()=>dispatch(logout())}>Logout</Button>
                </div>}
              >
                <div className={styles.popoverBtn} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                  <Avatar src={user.avatar} title={user.name} size="lg" kind="bordered" />
                  {
                    isPopoverOpen ? <ArrowUpIcon /> : <ArrowDownIcon />
                  }
                </div>
              </Popover>
            </> : <>
              <Link to="/sign_in" className={styles.signIn}>Sign in</Link>
              <Button element={Link} to="/onboarding" size="lg" kind="fill" classes={styles.createAccount}>Create Free account</Button>
            </>
          }
        </div>
      </div>
    </div>
  </header>
}

export default Header;
