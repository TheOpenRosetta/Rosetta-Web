import React from 'react';
import { Link } from "react-router-dom";

import styles from './Logo.module.scss';

const Logo = ({ inverse = false, className }) => <Link to="/" className={`${styles.logo} ${inverse ? styles.inverse : ''} ${className}`}>Rosetta</Link>;

export default Logo;
