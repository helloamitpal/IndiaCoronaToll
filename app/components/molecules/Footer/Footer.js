import React from 'react';
import { Link } from 'react-router-dom';

import translate from '../../../locale';
import config from '../../../config';

import './footer.scss';

const Footer = () => (
  <footer className="page-footer red">
    <div className="footer-copyright">
      <p className="container">
        <Link to={config.ABOUT_US_PAGE} className="item">
          {translate('common.aboutus')}
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
