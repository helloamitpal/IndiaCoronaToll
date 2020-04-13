import * as actionTypes from './userActionTypes';

export const getUsers = (searchBy = '', searchStr = '') => (dispatch, getState, { api }) => {
  const param = (searchBy && searchStr) ? `?find=personalInfo.${searchBy}:${searchStr}` : '';
  dispatch({
    type: actionTypes.GET_USERS,
    promise: api.get(`/api/customerInfo${param}`),
    payload: {}
  });
};

export const getRegions = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_REGIONS,
    promise: api.get('/api/regions'),
    payload: {}
  });
};

export const getPackages = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_PACKAGES,
    promise: api.get('/api/packages'),
    payload: {}
  });
};

export const getAddons = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.GET_ADDONS,
    promise: api.get('/api/addons'),
    payload: {}
  });
};

export const createUser = (formData) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.CREATE_USER,
    promise: api.post('/api/customerInfo', formData),
    payload: {}
  });
};

export const getUserDetails = (userObj) => (dispatch, getState, { api }) => {
  const { regionCode, package: packageNames, addOnService } = userObj;

  const apis = [];
  const addOnServiceList = addOnService.split(',');
  const packageList = packageNames.split(',');
  const regionList = regionCode.split(',');

  addOnServiceList.forEach((val) => {
    apis.push(api.get(`/api/addons?find=id:${val.trim()}`));
  });
  packageList.forEach((val) => {
    apis.push(api.get(`/api/packages?find=packageId:${val.trim()}`));
  });
  regionList.forEach((val) => {
    apis.push(api.get(`/api/regions?find=regionCode:${val.trim()}`));
  });

  dispatch({
    type: actionTypes.GET_USER_DETAILS,
    payload: {
      user: { ...userObj },
      addOnServiceListLength: addOnServiceList.length,
      packageListLength: packageList.length
    },
    promise: Promise.all(apis)
  });
};
