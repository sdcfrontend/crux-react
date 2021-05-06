import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { arrayOfRecords } from '../schemas';

const recordsAdapter = createEntityAdapter({
  selectId: record => record._id
});

export const fetchRecords = createAsyncThunk(
  'records/selectAllRecords',
  async pageId => {
    const response = await fetch(`http://localhost:4000/records/${pageId}`)
    const data = await response.json();
    const normalized = normalize(data, arrayOfRecords);

    return normalized.entities;
  }
);

export const slice = createSlice({
  name: 'records',
  initialState: recordsAdapter.getInitialState({
    loading: false,
    error: false,
    ids: [],
  }),
  reducers: {},
  extraReducers: {
    [fetchRecords.pending]: (state) => {
      state.loading = true;
    },
    [fetchRecords.fulfilled]: (state, action) => {
      recordsAdapter.upsertMany(state, action.payload.records);
      state.loading = false;
    },
    [fetchRecords.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
});

const reducer = slice.reducer;
export default reducer;

export const {
  selectById: selectRecordById,
  selectIds: selectRecordIds,
  selectEntities: selectRecordEntities,
  selectAll: selectAllRecords,
  selectTotal: selectTotalRecords
} = recordsAdapter.getSelectors(state => state.records);

export const selectMetricsByRecordId = recordId => {
  if (!recordId) return () => [];

  return createSelector(
    [
      state => selectRecordById(state, recordId),
      state => state.metrics.ids.map(id => state.metrics.entities[id])
    ],
    (record, metrics) => {
      return Object.keys(metrics)
        .map(p => metrics[p])
        .filter(metric => record.metrics.includes(metric._id));
    }
  )
}