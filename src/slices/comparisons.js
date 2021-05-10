import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

export const comparisonsAdapter = createEntityAdapter({
  selectId: comparison => comparison._id
});

export const slice = createSlice({
  name: 'comparisons',
  initialState: comparisonsAdapter.getInitialState(),
  reducers: {
    addComparison: (state, action) => {
      comparisonsAdapter.addOne(state, action.payload.comparison)
    },
    updateComparison: comparisonsAdapter.updateOne,
    deleteComparison: (state, action) => {
      comparisonsAdapter.removeOne(state, action.payload.comparisonId)
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

export const getSiteComparisons = siteId => (
  createSelector(
    selectAllComparisons,
    comparisons => comparisons.reduce((comparisonIds, comparison) => (
      comparison.siteId === siteId ? [ ...comparisonIds, comparison._id ] : comparisonIds
    ), [])
  )
);