import React, { useState } from 'react';
import Modal from 'react-modal';
import Logo from '@components/Logo';
import Avatar from '@components/Avatar';
import Button from '@components/Button';
import { Popover } from 'react-tiny-popover';
import HeaderSearch from './HeaderSearch';
import { Link } from "react-router-dom";

import styles from './Header.module.scss';
import AvatarImg from '@assets/avatar.png';
import {ReactComponent as ArrowUpIcon} from '@assets/icons/arrow-ios-upward-outline.svg';
import {ReactComponent as ArrowDownIcon} from '@assets/icons/arrow-ios-downward-outline.svg';


Modal.setAppElement('#root');

const Header = () => {
  // TODO: get the data from API (in account info)
  const data = {
    photo: AvatarImg,
    name: "Anthony Rayan"
  };

  const [auth, setAuth] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return <header className={styles.header}>
    <div className="container">
      <div className={styles.grid}>
        <Logo />
        <HeaderSearch />
        <div className={styles.user}>
          {
            auth ? <>
              <Popover
                isOpen={isPopoverOpen}
                positions={['bottom', 'left']}
                padding={10}
                onClickOutside={() => setIsPopoverOpen(false)}
                align="end"
                content={<div className="popover__content">Some content in popover</div>}
              >
                <div className={styles.popoverBtn} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                  <Avatar src={data.photo} title={data.name} size="lg" kind="bordered" />
                  {
                    isPopoverOpen ? <ArrowUpIcon /> : <ArrowDownIcon />
                  }
                </div>
              </Popover>
            </> : <>
              <Link to="/sign_in" className={styles.signIn}>Sign in</Link>
              <Button element={Link} to="create_account" size="lg" kind="fill" classes={styles.createAccount}>Create Free account</Button>
            </>
          }
        </div>
      </div>
    </div>
  </header>
}

export default Header;
