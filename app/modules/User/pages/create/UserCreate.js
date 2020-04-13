/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import * as userActionCreator from '../../userActionCreator';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import translate from '../../../../locale';
import config from '../../../../config';
import Input from '../../../../components/atoms/Input';

import './UserCreate.scss';

const UserCreatePage = ({
  userState: { errors, loading, createSuccess, regionList, packageList, addonList },
  userActions,
  history
}) => {
  const defaultForm = {
    name: '',
    email: '',
    region: '',
    packages: [],
    addons: []
  };
  const [formData, setFormData] = useState({ ...defaultForm });

  // calling api to get list of packages, regions and addons
  useEffect(() => {
    userActions.getRegions();
    userActions.getPackages();
    userActions.getAddons();
  }, [userActions]);

  // show toast message if any errror occurrs
  useEffect(() => {
    if (errors) {
      toast.error(errors);
    }
  }, [errors]);

  // show success toast message if create user gets success
  useEffect(() => {
    if (createSuccess) {
      toast.success(createSuccess);
    }
  }, [createSuccess]);

  const resetForm = () => {
    const form = { ...defaultForm };
    setFormData(form);
  };

  const onChangeFormData = (attr, val) => {
    const form = { ...formData };

    if (attr === 'packages' || attr === 'addons') {
      // fetching selected values from multi-select box
      val = Array.from(val, ({ value }) => (value));
    }

    form[attr] = val;
    setFormData(form);
  };

  const getChannels = () => {
    if (formData.packages.length === 0) {
      return '';
    }

    const filterdData = packageList.reduce((acc, { packageId, channel, price }) => {
      if (formData.packages.includes(packageId)) {
        let channels = channel.map(({ name }) => (name)).join(', ');
        const totalPrice = (acc.totalPrice || 0) + Number(price);

        channels = acc.channels ? [acc.channels || '', channels].join(', ') : channels;
        return { channels, totalPrice };
      }
      return acc;
    }, {});

    if (filterdData.channels) {
      return translate('user.channels', { CHANNELS: filterdData.channels, PRICE: filterdData.totalPrice });
    }

    return '';
  };

  const isInvalidForm = () => (Object.values(formData).some((val) => (
    (val instanceof Array) ? val.length === 0 : !val.trim()
  )));

  const createUser = () => {
    userActions.createUser({ ...formData });
    resetForm();
  };

  const validateEmail = (val) => (config.EMAIL_PATTERN.test(val));

  const head = (
    <Helmet key="user-create-page">
      <title>{translate('user.createUser')}</title>
      <meta property="og:title" content="User create" />
      <meta
        name="description"
        content="Create user in TIVO"
      />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  return (
    <div className="user-create-page-container">
      {head}
      {loading && <LoadingIndicator />}
      <form className="create-form-container">
        <section>
          <span>{translate('user.customerName')}</span>
          <Input value={formData.name} onChange={(val) => onChangeFormData('name', val)} />
        </section>
        <section>
          <span>{translate('user.email')}</span>
          <Input validate={validateEmail} type="email" value={formData.email} onChange={(val) => onChangeFormData('email', val)} />
        </section>
        <section>
          <span>{translate('user.region')}</span>
          <select value={formData.region} onChange={({ target: { value } }) => onChangeFormData('region', value)}>
            <option value="">{translate('user.select')}</option>
            {
              regionList.map(({ regionCode, region }) => (
                <option key={`region-${regionCode}`} value={regionCode}>{region}</option>
              ))
            }
          </select>
        </section>
        <section>
          <span>{translate('user.package')}</span>
          <select multiple value={formData.packages} onChange={({ target: { selectedOptions } }) => onChangeFormData('packages', selectedOptions)}>
            <option value="">{translate('user.select')}</option>
            {
              packageList.map(({ packageId, name }) => (
                <option key={`pkg-${packageId}`} value={packageId}>{name}</option>
              ))
            }
          </select>
          <p>{(packageList.length && formData.packages) ? getChannels() : null}</p>
        </section>
        <section>
          <span>{translate('user.addons')}</span>
          <select multiple value={formData.addons} onChange={({ target: { selectedOptions } }) => onChangeFormData('addons', selectedOptions)}>
            <option value="">{translate('user.select')}</option>
            {
              addonList.map(({ id, name }) => (
                <option key={`addon-${id}`} value={id}>{name}</option>
              ))
            }
          </select>
        </section>
        <section className="button-section">
          <button type="button" onClick={resetForm}>{translate('common.reset')}</button>
          <button type="button" disabled={isInvalidForm()} className="red" onClick={createUser}>{translate('user.create')}</button>
        </section>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActionCreator, dispatch)
});

UserCreatePage.propTypes = {
  userState: PropTypes.object,
  userActions: PropTypes.object,
  history: PropTypes.object
};

UserCreatePage.defaultProps = {
  userState: {},
  userActions: {},
  history: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreatePage);
