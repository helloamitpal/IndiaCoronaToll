import { handle } from 'redux-pack';

import * as actionTypes from './userActionTypes';
import userService from './userService';
import translate from '../../locale';

const initialState = {
  users: [],
  userDetails: null,
  errors: '',
  loading: false,
  regionList: [],
  packageList: [],
  addonList: [],
  createSuccess: false
};

const userReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CREATE_USER:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          createSuccess: '',
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          createSuccess: translate('user.createUserSuccess')
        }),
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.failed')
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });

    case actionTypes.GET_USERS:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          users: [],
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          users: payload ? [...payload] : []
        }),
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.failed')
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });

    case actionTypes.GET_REGIONS:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          createSuccess: '',
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          regionList: payload ? userService.getSynthesizedRegions([...payload]) : []
        }),
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.failed')
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });

    case actionTypes.GET_PACKAGES:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          packageList: payload ? [...payload] : []
        }),
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.failed')
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });

    case actionTypes.GET_ADDONS:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          addonList: payload ? [...payload] : []
        }),
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.failed')
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });

    case actionTypes.GET_USER_DETAILS: {
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          loading: true,
          ...payload
        }),
        success: (prevState) => {
          const { addOnServiceListLength, packageListLength, user: { personalInfo, tsn } } = prevState;
          const obj = userService.getSynthesizedUserDetails(payload, addOnServiceListLength, packageListLength);

          return {
            ...prevState,
            userDetails: {
              tsn,
              personalInfo,
              ...obj
            }
          };
        },
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.failed')
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });
    }

    default:
      return state;
  }
};

export default userReducer;
