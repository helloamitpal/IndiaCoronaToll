import { combineReducers } from 'redux';

import dashboardReducer from '../modules/Dashboard/dashboardReducer';

// this is the root reducer to combine module wise reducers
const rootReducer = combineReducers({
  dashboard: dashboardReducer
});

export default rootReducer;
