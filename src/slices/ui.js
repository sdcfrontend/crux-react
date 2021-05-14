import { createSlice } from '@reduxjs/toolkit';
import { formFactorsDefaults, metricsDefaults } from '../lib/defaults';

const initialState = {
  selectedSite: '',
  selectedPage: '',
  selectedFormFactor: formFactorsDefaults.selectedFormFactor,
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
    setSelectedFormFactor: (state, action) => {
      state.selectedFormFactor = action.payload
    },
    setSelectedMetrics: (state, action) => {
      state.selectedMetrics = action.payload
    },
  },
})

export const { setSelectedSite, setSelectedPage, setSelectedFormFactor, setSelectedMetrics } = uiSlice.actions
export default uiSlice.reducer;