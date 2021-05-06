// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import allReducers from '../reducers';

// const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../slices/ui";
import sitesReducer from "../slices/sites";
import pagesReducer from "../slices/pages";
import recordsReducer from "../slices/records";
import metricsReducer from "../slices/metrics";

export default configureStore({
  reducer: {
    ui: uiReducer,
    sites: sitesReducer,
    pages: pagesReducer,
    records: recordsReducer,
    metrics: metricsReducer,
  },
})