import { createSlice, createEntityAdapter, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import cuid from 'cuid';
import { formFactorsDefaults, metricsDefaults } from '../lib/defaults';
import { fetchPageCrUXRecords } from '../lib/google';
import { selectMetricDataByRecordId } from './records';

const transformRecords = records => {
  return metricsDefaults.metrics.map(metric => {
    const metricObject = {
      _id: cuid(),
      name: metric,
    }

    const formFactors = records.reduce((allFormFactors, record) => (
      {
        ...allFormFactors,
        [record.record.key.formFactor]: record.record.metrics[metric],
      }
    ), {});

    return { ...metricObject, ...formFactors };
  })
}

export const comparisonsAdapter = createEntityAdapter({
  selectId: comparison => comparison._id
});

export const fetchComparisonMetrics = createAsyncThunk(
  'comparisons/fetchMetrics',
  async comparison => {
    try {
      // const records = await fetchPageCrUXRecords(comparison.url, formFactorsDefaults.formFactors);
      // const metrics = transformRecords(records);
      // const metricsIds = metrics.map(metric => metric._id);

      // return { metricsIds, metrics }
      // return {
      //   id: comparison._id,
      //   metricsIds: [],
      //   metrics: [],
      // }
      throw new Error()
    }

    catch(error) {
      throw new Error(comparison)
    }
  }
);

export const slice = createSlice({
  name: 'comparisons',
  initialState: comparisonsAdapter.getInitialState(),
  reducers: {
    addComparison: comparisonsAdapter.addOne,
    updateComparison: comparisonsAdapter.updateOne,
    deleteComparison: (state, action) => {
      comparisonsAdapter.removeOne(state, action.payload.comparisonId)
    },
  },
  extraReducers: {
    [fetchComparisonMetrics.pending]: (state, action) => {
      console.log('loading',action)
      comparisonsAdapter.updateOne(state, {
        id: action.meta.arg._id,
        changes: {
          stored: false,
          loading: true,
          error: false,
        }
      });
    },
    [fetchComparisonMetrics.fulfilled]: (state, action) => {
      console.log('success',action)
      comparisonsAdapter.updateOne(state, {
        id: action.meta.arg._id,
        changes: {
          stored: true,
          loading: false,
          error: false,
          metricsIds: action.payload.metricsIds,
        },
        metrics: action.payload.metrics,
      });
    },
    [fetchComparisonMetrics.rejected]: (state, action) => {
      console.log('fail', action)      
      comparisonsAdapter.updateOne(state, {
        id: action.meta.arg._id,
        changes: {
          stored: false,
          loading: false,
          error: true,
        }
      });
    },
  },
});

const reducer = slice.reducer;

export default reducer;
export const { addComparison, updateComparison, deleteComparison } = slice.actions;

export const {
  selectById: selectComparisonById,
  selectIds: selectComparisonIds,
  selectEntities: selectComparisonEntities,
  selectAll: selectAllComparisons,
  selectTotal: selectTotalComparisons
} = comparisonsAdapter.getSelectors(state => state.comparisons);

export const selectComparisonIdsByPageId = pageId => (
  createSelector(
    selectAllComparisons,
    comparisons => comparisons.reduce((comparisonIds, comparison) => (
      comparison.pageId === pageId ? [ ...comparisonIds, comparison._id ] : comparisonIds
    ), [])
  )
);

export const selectComparisonsByPageId = pageId => (
  createSelector(
    selectAllComparisons,
    comparisons => comparisons.filter(comparison => comparison.sideId !== pageId)
  )
);

export const selectComparison = comparisonId => (
  createSelector(
    state => selectComparisonById(state, comparisonId),
    comparison => comparison
  )
);

export const selectActiveComparisons = pageId => (
  createSelector(
    selectComparisonsByPageId(pageId),
    comparisons => comparisons.filter(comparison => comparison.active)
  )
);

export const selectValidActiveComparisons = pageId => (
  createSelector(
    selectComparisonsByPageId(pageId),
    comparisons => comparisons.filter(comparison => comparison.active && comparison.stored)
  )
);

export const selectValidActiveComparisonMetrics = (pageId, metricType) => (
  createSelector(
    [
      selectValidActiveComparisons(pageId),
      state => state.metrics.ids.map(id => state.metrics.entities[id])
    ],
    (comparisons, metrics) => ({comparisons, metrics})
  )
);

// export const selectMetricFromActiveComparisons = (metric, pageId) => (
//   createSelector(
//     selectActiveComparisons(pageId),
//     activeComparisons => activeComparisons.map(comparison => {
//       const comparisonMetric = comparison.data.filter(dataItem => dataItem.name === metric);

//       const metricData = formFactorsDefaults.formFactors.map(formFactor => (
//         comparisonMetric[formFactor]
//       ));

//       return [
//         ...comparisonMetrics,
//         {
          
//         }
//       ]
//     })
//   )
// );

export const selectCombinedComparisonMetric = (metric, pageId, recordId) => (
  createSelector(
    [
      selectMetricDataByRecordId(metric, recordId),
      selectActiveComparisons(pageId)
    ],
    (pageData, comparisonData) => ({ pageData, comparisonData })
  )
)