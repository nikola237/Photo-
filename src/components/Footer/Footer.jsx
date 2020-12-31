import React from 'react';

import { useStyles } from './Footer.styles';

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.footer}></div>
    </div>
  );
};

export default Footer;
