import React from 'react';
import { Helmet } from 'react-helmet';

import translate from '../../locale';
import config from '../../config';

import './UsefulLinks.scss';

const UsefulLinksPage = () => {
  const title = translate('common.usefulLinks');

  const head = (
    <Helmet key="usefullink-page">
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={title} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  return (
    <div className="usefullink-page-container">
      {head}
      <a href={config.HELPLINE_LINK} target="_blank" rel="noopener noreferrer">
        {translate('common.helpline')}
      </a>
      <a href={config.GOVT_HEALTH_MINISTRY_LINK} target="_blank" rel="noopener noreferrer">
        {translate('common.healthMinistry')}
      </a>
      <a href={config.WHO_LINK} target="_blank" rel="noopener noreferrer">
        {translate('common.who')}
      </a>
      <a href={config.CDC_LINK} target="_blank" rel="noopener noreferrer">
        {translate('common.cdc')}
      </a>
      <a href={config.CROWDSOURCE_LINK} target="_blank" rel="noopener noreferrer">
        {translate('common.crowdsource')}
      </a>
      <a href={config.WORLDWIDE_CASE_URL} target="_blank" rel="noopener noreferrer">
        {translate('common.worldwideTitle')}
      </a>
    </div>
  );
};

export default UsefulLinksPage;
