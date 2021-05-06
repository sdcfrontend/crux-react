import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchRecords } from './records';

const metricsAdapter = createEntityAdapter({
  selectId: metric => metric._id
});

export const slice = createSlice({
  name: 'metrics',
  initialState: metricsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchRecords.fulfilled]: (state, action) => {
      metricsAdapter.upsertMany(state, action.payload.metrics);
    }
  }
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectMetricById,
  selectIds: selectMetricIds,
  selectEntities: selectMetricEntities,
  selectAll: selectAllMetrics,
  selectTotal: selectTotalMetrics
} = metricsAdapter.getSelectors(state => state.metrics);