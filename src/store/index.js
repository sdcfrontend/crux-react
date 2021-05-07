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