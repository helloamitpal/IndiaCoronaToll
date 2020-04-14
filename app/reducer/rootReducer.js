import { combineReducers } from 'redux';

import dashboardReducer from '../modules/Dashboard/dashboardReducer';
import placeReducer from '../modules/Place/placeReducer';

// this is the root reducer to combine module wise reducers
const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  place: placeReducer
});

export default rootReducer;
