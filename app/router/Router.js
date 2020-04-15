/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import config from '../config';
import NotFoundModule from '../modules/NotFound/Loadable';
import DashboardHomeModule from '../modules/Dashboard/pages/home/Loadable';
import DashboardStateModule from '../modules/Dashboard/pages/state/Loadable';
import UsefulLinksModule from '../modules/UsefulLinks/Loadable';
import AboutusModule from '../modules/Aboutus/Loadable';
import PlaceModule from '../modules/Place/pages/Loadable';
import Header from '../components/molecules/Header';
import Footer from '../components/molecules/Footer';
import LocaleContext from '../locale/localeContext';
import { setLocaleCookie } from '../services/cookieService';
import AnalyticService from '../services/analyticService';

const Router = ({ history }) => {
  const [selectedLocale, setSelectedLocale] = useState(config.FALLBACK_LANGUAGE);

  // tracking route for analytics
  useEffect(() => {
    history.listen(({ pathname }, action) => {
      AnalyticService.track(AnalyticService.EVENT.PAGE, `${pathname} route visited`);
    });
  }, [history]);

  // setting up cookie for default language
  useEffect(() => {
    setLocaleCookie(config.FALLBACK_LANGUAGE);
  }, []);

  // updating cookie if language is selected
  const onChangeLocale = (val) => {
    setLocaleCookie(selectedLocale);
    setSelectedLocale(val);
  };

  return (
    <LocaleContext.Provider value={{ lang: selectedLocale }}>
      <div className="app-container">
        <Header onChangeLocale={onChangeLocale} />
        <div className="body-container container">
          <Switch>
            <Route
              exact
              path={config.DASHBOARD_PAGE}
              render={(props) => <DashboardHomeModule {...props} />}
            />
            <Route
              exact
              path={config.DASHBOARD_STATE_PAGE}
              render={(props) => <DashboardStateModule {...props} />}
            />
            <Route
              exact
              path={config.UNSAFE_PLACES_PAGE}
              render={(props) => <PlaceModule {...props} />}
            />
            <Route
              exact
              path={config.USEFUL_LINKS_PAGE}
              render={(props) => <UsefulLinksModule {...props} />}
            />
            <Route
              exact
              path={config.ABOUT_US_PAGE}
              render={(props) => <AboutusModule {...props} />}
            />
            <Route path="" render={(props) => <NotFoundModule {...props} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    </LocaleContext.Provider>
  );
};

export default withRouter(Router);
