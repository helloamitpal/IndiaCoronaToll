import { handle } from 'redux-pack';

import * as actionTypes from './placeActionTypes';
import translate from '../../locale';
import placeService from './placeService';

const initialState = {
  errors: '',
  travelHistory: null,
  loading: false
};

const placeReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_TRAVEL_HISTORY:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          loading: true
        }),
        success: (prevState) => {
          return {
            ...prevState,
            travelHistory: placeService.synthesizeResponse([...payload.travel_history])
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

export default placeReducer;
