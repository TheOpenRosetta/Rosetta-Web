import React from 'react';
import {
  Link,
  useRouteMatch
} from "react-router-dom";

import {ReactComponent as HomeIcon} from '@assets/icons/home-outline.svg';
import {ReactComponent as InboxIcon} from '@assets/icons/message-circle-outline.svg';
import {ReactComponent as NotificationIcon} from '@assets/icons/bell-outline.svg';
import {ReactComponent as QuestionIcon} from '@assets/icons/question-mark-circle-outline.svg';

import styles from './Navigation.module.scss';

const links = [
  { text: 'Home', href: '/', icon: <HomeIcon /> },
  { text: 'Inbox', href: '/inbox', icon: <InboxIcon /> },
  { text: 'Notification', href: '/notification', icon: <NotificationIcon /> },
  { text: 'Q & A', href: '/help', icon: <QuestionIcon /> }
];

const NavLink = ({ icon, text, to, activeOnlyWhenExact }) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });

  return <Link to={to} className={`${match ? styles.linkActive : styles.link}`}>{icon} <span className={styles.linkText}>{text}</span></Link>
}

const Navigation = () => {
  return (<nav className={styles.nav}>
    {
      links.map(item => <NavLink activeOnlyWhenExact={true} key={item.text} icon={item.icon} text={item.text} to={item.href} />)
    }
  </nav>)
};

export default Navigation;
