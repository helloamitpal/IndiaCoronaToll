import { combineReducers } from 'redux';

import userReducer from '../modules/User/userReducer';
import dashboardReducer from '../modules/Dashboard/dashboardReducer';

// this is the root reducer to combine module wise reducers
const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer
});

export default rootReducer;
