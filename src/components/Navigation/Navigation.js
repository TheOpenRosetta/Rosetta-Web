import React from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";

import {ReactComponent as HomeIcon} from '@assets/icons/home-outline.svg';
import {ReactComponent as InboxIcon} from '@assets/icons/message-circle-outline.svg';
import {ReactComponent as NotificationIcon} from '@assets/icons/bell-outline.svg';
import {ReactComponent as QuestionIcon} from '@assets/icons/question-mark-circle-outline.svg';
import {ReactComponent as PaperIcon} from '@assets/icons/file-text-outline.svg';
import {ReactComponent as ListIcon} from '@assets/icons/list-outline.svg';

import styles from './Navigation.module.scss';

const links = [
  { text: 'Home', href: '/', icon: <HomeIcon /> },
  { text: 'Inbox', href: '/inbox', icon: <InboxIcon /> },
  { text: 'Notification', href: '/notification', icon: <NotificationIcon /> },
  { text: 'Q & A', href: '/help', icon: <QuestionIcon /> },
  { text: 'Portfolio', href: '/portfolio', icon: <ListIcon /> }
];

const NavLink = ({ icon, text, to, activeOnlyWhenExact }) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  const mod = to.slice(1);

  return <Link to={to} className={`${match ? styles.linkActive : styles.link} ${styles[mod]}`}>{icon} <span className={styles.linkText}>{text}</span></Link>
}

const Navigation = ({ className = '' }) => {
  return (<nav className={`${styles.nav} ${className}`}>
    {
      links.map(item => <NavLink activeOnlyWhenExact={true} key={item.text} icon={item.icon} text={item.text} to={item.href} />)
    }
    <NavLink activeOnlyWhenExact={true} icon={<PaperIcon />} text="Publish" to='/publish' />
  </nav>)
};

export default Navigation;
