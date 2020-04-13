import * as actionTypes from './dashboardActionTypes';

export const getDashboardData = (url) => (dispatch, getState, { api }) => {
  const apis = [
    api.get('/api/addons'),
    api.get('/api/customerInfo'),
    api.get('/api/packages'),
    api.get('/api/regions')
  ];

  dispatch({
    type: actionTypes.GET_DASHBOARD_DATA,
    promise: Promise.all(apis),
    payload: {}
  });
};
