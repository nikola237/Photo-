import React from 'react';
import topLogo from '../../assets/topLogo.png';
import { useStyles } from './Footer.styles';

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.footer}></div>
      {/* <img src={`${topLogo}`} alt="logo" className={classes.footer} /> */}
    </div>
  );
};

export default Footer;
