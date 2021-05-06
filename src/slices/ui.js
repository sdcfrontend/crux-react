import { createSlice } from '@reduxjs/toolkit';
import { devicesDefaults, metricsDefaults } from '../lib/defaults';
import { fetchSites } from './sites';
import { fetchRecords } from './records';

export const initialiseApp = () => async (dispatch, getState) => {
  const entities = await dispatch(fetchSites());
  const initialSite = getState().sites.ids[0];
  const initialPage = getState().sites.entities[initialSite].pages[0];

  dispatch(setSelectedSite(initialSite));
  dispatch(setSelectedPage(initialPage));
  dispatch(fetchRecords(initialPage));

  return entities;
}

const initialState = {
  selectedSite: '',
  selectedPage: '',
  selectedDevice: devicesDefaults.selectedDevice,
  selectedMetrics: metricsDefaults.selectedMetrics,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedSite: (state, action) => {
      state.selectedSite = action.payload
    },
    setSelectedPage: (state, action) => {
      state.selectedPage = action.payload
    },
    setSelectedDevice: (state, action) => {
      state.selectedDevice = action.payload
    },
    setSelectedMetrics: (state, action) => {
      state.selectedMetrics = action.payload
    },
  },
})

export const { setSelectedSite, setSelectedPage, setSelectedDevice, setSelectedMetrics } = uiSlice.actions
export default uiSlice.reducer;