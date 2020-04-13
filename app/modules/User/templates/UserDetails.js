/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import translate from '../../../locale';

import './UserDetails.scss';

const UserDetails = ({ details: { regions, tsn, personalInfo: { name, email, img }, packages, addOnServices } }) => {
  const regionList = regions.map(({ region, area, Country }, acc, index) => (
    `${region}, ${area}, ${Country}${index < regions.length - 1 ? '</br>' : ''}`
  ));

  return (
    <div className="user-details-container">
      <section className="profile">
        <LazyLoadImage src={img} alt="user_profile_pic" />
        <div>
          <div>{`${name} (${tsn})`}</div>
          <div>{email}</div>
          <div dangerouslySetInnerHTML={{ __html: regionList }} />
        </div>
      </section>
      <section className="package-container">
        <h2>{translate('user.addedPkgTitle')}</h2>
        {
          packages.map(({ name: packageName, packageId, price, channel }) => (
            <div key={`pkg-${packageId}`}>
              <h3>{`${packageName} : ${price}Rs`}</h3>
              <ul className="sub-container">
                {
                  channel.map(({ channelNumber, name: channelName, img: channelImg }) => (
                    <li key={`pkg-${packageId}-${channelNumber}`}>
                      <LazyLoadImage src={channelImg} alt="channel_img" />
                      <p>{channelName}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </section>
      <section className="addons-container">
        <h2>{translate('user.addedAddonsPkgTitle')}</h2>
        <ul className="sub-container">
          {
            addOnServices.map(({ name: addonsName, id: addonsId, price, image: addonsImg }) => (
              <li key={`pkg-${addonsId}`}>
                <LazyLoadImage src={addonsImg} alt="addons_img" />
                <div>{addonsName}</div>
                <div>{`${price}Rs`}</div>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  );
};

UserDetails.propTypes = {
  details: PropTypes.object.isRequired
};

export default UserDetails;
