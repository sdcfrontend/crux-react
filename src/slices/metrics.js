import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { fetchRecords } from './records';
import { fetchComparisonMetrics, deleteComparison } from './comparisons';

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
    },
    [fetchComparisonMetrics.fulfilled]: (state, action) => {
      metricsAdapter.upsertMany(state, action.payload.metrics);
    },
    [deleteComparison]: (state, action) => {
      action.payload.metricsIds?.length && metricsAdapter.removeMany(state, action.payload.metricsIds);
    },
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

export const selectMetricEntity = id => {
  return createSelector(
    state => selectMetricById(state, id),
    metric => metric
  )
}
