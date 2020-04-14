import * as actionTypes from './placeActionTypes';

export const getTravelHistory = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_TRAVEL_HISTORY,
    promise: api.get('/api/travelHistory'),
    payload: {}
  });
};
