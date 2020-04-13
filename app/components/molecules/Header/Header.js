import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LocaleSelector from '../../atoms/LocaleSelector';
import translate from '../../../locale';
import config from '../../../config';

import './header.scss';

const Header = ({ onChangeLocale }) => {
  const [menuOpen, setMenuToggle] = useState(false);

  const toggleMenu = () => setMenuToggle(!menuOpen);
  const menuOpenOverlayStyle = { display: 'block', opacity: 1 };
  const menuOpenStyle = { transform: 'translateX(0px)' };

  return (
    <div className="header-container navbar-fixed">
      <nav className="red">
        <div className="container">
          <div className="nav-wrapper">
            <a href={config.USER_LIST_PAGE} className="brand-logo">
              {translate('common.appName')}
            </a>
            <LocaleSelector className="right" onChangeLocale={onChangeLocale} />
            <span onClick={toggleMenu} className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </span>
            <div
              className="sidenav-overlay"
              style={menuOpen ? menuOpenOverlayStyle : null}
              onClick={toggleMenu}
            />
            <ul
              id="slide-out"
              className="sidenav"
              style={menuOpen ? menuOpenStyle : null}
            >
              <li>
                <a className="subheader">{translate('common.menu')}</a>
              </li>
              <li>
                <div className="divider" />
              </li>
              <li>
                <Link to={config.USER_LIST_PAGE} className="item" onClick={toggleMenu}>
                  {translate('common.home')}
                </Link>
              </li>
              <li>
                <Link to={config.USER_CREATE_PAGE} className="item" onClick={toggleMenu}>
                  {translate('user.createUser')}
                </Link>
              </li>
              <li>
                <Link to={config.USER_LIST_PAGE} className="item" onClick={toggleMenu}>
                  {translate('user.searchUser')}
                </Link>
              </li>
              <li>
                <Link to={config.DASHBOARD_PAGE} className="item" onClick={toggleMenu}>
                  {translate('dashboard.title')}
                </Link>
              </li>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to={config.DASHBOARD_PAGE} className="item">
                  {translate('dashboard.title')}
                </Link>
              </li>
              <li>
                <Link to={config.USER_CREATE_PAGE} className="item">
                  {translate('user.createUser')}
                </Link>
              </li>
              <li>
                <Link to={config.USER_LIST_PAGE} className="item icon">
                  <span className="material-icons">search</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

Header.propTypes = {
  onChangeLocale: PropTypes.func
};

Header.defaultProps = {
  onChangeLocale: null
};

export default Header;
