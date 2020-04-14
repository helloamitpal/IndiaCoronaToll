import * as actionTypes from './dashboardActionTypes';

export const getTravelHistory = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_TRAVEL_HISTORY,
    promise: api.get('/api/travelHistory'),
    payload: {}
  });
};

export const getOverallInfo = (url) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_OVERALL_INFO,
    promise: api.get('/api/overallInfo'),
    payload: {}
  });
};

export const getStateRecords = (state) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_STATE_WISE_INFO,
    promise: api.get(`/api/stateWiseData?state=${state}`),
    payload: {}
  });
};
