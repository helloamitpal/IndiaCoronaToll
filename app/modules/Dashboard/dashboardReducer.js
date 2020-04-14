import { handle } from 'redux-pack';

import * as actionTypes from './dashboardActionTypes';
import dashboardService from './dashboardService';
import translate from '../../locale';

const initialState = {
  errors: '',
  overallInfo: null,
  stateRecords: null,
  loading: false
};

const dashboardReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_STATE_WISE_INFO:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          stateRecords: null,
          loading: true
        }),
        success: (prevState) => {
          return {
            ...prevState,
            stateRecords: { ...payload }
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

    case actionTypes.GET_OVERALL_INFO:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          loading: true
        }),
        success: (prevState) => {
          return {
            ...prevState,
            overallInfo: dashboardService.getSynthesizedInfo({ ...payload })
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

    default:
      return state;
  }
};

export default dashboardReducer;
