import React from 'react';
import { Helmet } from 'react-helmet';

import translate from '../../locale';
import config from '../../config';

import './Aboutus.scss';

const AboutusPage = () => {
  const title = translate('common.aboutus');

  const head = (
    <Helmet key="aboutus-page">
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={title} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  return (
    <div className="aboutus-page-container">
      {head}
      <h3>{translate('common.aboutusQs1')}</h3>
      <p>{translate('common.aboutusAns1')}</p>
      <h3>{translate('common.aboutusQs2')}</h3>
      <p>{translate('common.aboutusAns2', { LINK: config.DATA_API })}</p>
      <h3>{translate('common.aboutusQs3')}</h3>
      <p>{translate('common.aboutusAns3')}</p>
      <h3>{translate('common.aboutusQs4')}</h3>
      <p>{translate('common.aboutusAns4')}</p>
      <h3>{translate('common.aboutusQs5')}</h3>
      <p>{translate('common.aboutusAns5', { EMAIL: config.EMAIL, LINKEDIN: config.LINKEDIN_URL })}</p>
      <div className="repo-link">
        <p>{translate('common.checkout')}</p>
        <a href={config.GITHUB_REPO} target="_blank" rel="noopener noreferrer">{translate('common.repoTitle')}</a>
      </div>
    </div>
  );
};

export default AboutusPage;
