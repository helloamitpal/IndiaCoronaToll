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
    </div>
  );
};

export default AboutusPage;
