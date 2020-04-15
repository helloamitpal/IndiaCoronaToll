import React from 'react';
import { Helmet } from 'react-helmet';

import translate from '../../locale';

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
    </div>
  );
};

export default AboutusPage;
