import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import uiReducer from "../slices/ui";
import sitesReducer from "../slices/sites";
import pagesReducer from "../slices/pages";
import comparisonsReducer from "../slices/comparisons";
import recordsReducer from "../slices/records";
import metricsReducer from "../slices/metrics";

const reducers = combineReducers({
  ui: uiReducer,
  sites: sitesReducer,
  pages: pagesReducer,
  comparisons: comparisonsReducer,
  records: recordsReducer,
  metrics: metricsReducer,
});

const persistConfig = {
  key: 'crux_root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== 'production',
});