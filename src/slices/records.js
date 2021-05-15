import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { arrayOfRecords } from '../schemas';
import { beforeToday } from '../lib/date-time'

const recordsAdapter = createEntityAdapter({
  selectId: record => record._id
});

export const fetchRecords = createAsyncThunk(
  'records/selectAllRecords',
  async pageId => {
    const response = await fetch('./data/records.json')
    // const response = await fetch(`http://localhost:4000/records/${pageId}`)
    const data = await response.json();
    const normalized = normalize(data, arrayOfRecords);

    return normalized.entities;
  }
);

export const maybeFetchRecords = pageId => async (dispatch, getState) => {
  const lastUpdated = getState().records.lastUpdated;

  (!lastUpdated || beforeToday(lastUpdated)) && dispatch(fetchRecords(pageId));
}

export const slice = createSlice({
  name: 'records',
  initialState: recordsAdapter.getInitialState({
    lastUpdated: false,
    loading: false,
    error: false,
  }),
  reducers: {},
  extraReducers: {
    [fetchRecords.pending]: (state) => {
      state.loading = true;
    },
    [fetchRecords.fulfilled]: (state, action) => {
      recordsAdapter.setAll(state, action.payload.records);
      state.lastUpdated = Date.now();
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

export const selectLatestRecordId = () => {
  return createSelector(
    state => selectRecordIds(state),
    recordIds => recordIds[0]
  )
}

export const selectMetricByRecordId = (recordId, metricType) => (
  createSelector(
    [
      state => selectRecordById(state, recordId),
      state => state.metrics.ids.map(id => state.metrics.entities[id])
    ],
    (record, metrics) => {
      return Object.keys(metrics)
        .map(m => metrics[m])
        .filter(metric => record.metrics.includes(metric._id))
        .filter(metric => metric.name === metricType);
    }
  )
)